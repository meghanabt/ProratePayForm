import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import Form from './components/Form';

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading for 3 seconds
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        // Clear timeout on component unmount
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {loading ? (
                // Loading animation
                <div className="flex flex-col items-center justify-center h-screen">
                    <p className="mb-2 text-2xl black font--bold text">Taking you to payment page</p>
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-blue-900 rounded-full animate-move-left"></div>
                        <div className="w-3 h-3 bg-blue-900 rounded-full animate-move-left" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-3 h-3 bg-blue-900 rounded-full animate-move-left" style={{animationDelay: '0.4s'}}></div>
                    </div>
                </div>
            ) : (
                // Render Form component when loading is complete
                <Form />
            )}
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
