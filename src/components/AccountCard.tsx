import React from 'react';
import { Account } from '../../types';

type Props = {
    account: Account;
    onSelectionChange: (accountId: number) => void;
    
};

const AccountCard: React.FC<Props> = ({ account, onSelectionChange }) => {
    const handleClick = () => {
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
            {account.selected && account.proratedAmount > 0 && (
                <div className="prorated-amount">
                    <span className="prorated-label">Prorated Amount:</span>
                    <span className="prorated-value">${account.proratedAmount}</span>
                </div>
            )}
            {}
        </div>
    );
};

export default AccountCard;
