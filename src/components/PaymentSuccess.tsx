import React from "react";


const PaymentSuccess: React.FC = () => {
    

    return (
        <div 
            id="payment-success" 
            className="relative flex flex-col items-center justify-center w-full max-w-4xl p-6 bg-white rounded-lg shadow-md"
            style={{ width: '90%', margin: '0 auto', height: '80vh' }} // Adjust width, margin, and height
        >
            {/* Back Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 left-0 w-8 h-8 mt-4 ml-4 cursor-pointer"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
               
            >
                <path d="M19 12H6M12 5l-7 7 7 7" />
            </svg>

            {/* Circle */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 mb-4" // Adjust size here
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10" />
                {/* Tick Icon */}
                <path d="M9 12l2 2 4-4" />
            </svg>

            {/* Content of the PaymentSuccess component */}
            <h1 className="mb-4 text-2xl font-bold">Payment Successful</h1>
            <p>Your payment was successfully processed.</p>
        </div>
    );
};

export default PaymentSuccess;
