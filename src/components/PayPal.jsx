import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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
    const [accessToken, setAccessToken] = useState("");
    const [loading, setLoading] = useState(true); // Loading state for the token
    const { totalPrice = 0, formData = {} } = paymentData || {}; // Safe destructuring

    const clientId = "ARO-qZm7ACyfVN0MN7Kr9IoEeLMd8eocTRNlDrXquB2szC54YXqeRjVVa4Kf6quT4pg6v7BQWWi0KoQ3";
    const clientSecret = "EJjz82o8RFADwsFLsy5nRasrFp9_qFM2oDUla08gxo9Vh5uwyZUIwRCiOQUZvkwmHaBgAL594zXiZ0sC";

    // Fetch access token when component mounts
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

        getAccessToken();
    }, []);

    const handleCreateOrder = async () => {
        if (loading) {
            setMessage("Access token is still loading...");
            return;
        }
    
        if (!accessToken) {
            throw new Error("Access token is missing");
        }
    
        const formattedTotalPrice = totalPrice.toFixed(2);
    
        const orderPayload = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    reference_id: "000001",
                    amount: {
                        currency_code: "USD",
                        value: formattedTotalPrice,
                    },
                    items: [
                        {
                            name: "Product 1",
                            unit_amount: {
                                currency_code: "USD",
                                value: "33.33", // Example item price
                            },
                            quantity: "3", // Example quantity
                        },
                    ],
                },
            ],
        };
    
        try {
            const response = await fetch("https://api.sandbox.paypal.com/v2/checkout/orders", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(orderPayload),
            });
    
            const orderData = await response.json();
            
            // Ensure the order ID exists in the response
            if (orderData.id) {
                console.log("Order ID:", orderData.id);
                return orderData.id;
            } else {
                console.error("Failed to create order:", orderData);
                throw new Error("Error creating PayPal order");
            }
        } catch (error) {
            console.error("Error during order creation:", error);
            setMessage(`Could not initiate PayPal Checkout... ${error.message}`);
        }
    };
    

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
            setMessage(`Sorry, your transaction could not be processed...${error.message || error}`);
        }
    };

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
                    createOrder={handleCreateOrder} // Use the function here
                    onApprove={handleApprove}
                />
            </PayPalScriptProvider>
            <Message content={message} />
        </div>
    );
}

export default App;
