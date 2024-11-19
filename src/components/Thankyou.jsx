import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Main Heading Style
const MainHeading = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: #ff6347;  /* A vibrant coral color */
  text-align: center;
  margin: 20px 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  animation: fadeIn 2s ease-in-out;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 5px;
    background-color: #ff6347;
    border-radius: 2px;
    animation: slide 1s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slide {
    from {
      width: 0;
    }
    to {
      width: 50px;
    }
  }
`;

// Sub Heading Style
const SubHeading = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: #555;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
  padding: 10px;
`;

// Container Style
const Container = styled.div`
  background-color: #f9f9f9;
  padding: 50px 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'Poppins', sans-serif;
`;

// Print Button Style
const PrintButton = styled.button`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 50%;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  
  &:hover {
    background-color: #45a049;
  }
`;

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

  const handlePrint = () => {
    window.print(); // Triggers the browser's print dialog
  };

  if (!formData) {
    return (
      <Container style={{ textAlign: 'center', paddingTop: '50px' }}>
        <h3 className="text-center mb-6 text-3xl font-bold sm:text-4xl sm:text-center">
          Thank you!
        </h3>
        <p>Your order has been received, but no order data was found.</p>
      </Container>
    );
  }

  return (
    <Container>

      <div style={{ textAlign: 'center', height: 'calc(100vh - 141px)' }} className="w-full max-w-xl mx-auto flex-1">
        <div>
          <h3 className="text-center mb-6 text-3xl font-bold sm:text-4xl sm:text-center">
            Thank you for your order!
          </h3>
          <p style={{ marginBottom: '20px' }}>Your order has been successfully placed. Here are the details:</p>

          {/* Order Details */}
          <div style={{ textAlign: 'center', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9', width: '80%' }}>
            <SubHeading>Order Summary:</SubHeading>

            {/* Render Cookie Selections */}
            <div style={{ marginBottom: '20px' }}>
              <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left' }}>
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
              <SubHeading>Additional Details:</SubHeading>
              <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left' }}>
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
                  <strong>Selected Pickup Date:</strong> {formData['selectedDate']}
                </li>
              </ul>
            </div>

            {/* Render Contact Information */}
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
              <SubHeading>Contact Information:</SubHeading>
              <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left' }}>
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
                    {/* Print Button */}
                    <PrintButton onClick={handlePrint}>Print</PrintButton>
      </div>

    </Container>
  );
};

export default ThankYouContent;
