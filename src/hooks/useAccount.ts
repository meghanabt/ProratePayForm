import { useState, useEffect } from "react";
import { Account } from "../../types"; 
import accountDetails from "../utils/mockData"; 

interface AccountState {

    //state variables
    totalAmount: number | undefined; // Total amount to credit
    accounts: Account[]; // List of accounts
    isFormValid: boolean; // Flag indicating if the form is valid
    errorMessage: string; // Error message to display
    paymentSuccess: boolean; // Flag indicating if payment was successful

    // Function signatures for handling user actions
    handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleAccountSelect: (accountId: number) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    // toggleErrorMessage: () => void; // Function to toggle error message visibility
}

// Custom hook Implementation
const useAccount = (): AccountState => {

    // Define state variables using useState hook
    const [totalAmount, setTotalAmount] = useState<number | undefined>(); 
    const [accounts, setAccounts] = useState<Account[]>(accountDetails); 
    const [cardClicked, setCardClicked] = useState<boolean>(false); 
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>(""); 
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false); 

    // useEffect hook to handle side effects
    useEffect(() => {

        // Reset form validity when card is clicked or total amount changes
        setIsFormValid(false);

        // Recalculate prorated amounts when card is clicked or total amount changes
        calculateProratedAmounts(totalAmount);
        
    }, [cardClicked, totalAmount]); 


    // Function to round a number to two decimal places
    const roundToTwoDecimals = (number: number): number => {
        return Math.round(number * 100) / 100;
    };

    // Function to calculate prorated amounts for selected accounts
    const calculateProratedAmounts = (totalAmount: number | undefined) => {
        // Return if total amount is undefined
        if (!totalAmount) {
            return;
        }

        // Filter selected accounts and calculate total balances
        const selectedAccounts = accounts.filter((account) => account.selected);
        const totalAccountBalance = accounts.reduce((acc, current) => acc + current.originalBalance, 0);
        const totalSelectedBalance = selectedAccounts.reduce((acc, current) => acc + current.originalBalance, 0);

        // Check if total amount exceeds total account balance
        if (totalAmount > totalAccountBalance) {
            setErrorMessage("Entered amount exceeds your total Account Balance");
            return;
        }

        // Check if total amount exceeds total selected account balance
        if (totalAmount > totalSelectedBalance && selectedAccounts.length > 0) {
            setErrorMessage("Entered amount exceeds selected accounts balance, please select more accounts");
            return;
        }

        // Calculate prorated amounts for selected accounts
        if (selectedAccounts.length > 0 && totalAmount > 0) {
            let remainingAmount = totalAmount;

            const updatedAccounts = accounts.map((account) => {
                if (account.selected) {
                    const proratedAmount = ((account.originalBalance / totalSelectedBalance) * totalAmount);

                    if (proratedAmount < account.originalBalance) {
                        account.proratedAmount = Number(proratedAmount.toFixed(2));
                        remainingAmount -= account.proratedAmount;
                    } else {
                        account.proratedAmount = account.originalBalance;
                    }
                }
                return account;
            });

            // Adjust prorated amount for the account with remaining amount, if any
            if (Number(remainingAmount.toFixed(2)) > 0) {
                const selectedAccountWithLessProrate = updatedAccounts.find((account) => account.selected && account.proratedAmount < account.originalBalance);
                if (selectedAccountWithLessProrate) {
                    const newProratedAmount = selectedAccountWithLessProrate.proratedAmount + remainingAmount;
                    if (newProratedAmount <= selectedAccountWithLessProrate.originalBalance) {
                        selectedAccountWithLessProrate.proratedAmount = Number(newProratedAmount.toFixed(2));
                    } else {
                        selectedAccountWithLessProrate.proratedAmount = selectedAccountWithLessProrate.originalBalance;
                    }
                }
            }

            setAccounts(updatedAccounts);
            setIsFormValid(true);
        }

        setErrorMessage("");
    };

    // Function to track amount change
    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let enteredValue = event.target.value.toString();
        enteredValue = enteredValue.replace(/^0+/, '');

        // Validating entered value
        if (!/^\d*(?:\.\d{0,2})?$/.test(enteredValue)) {
            const decimalPart = enteredValue.split('.').pop();
            if (decimalPart && decimalPart.length > 2) {
                setTotalAmount(roundToTwoDecimals(parseFloat(enteredValue)));
            }
        } else {
            setTotalAmount(parseFloat(enteredValue));
        }
    };

    // Function to handle account selection
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

    // Function to handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isFormValid) {
            setPaymentSuccess(true);
        } 
    };

    // Return state variables and functions to be used by components
    return {
        totalAmount,
        accounts,
        isFormValid,
        errorMessage,
        paymentSuccess,
        handleAmountChange,
        handleAccountSelect,
        handleSubmit,
    };
};

export default useAccount;
