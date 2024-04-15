import React from "react";
import AccountCard from "./AccountCard";
import useAccount from "../hooks/useAccount";

const Form: React.FC = () => {
    const {
        totalAmount,
        accounts,
        isFormValid,
        errorMessage,
        handleAmountChange,
        handleAccountSelect,
        handleSubmit,
    } = useAccount(); // Use renamed hook

    return (
        <div className="flex h-screen">
            <div className="w-1/4 bg-indigo-700"></div>
            <div className="w-3/4 flex justify-center items-center">
                <div className="p-[80px] rounded border border-gray-300 w-full max-w-lg">
                    <form id="credit-form" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="amount" className="block text-gray-700 text-lg font-sans hover:font-serif font-bold mb-2">
                                Enter amount to credit:
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                id="amount"
                                name="amount"
                                min="0"
                                placeholder="Enter Amount"
                                required
                                value={totalAmount}
                                onChange={handleAmountChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        {errorMessage && (
                            <div className="error-message">{errorMessage}</div>
                        )}

                        {accounts.map((account) => (
                            <AccountCard
                                key={account.id}
                                account={account}
                                onSelectionChange={handleAccountSelect}
                            />
                        ))}

                        <button 
                            type="submit" 
                            disabled={!isFormValid}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Credit Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;
