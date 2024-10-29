// ThankYouPage.jsx
import React from 'react';

const ThankYouContent = () => {
    return (
        <div>
            <div style={{textAlign: 'center'}} className="w-full max-w-xl mx-auto flex-1">
        <h3 className="text-center mb-6 text-3xl font-bold sm:text-4x1 sm:text-center" data-sb-field-path="heading">
          Submitted
        </h3>
        <p className="mb-6 text-lg text-center" data-sb-field-path="body">
          Thank You for submitting your request.
        </p>
      </div>
        </div>
        
    );
};

export default ThankYouContent;