import React, { useState, useEffect } from "react";
import AccountCard from "./AccountCard";
import { Account } from "../../types";
import accountDetails from "../utils/mockData";

let accountSummary= accountDetails;

const Form: React.FC = () => {
    const [totalAmount, setTotalAmount] = useState<number | undefined>();
    const [accounts, setAccounts] = useState<Account[]>(accountSummary);
    const [cardClicked, setCardClicked] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    useEffect(() => {
        calculateProratedAmounts(totalAmount);
    }, [cardClicked, totalAmount, setAccounts]);

    const roundToTwoDecimals = (number: number): number => {
        return Math.round(number * 100) / 100;
    };

    const calculateProratedAmounts = (totalAmount: number | undefined) => {
        if (!totalAmount) return;

        const selectedAccounts = accounts.filter((account) => account.selected);
        const totalSelectedBalance = selectedAccounts.reduce((acc, current) => acc + current.originalBalance, 0);

        if (totalAmount > totalSelectedBalance && selectedAccounts.length > 0) {
            console.error("Total amount exceeds selected accounts balance");
            return;
        }

        const updatedAccounts = accounts.map((account) => {
          if (account.selected)
          {
            const proratedAmount = Math.round(
              ((account.originalBalance / totalSelectedBalance) * totalAmount) * 100) / 100;
            console.log('prorated amount', proratedAmount)
 
           account.proratedAmount=proratedAmount
          
          }
          return account;
        })
      


        setAccounts(updatedAccounts);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredValue = event.target.value.toString();

        if (!/^\d+(?:\.\d{0,2})?$/.test(enteredValue)) {
            const decimalPart = enteredValue.split('.').pop();
            if (decimalPart && decimalPart.length > 2) {
                setTotalAmount(roundToTwoDecimals(parseFloat(enteredValue)));
            }
        } else {
            setTotalAmount(parseFloat(enteredValue));
        }
    };

    const handleAccountSelect = (accountId: number) => {
        const updatedAccounts = accounts.map((account) => {
            if (account.id === accountId) {
                return {
                    ...account,
                    selected: !account.selected,
                    proratedAmount: !account.selected ? 0 : account.proratedAmount,
                };
            }
            return account;
        });

        setAccounts(updatedAccounts);
        setCardClicked(!cardClicked);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission
        if (isFormValid) {
            console.log("Submit form with selected accounts and prorated amounts:", accounts);
            // Replace with your actual form submission logic (e.g., sending data to server)
        } else {
            console.error("Please select at least one account to proceed.");
        }
    };

    return (
        <div className="mt-4">
            <h1>Mammoth Lakes</h1>
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

                {accounts.map((account) => (
                    <AccountCard
                        key={`account-${account.id}`}
                        account={account}
                        isSelected={account.selected}
                        proratedAmount={account.proratedAmount}
                        onSelectionChange={handleAccountSelect}
                        accounts={accounts} // Pass the updated accounts state to the child component
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
