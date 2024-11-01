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
        <div style={{marginTop: '20px'}}>
          <h3 className="text-center mb-6 text-3xl font-bold sm:text-4xl sm:text-center" data-sb-field-path="heading">
          Thank you!
        </h3>
          <p>Your order has been received.</p>
          {formData ? (
            <div style={{ textAlign: 'left', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9', width: '80%' }}>
              <h2>Order Details:</h2>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {Object.entries(formData).map(([key, value]) => (
                  <li key={key} style={{ margin: '10px 0', padding: '10px', borderBottom: '1px solid #ddd' }}>
                    <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                  </li>
                ))}
              </ul>
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
