import { useState, useEffect } from "react";
import { Account } from "../../types";
import accountDetails from "../utils/mockData";

interface AccountState {
    totalAmount: number | undefined;
    accounts: Account[];
    isFormValid: boolean;
    errorMessage: string;
    handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleAccountSelect: (accountId: number) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const useAccount = (): AccountState => {
    const [totalAmount, setTotalAmount] = useState<number | undefined>();
    const [accounts, setAccounts] = useState<Account[]>(accountDetails);
    const [cardClicked, setCardClicked] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        setIsFormValid(false);
        calculateProratedAmounts(totalAmount);
    }, [cardClicked, totalAmount]);

    const roundToTwoDecimals = (number: number): number => {
        return Math.round(number * 100) / 100;
    };

   

    

    const calculateProratedAmounts = (totalAmount: number | undefined) => {
        if (!totalAmount) {
            return;
        }
    
        const selectedAccounts = accounts.filter((account) => account.selected);
        const totalAccountBalance = accounts.reduce((acc, current) => acc + current.originalBalance, 0);
        const totalSelectedBalance = selectedAccounts.reduce((acc, current) => acc + current.originalBalance, 0);
    
        if (totalAmount > totalAccountBalance) {
            setErrorMessage("Entered amount exceeds your total Account Balance");
            return;
        }
    
        if (totalAmount > totalSelectedBalance && selectedAccounts.length > 0) {
            setErrorMessage("Entered amount exceeds selected accounts balance, please select more accounts");
            return;
        }
    
        if (selectedAccounts.length > 0 && totalAmount > 0) {
            let remainingAmount = totalAmount;
        
            const updatedAccounts = accounts.map((account) => {
                if (account.selected) {
                    const proratedAmount = ((account.originalBalance / totalSelectedBalance) * totalAmount);
        
                    if (proratedAmount < account.originalBalance) {
                        // If prorated amount is less, adjust prorated amount and remaining amount
                        account.proratedAmount = Number(proratedAmount.toFixed(2));
                        remainingAmount -= account.proratedAmount;
                    } else {
                        // If prorated amount is equal or greater, assign full original balance
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
                        // If adding remaining amount exceeds account balance, set prorated amount to original balance
                        selectedAccountWithLessProrate.proratedAmount = selectedAccountWithLessProrate.originalBalance;
                    }
                }
            }
        
            setAccounts(updatedAccounts);
            setIsFormValid(true);
        }

        
        setErrorMessage(""); // Clear error message if no error
    };
    

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let enteredValue = event.target.value.toString();
        enteredValue = enteredValue.replace(/^0+/, '');

    
        if (!/^\d*(?:\.\d{0,2})?$/.test(enteredValue)) {
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

    return {
        totalAmount,
        accounts,
        isFormValid,
        errorMessage,
        handleAmountChange,
        handleAccountSelect,
        handleSubmit,
    };
};

export default useAccount;
