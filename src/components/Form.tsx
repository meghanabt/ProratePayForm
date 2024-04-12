import React from "react";
import AccountCard from "./AccountCard";
import accountDetails from "../utils/mockData";
import { useState, useEffect } from "react";
import type { Account } from "../../types";


type Props ={};
let accountSummary= accountDetails;

const Form = (props: Props) => {
    const [totalAmount, setTotalAmount]= useState(0);
    
    const [accounts, setAccounts] = useState<Account[]>(accountSummary);

    const calculateProratedAmounts = (totalAmount: number) => {
        const selectedAccounts = accounts.filter((account) => account.selected);
        if (selectedAccounts.length === 0) {
          // No accounts selected, set all prorated amounts to 0
          setAccounts(
            accounts.map((account) => ({ ...account, proratedAmount: 0 }))
          );
          return;
        }
    
        const totalSelectedBalance = selectedAccounts.reduce(
          (acc, current) => acc + current.originalBalance,
          0
        );
    
        if (totalAmount > totalSelectedBalance) {
          // Total amount exceeds selected accounts balance, set error
          console.error("Total amount exceeds selected accounts balance");
          return;
        }
    
        const proratedAmountPerAccount = totalAmount / selectedAccounts.length;
    
        setAccounts(
          accounts.map((account) =>
            account.selected
              ? { ...account, proratedAmount: Math.round(proratedAmountPerAccount * 100) / 100 }
              : account
          )
        );
      };
    

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = parseFloat(event.target.value);
        setTotalAmount(newAmount);
        calculateProratedAmounts(newAmount);
      };

//       const proratedAmountPerAccount = totalAmount / selectedAccounts.length;

//     setAccounts(
//       accounts.map((account) =>
//         account.selected
//           ? { ...account, proratedAmount: Math.round(proratedAmountPerAccount * 100) / 100 }
//           : account
//       )
//     );
//   };
    
    return (
        
      <div className="mt-4">
        <form id="credit-form">
          <label>Enter amount to credit $:</label>
          <input type="number" id="amount" name="amount" min="0" required 
                        value={totalAmount}
                        onChange={handleAmountChange}
          />
          {
          accounts.map((account)=>{ return(
                <AccountCard account={account} key={account.id}/>
          )
           

          })
          }
         

          <button type="submit">Credit Account</button>
        </form>
      </div>
    );
  };
  

export default Form;