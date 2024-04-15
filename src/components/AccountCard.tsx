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
        <div onClick={handleClick} className="border border-gray-300 rounded p-4 mb-4 flex items-center">
            <img className="bank-logo w-20 h-20 mr-4" src={account.logo} alt="Bank Logo" />
            <div>
                <div className="mb-2">
                    <span className="bank-name">{account.name}</span>
                </div>
                <div className="mb-2">
                    <span className="balance-label">Outstanding Balance:</span>
                    <span className="balance-amount">${account.originalBalance}</span>
                </div>
                {account.selected && account.proratedAmount > 0 && (
                    <div className="prorated-amount">
                        <span className="prorated-label">Prorated Amount:</span>
                        <span className="prorated-value">${account.proratedAmount}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountCard;
