import React, { useState } from "react";
import AccountCard from "./AccountCard";
import useAccount from "../hooks/useAccount"; 
import PaymentSuccess from "./PaymentSuccess";

const Form: React.FC = () => {
    const {
        totalAmount,
        accounts,
        isFormValid,
        errorMessage,
        handleAmountChange,
        handleAccountSelect,
    } = useAccount(); // Use renamed hook

    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false); // State to track payment success

    const toggleErrorMessage = () => {
        setShowErrorMessage((prev: boolean) => !prev);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add your logic to handle form submission
        // For example, you can check if the form is valid and then set paymentSuccess to true
        if (isFormValid) {
            setPaymentSuccess(true);
        } else {
            // Handle the case where the form is not valid, if needed
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/4 bg-indigo-700"></div>
            <div className="flex flex-col items-center justify-center w-3/4 p-4">
                {!paymentSuccess ? ( // Render the form if paymentSuccess is false
                    <form 
                        id="credit-form" 
                        onSubmit={(e) => handleSubmit(e)} 
                        className="relative w-full max-w-4xl p-6 bg-white rounded-lg shadow-md"
                        style={{ width: '90%', margin: '0 auto' }} // Adjust width and margin
                    >
                        <div className="relative mb-8">
                            <label htmlFor="amount" className="mb-2 text-sm font-bold text-gray-700 ">
                                Enter amount to credit $:
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                id="amount"
                                name="amount"
                                min="0.01"
                                placeholder="Enter Amount"
                                required
                                value={totalAmount}
                                onChange={(e) => {
                                    handleAmountChange(e);
                                    toggleErrorMessage();
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === '-') {
                                        e.preventDefault();
                                    }
                                }}
                                className="w-1/2 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            />
                            {errorMessage && (
                                <div 
                                    className="absolute w-full px-4 py-2 mt-1 mb-4 text-red-700 bg-red-100 border border-red-400 rounded shadow-md"
                                >
                                    {errorMessage}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col items-center w-full overflow-y-auto mt-14 max-h-96 account-card">
                            {accounts.map((account) => (
                                <AccountCard
                                    key={account.id}
                                    account={account}
                                    onSelectionChange={handleAccountSelect}
                                />
                            ))}
                        </div>

                        <div className="flex justify-center mt-8">
                            <button 
                                type="submit" 
                                disabled={!isFormValid}
                                className={`px-4 py-2 font-bold text-white rounded-lg focus:outline-none focus:shadow-outline transform transition-transform
                                    ${isFormValid ? 'bg-blue-500 hover:bg-blue-700 hover:scale-105' : 'bg-gray-300 hover:scale-100'}`
                                }
                                style={{ transition: "transform 0.3s", minWidth: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <img src="/path/to/lock-icon.png" alt="Lock Icon" className="w-5 h-5 mr-2" />
                                <span className="text-lg">{isFormValid ? 'Credit Account' : 'Locked'}</span>
                            </button>
                        </div>
                    </form>
                ) : ( // Render the PaymentSuccess component if paymentSuccess is true
                    <PaymentSuccess />
                )}
            </div>
        </div>
    );
};

export default Form;
