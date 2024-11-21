import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { v4 as uuidv4 } from 'uuid'; // Importing the uuid library

// Renders errors or successful transactions on the screen.
function Message({ content }) {
    return <p>{content}</p>;
}

function App({ paymentData }) {
    const initialOptions = {
        "client-id": "test",
        "enable-funding": "venmo",
        "disable-funding": "",
        "buyer-country": "US",
        currency: "USD",
        "data-page-type": "product-details",
        components: "buttons",
        "data-sdk-integration-source": "developer-studio",
    };

    const [message, setMessage] = useState("");
    const [accessToken, setAccessToken] = useState(null); // Initialize as null
    const [loading, setLoading] = useState(true); // Loading state for the token
    const { totalPrice = 1.00, formData = {} } = paymentData || {}; // Safe destructuring

    const clientId = "ARO-qZm7ACyfVN0MN7Kr9IoEeLMd8eocTRNlDrXquB2szC54YXqeRjVVa4Kf6quT4pg6v7BQWWi0KoQ3";
    const clientSecret = "EJjz82o8RFADwsFLsy5nRasrFp9_qFM2oDUla08gxo9Vh5uwyZUIwRCiOQUZvkwmHaBgAL594zXiZ0sC";

    // Fetch the access token inside useEffect to ensure it's only called once when the component mounts
    useEffect(() => {
        async function getAccessToken() {
            const credentials = `${clientId}:${clientSecret}`;
            const encodedCredentials = btoa(credentials); // Base64 encode the credentials

            try {
                const response = await fetch('https://api.sandbox.paypal.com/v1/oauth2/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Basic ${encodedCredentials}`,
                    },
                    body: 'grant_type=client_credentials',
                });

                const data = await response.json();
                if (data.access_token) {
                    setAccessToken(data.access_token); // Store token in state
                    console.log("Access token retrieved successfully");
                } else {
                    throw new Error('Failed to get PayPal access token');
                }
            } catch (error) {
                console.error('Error fetching access token:', error);
                setMessage("Error fetching access token");
            } finally {
                setLoading(false); // Set loading to false once the fetch completes
            }
        }

        getAccessToken(); // Call the function to get the access token
    }, []); // Empty dependency array to run only once when the component mounts

    // The function to handle creating the order
    const handleCreateOrder = async () => {
        console.log("Access token:", accessToken);
        console.log("Loading status before creating order: ", loading);
    
        if (loading) {
            setMessage("Access token is still loading...");
            console.log("Token is loading, waiting...");
            return; // Prevent creating order if the token is still loading
        }
    
        if (!accessToken) {
            throw new Error("Access token is missing");
        }
    
        // Example item details
        const itemPrice = 33.33;
        const quantity = 3;
        const itemTotal = (itemPrice * quantity).toFixed(2); // Calculate item total
    
        // Example tax, shipping, and handling values
        const taxTotal = "0.00"; // No tax for this example
        const shipping = "0.00"; // No shipping cost for this example
        const handling = "0.00"; // No handling cost for this example
        const shippingDiscount = "0.00"; // No discount for shipping
        const discount = "0.00"; // No discount for this example
    
        // Calculate the total amount
        const totalValue = (parseFloat(itemTotal) + parseFloat(taxTotal) + parseFloat(shipping) + parseFloat(handling) - parseFloat(shippingDiscount) - parseFloat(discount)).toFixed(2);
    
        // Create order payload
        const orderPayload = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    reference_id: uuidv4(), // Generate a unique reference ID
                    amount: {
                        currency_code: "USD",
                        value: totalValue, // This is the total amount
                        breakdown: {
                            item_total: {
                                currency_code: "USD",
                                value: itemTotal, // Total value of the items
                            },
                            shipping: {
                                currency_code: "USD",
                                value: shipping, // Shipping amount (set to "0.00" here)
                            },
                            handling: {
                                currency_code: "USD",
                                value: handling, // Handling amount (set to "0.00" here)
                            },
                            tax_total: {
                                currency_code: "USD",
                                value: taxTotal, // Tax amount (set to "0.00" here)
                            },
                            discount: {
                                currency_code: "USD",
                                value: discount, // Discount amount (set to "0.00" here)
                            },
                            shipping_discount: {
                                currency_code: "USD",
                                value: shippingDiscount, // Shipping discount (set to "0.00" here)
                            }
                        }
                    },
                    items: [
                        {
                            name: "Product 1",
                            unit_amount: {
                                currency_code: "USD",
                                value: itemPrice.toFixed(2), // Price per unit
                            },
                            quantity: quantity.toString(), // Quantity of the items
                        }
                    ]
                }
            ]
        };
    
        try {
            // Send the order creation request to PayPal's API
            const response = await fetch("https://api.sandbox.paypal.com/v2/checkout/orders", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(orderPayload),
            });
    
            const orderData = await response.json();
    
            if (orderData.id) {
                console.log("Order ID:", orderData.id);
                return orderData.id; // Return the PayPal order ID
            } else {
                console.error("Failed to create order:", orderData);
                throw new Error("Error creating PayPal order");
            }
        } catch (error) {
            console.error("Error during order creation:", error);
            setMessage(`Could not initiate PayPal Checkout... ${error.message}`);
        }
    };
    
    

    // The function to handle when the user approves the payment
    const handleApprove = async (data, actions) => {
        try {
            const response = await fetch(`/api/orders/${data.orderID}/capture`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const orderData = await response.json();
            const errorDetail = orderData?.details?.[0];

            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                return actions.restart();
            } else if (errorDetail) {
                throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
            } else {
                const transaction = orderData.purchase_units[0].payments.captures[0];
                setMessage(
                    `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                );
                console.log("Capture result", orderData, JSON.stringify(orderData, null, 2));
            }
        } catch (error) {
            console.error(error);
            setMessage(`Sorry, your transaction could not be processed... ${error.message || error}`);
        }
    };

    // Ensure PayPalButtons only render after accessToken is available
    if (loading) {
        return <div>Loading...</div>; // Show a loading message if the token is still loading
    }

    return (
        <div className="App">
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                    style={{
                        shape: "rect",
                        layout: "vertical",
                        color: "gold",
                        label: "paypal",
                    }}
                    createOrder={async (data, actions) => {
                        // Ensure the token is available before creating the order
                        if (accessToken) {
                            const orderID = await handleCreateOrder(); // Get the PayPal order ID
                            return orderID; // Pass the order ID to the PayPal button
                        } else {
                            setMessage("Access token not available");
                        }
                    }}
                    onApprove={handleApprove}
                />
            </PayPalScriptProvider>
            <Message content={message} />
        </div>
    );
}

export default App;
