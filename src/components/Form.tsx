import React from "react";
import AccountCard from "./AccountCard";
import useAccounts from "../utils/useAccounts";

const Form: React.FC = () => {
    const {
        totalAmount,
        accounts,
        errorMessage,
        handleAmountChange,
        handleAccountSelect,
        handleSubmit,
        isFormValid
    } = useAccounts();

    return (
        <div className="mt-4">
            <form id="credit-form" onSubmit={handleSubmit}>
                <label>Enter amount to credit $:</label>
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
                />

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

                <button type="submit" disabled={!isFormValid}>
                    Credit Account
                </button>
            </form>
        </div>
    );
};

export default Form;
