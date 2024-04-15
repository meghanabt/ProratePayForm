import React from 'react';
import { Account } from '../../types';

type Props = {
    account: Account;
    isSelected: boolean;
    proratedAmount: number;
    onSelectionChange: (accountId: number) => void;
    accounts: Account[];
};

const AccountCard: React.FC<Props> = ({ account, isSelected, proratedAmount, onSelectionChange, accounts }) => {
    const handleClick = () => {
      console.log("prorate-amount in child", proratedAmount)
      console.log("isSelected", !isSelected)
        onSelectionChange(account.id);
    };

    return (
        <div onClick={handleClick} className={account.selected ? 'selected' : ''}>
            <div className="card-header">
                <img className="bank-logo" src="path/to/bank_logo.png" alt="Bank Logo"/>
                <span className="bank-name">{account.name}</span>
            </div>
            <div className="account-balance">
                <span className="balance-label">Outstanding Balance:</span>
                <span className="balance-amount">{account.originalBalance}</span> 
            </div>
            {isSelected && proratedAmount > 0 && (
                <div className="prorated-amount">
                    <span className="prorated-label">Prorated Amount:</span>
                    <span className="prorated-value">${proratedAmount}</span>
                </div>
            )}
        </div>
    );
};

export default AccountCard;
