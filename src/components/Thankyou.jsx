import React, { useEffect, useState } from 'react';

const ThankYouContent = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      // Retrieve data from local storage
      const data = localStorage.getItem('formData');
      try {
        if (data) {
          setFormData(JSON.parse(data));
          // Optionally, remove data from local storage if it's no longer needed
          localStorage.removeItem('formData');
        } else {
          console.log('No data found in localStorage');
        }
      } catch (error) {
        console.error('Error parsing formData:', error);
      }
    } else {
      console.log('localStorage is not available');
    }
  }, []);

  console.log(formData); // Debugging line to check the data

  if (!formData) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h3 className="text-center mb-6 text-3xl font-bold sm:text-4xl sm:text-center" data-sb-field-path="heading">
          Thank you!
        </h3>
        <p>Your order has been received, but no order data was found.</p>
      </div>
    );
  }

  return (
    <div>
      {JSON.stringify(formData)} {/* Debugging line to view formData */}
      <div style={{ textAlign: 'center' }} className="w-full max-w-xl mx-auto flex-1">
        <div style={{ marginTop: '20px' }}>
          <h3 className="text-center mb-6 text-3xl font-bold sm:text-4xl sm:text-center" data-sb-field-path="heading">
            Thank you for your order!
          </h3>
          <p>Your order has been successfully placed. Here are the details:</p>

          {/* Order Details */}
          <div style={{ textAlign: 'center', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9', width: '80%' }}>
            <h2>Order Summary:</h2>

            {/* Render Cookie Selections */}
            <div style={{ marginBottom: '20px' }}>
              <h3>Cookie Order:</h3>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {formData['cookie-1'] && (
                  <li style={{ margin: '10px 0', padding: '10px', borderBottom: '1px solid #ddd' }}>
                    <strong>{formData['cookie-1']}:</strong> {formData['cookie-1-quantity']} quantity
                  </li>
                )}
                {formData['cookie-2'] && (
                  <li style={{ margin: '10px 0', padding: '10px', borderBottom: '1px solid #ddd' }}>
                    <strong>{formData['cookie-2']}:</strong> {formData['cookie-2-quantity']} quantity
                    {formData['cookie-2-no-cashews-selected'] && (
                      <div style={{ marginTop: '5px', fontStyle: 'italic' }}>
                        <em>No cashews selected</em>
                      </div>
                    )}
                  </li>
                )}
                {formData['cookie-3'] && (
                  <li style={{ margin: '10px 0', padding: '10px', borderBottom: '1px solid #ddd' }}>
                    <strong>{formData['cookie-3']}:</strong> {formData['cookie-3-quantity']} quantity
                  </li>
                )}
                {formData['cookie-4'] && (
                  <li style={{ margin: '10px 0', padding: '10px', borderBottom: '1px solid #ddd' }}>
                    <strong>{formData['cookie-4']}:</strong> {formData['cookie-4-quantity']} quantity
                  </li>
                )}
              </ul>
            </div>

            {/* Render Additional Information */}
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
              <h3>Additional Details:</h3>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {formData['custom-message'] && (
                  <li style={{ margin: '10px 0', padding: '10px', borderBottom: '1px solid #ddd' }}>
                    <strong>Custom Message:</strong> {formData['custom-message']}
                  </li>
                )}
                <li style={{ margin: '10px 0', padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <strong>Additional Instructions:</strong> {formData['additional-instructions'] || 'None'}
                </li>
                <li style={{ margin: '10px 0', padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <strong>Total Price:</strong> ${formData['total-price']}
                </li>
                <li style={{ margin: '10px 0', padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <strong>Selected Delivery Date:</strong> {formData['selectedDate']}
                </li>
              </ul>
            </div>

            {/* Render Contact Information */}
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
              <h3>Contact Information:</h3>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ margin: '10px 0', padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <strong>Name:</strong> {formData['name']}
                </li>
                <li style={{ margin: '10px 0', padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <strong>Email:</strong> {formData['email']}
                </li>
                <li style={{ margin: '10px 0', padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <strong>Phone:</strong> {formData['phone']}
                </li>
                <li style={{ margin: '10px 0', padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <strong>Preferred Contact Method:</strong> {formData['contact-method']}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouContent;
