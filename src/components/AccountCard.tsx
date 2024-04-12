import React from 'react';
import { Account } from '../../types';

type Props={
    account: Account
};

const handleClick = (event) => {
    console.log('Clicked!', event.target);
    // Add any other logic you want to execute when the div is clicked
  };


const AccountCard= ({account}: Props)=>
{
    return (
<div className="account-card mt-4 mb-4 " onClick={handleClick}>

  <div className="card-header">
    <img className="bank-logo" src="path/to/bank_logo.png" alt="Bank Logo"/>
    <span className="bank-name">Bank Name</span>
   
</div>
<div className="account-balance">
    <span className="balance-label">Outstanding Balance:</span>
    <span className="balance-amount">$0.00</span> 
</div>
</div>


    );



}

export default AccountCard;