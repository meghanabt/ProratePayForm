import React from 'react';
import { Account } from '../../types';

type Props={
    account: Account
   
   
    onSelectionChange: any

};

const AccountCard= ({account, onSelectionChange}: Props)=>
{
    
    const handleClick = () => 
    {
            onSelectionChange(account.id);
            console.log("click check in Card", account.id )
           
    };


    return (
<div onClick={handleClick} className={account.selected ? 'selected' : ''}>

  <div className="card-header">
    <img className="bank-logo" src="path/to/bank_logo.png" alt="Bank Logo"/>
    <span className="bank-name">Bank Name</span>
   
</div>
<div className="account-balance">
    <span className="balance-label">Outstanding Balance:</span>
    <span className="balance-amount">$0.00</span> 
</div>
{account.selected && account.proratedAmount > 0 && ( // Conditional rendering for prorated amount
        <div className="prorated-amount">
          <span className="prorated-label">Prorated Amount:</span>
          <span className="prorated-value">${account.proratedAmount}</span>
          
        </div>
      )}
</div>


    );



}

export default AccountCard;