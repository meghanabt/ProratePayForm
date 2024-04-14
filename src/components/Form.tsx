import React from "react";
import AccountCard from "./AccountCard";
import accountDetails from "../utils/mockData";
import { useState, useEffect } from "react";
import type { Account } from "../../types";

type Props ={};
let accountSummary= accountDetails;




const Form = (props: Props) => {

    const [totalAmount, setTotalAmount] = useState<number>();
    const [accounts, setAccounts] = useState<Account[]>(accountSummary); // Replace with your initial account data
    const [selectedAccount, setSelectedAccount] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(false); // State to track form validity


    function roundToTwoDecimals(number: number): number {
        return Math.round(number * 100) / 100;
      }

    useEffect(() => {
       
        calculateProratedAmounts(totalAmount);
        

    }, [selectedAccount, totalAmount]);
 


  
    // const calculateProratedAmounts = (totalAmount: number) => {

    //   const selectedAccounts = accounts.filter((account) => account.selected);
    //   console.log("selectedAccounts", selectedAccounts)

  
    //   const totalSelectedBalance = selectedAccounts.reduce(
    //     (acc, current) => acc + current.originalBalance,
    //     0
    //   );
  
    //   if (totalAmount > totalSelectedBalance) {
    //     // Total amount exceeds selected accounts balance, set error
    //     console.error("Total amount exceeds selected accounts balance");
    //     return;
    //   }
  
    //   setAccounts(
    //     accounts.map((account) => {
    //       if (account.selected) {
    //         const proratedAmount = Math.round(
    //           ((account.originalBalance / totalSelectedBalance) * totalAmount) * 100
    //         ) / 100;
  
    //         // Check if prorated amount exceeds account balance
    //         if (proratedAmount > account.originalBalance) {
    //           console.error(
    //             `Prorated amount (${proratedAmount}) exceeds original balance for account ${account.name}`
    //           );
    //           return { ...account, proratedAmount: 0 }; // Set prorated amount to 0 for this account
    //         }
  
    //         return { ...account, proratedAmount };
    //       }
    //       return account;
    //     })
    //   );
    // };
  

    const calculateProratedAmounts = (totalAmount: number) => {

        const selectedAccounts = accounts.filter((account) => account.selected);
        console.log("selectedAccounts", selectedAccounts)
        const totalSelectedBalance = selectedAccounts.reduce(
          (acc, current) => acc + current.originalBalance,
          0
        );
      
        if ((totalAmount > totalSelectedBalance) && selectedAccounts.length>0) {
          console.error("Total amount exceeds selected accounts balance");
          return;
        }

        setAccounts(
            accounts.map((account) => {
                  if (account.selected) 
                  {
                    const proratedAmount = Math.round(
                      ((account.originalBalance / totalSelectedBalance) * totalAmount) * 100) / 100;
                    console.log('prorated amount', proratedAmount)
          
                   account.proratedAmount=proratedAmount
                   
                  }
                  return account;
                })
              );

      };

    // const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     console.log("totalAmount", event.target.value)
        
    //   const newAmount = parseFloat(event.target.value);
    //   console.log("totalAmount", typeof(newAmount))
    //   setTotalAmount(newAmount);
    //   validateForm();
    // };


    // const validateForm = (): boolean => {
    //     const totalAccountBalance : number= accounts.reduce((sum, account) => sum + account.originalBalance, 0);
    //     console.log("totalAccountBalance", totalAccountBalance)
    //     const isValid: boolean = totalAmount <= totalAccountBalance;
    //     return isValid;
    //   };

   


  
    // const handleAccountSelect = (accountId: number) => {

        
       
    //      accounts.map((account) => {
    //         if (account.id==accountId) 
    //         {
    //             account.selected=!account.selected
    //             setSelectedAccount(account.selected)
               
              
             
    //         }
          
    //       });
    //       console.log("selected",selectedAccount)
    //       console.log("accounts after click", accounts)

         
    //     setAccounts(accounts)

       

    //     setIsFormValid(accounts.some((account) => account.id === accountId && account.selected));

    // };


//   const handleAccountSelect = (accountId: number) => {
//     setAccounts(
//       accounts.map((account) =>
//         account.id === accountId ? { ...account, selected: !account.selected,  } : account
       
//       )
//     );
    
//     setSelectedAccount(!selectedAccount); 
   
//   };

const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    console.log("in handle amount")
    const enteredValue = event?.target?.value?.toString();


    // Improved validation, restriction, and cursor freezing logic
    if (!/^\d+(?:\.\d{0,2})?$/.test(enteredValue)) {
      const decimalPart = enteredValue.split('.').pop();
      
      if (decimalPart && decimalPart.length > 2) {
        setTotalAmount( roundToTwoDecimals(parseFloat(enteredValue)))
      }
    } else {
      // Allow the entered value (optional logic for state update)
      setTotalAmount(parseFloat(enteredValue));
    }

  };

const handleAccountSelect = (accountId: number) => {
    setAccounts(
      accounts.map((account) => {
        if (account.id === accountId) {
          return {
            ...account,
            selected: !account.selected,
            // Reset proratedAmount to 0 if selected is false
            proratedAmount: !account.selected ? 0 : account.proratedAmount, // Ternary operator
          };
        }
        return account;
      })
    );

    setSelectedAccount(!selectedAccount); 
}



  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
  
      if (isFormValid) {
        // Submit form logic (assuming isFormValid indicates at least one selected account)
        console.log("Submit form with selected accounts and prorated amounts:", accounts);
        // Replace with your actual form submission logic (e.g., sending data to server)
      } else {
        console.error("Please select at least one account to proceed.");
      }
    };


    
    // const handleInput = (event) => {
    //     const { value } = event.target;
    //     // Restrict the input to only allow numbers and one decimal point
    //     // const sanitizedValue = value.replace(/[^0-9.]/g, '');
    //     // event.target.value = sanitizedValue;
    // };



  
    return (
      <div className="mt-4">
        <form id="credit-form" onSubmit={handleSubmit}>
          <label>Enter amount to credit $:</label>
          <input type="number" step="0.01" id="amount" name="amount" min="0" required value={totalAmount} onChange={handleAmountChange} />
          
          {accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account} 
              onSelectionChange={handleAccountSelect} 
            />
            
          ))}
          <button type="submit" disabled={!isFormValid}>Credit Account</button>
        </form>
      </div>
    );
  };
  
  export default Form;