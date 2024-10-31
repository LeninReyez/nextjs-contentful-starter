// ThankYouPage.jsx
import React, { useEffect, useState } from 'react';

const ThankYouContent = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Retrieve data from local storage
    const data = localStorage.getItem('formData');
    if (data) {
      setFormData(JSON.parse(data));
      // Optionally, remove data from local storage if it's no longer needed
      localStorage.removeItem('formData');
    }
  }, []);

  return (
    <div>
      <div style={{ textAlign: 'center' }} className="w-full max-w-xl mx-auto flex-1">
        <h3 className="text-center mb-6 text-3xl font-bold sm:text-4x1 sm:text-center" data-sb-field-path="heading">
          Submitted
        </h3>
        <p className="mb-6 text-lg text-center" data-sb-field-path="body">
          Thank You for submitting your request.
        </p>

        <div>
          <h1>Thank You!</h1>
          <p>Your order has been received.</p>
          {formData ? (
            <div>
              <p>Order Details:</p>
              <pre
                style={{
                  whiteSpace: 'pre-wrap', 
                  wordWrap: 'break-word', 
                  overflow: 'auto',
                }}
              >
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
          ) : (
            <p>No order data found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThankYouContent;
