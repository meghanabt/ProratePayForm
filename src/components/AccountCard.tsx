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
        <div
            onClick={handleClick}
            className={`border border-gray-200 rounded-md p-4 mb-4`}
            style={{ width: 'calc(65% - 1rem)' }} // Set width of each card
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <img className="mr-2 bank-logo" src={account.logo} alt="Bank Logo" style={{ width: '30px', height: '30px' }} />
                    <span className="bank-name">{account.name}</span>
                </div>
                <div>
                    <span className="balance-label">Outstanding Balance:</span>
                    <span className="balance-amount">{account.originalBalance}</span>
                </div>
            </div>
            {account.selected && account.proratedAmount > 0 && (
                <div className="flex justify-between">
                    <span className="prorated-label">Prorated Amount:</span>
                    <span className="prorated-value">${account.proratedAmount}</span>
                </div>
            )}
        </div>
    );
};

export default AccountCard;
