import React, { useState } from 'react';
import { Account } from '../../types';

type Props = {
    account: Account;
    onSelectionChange: (accountId: number) => void;
};

const AccountCard: React.FC<Props> = ({ account, onSelectionChange }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        onSelectionChange(account.id);
    };

    // Function to format the account balance with two decimal places
    const formatAccountBalance = (balance: number) => {
        return balance.toFixed(2);
    };

    return (
        <div
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`border rounded-md p-4 mb-4 cursor-pointer transition-transform font-['Open_Sans']`}
            style={{
                width: 'calc(65% - 1rem)',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                backgroundColor: (isHovered && !account.selected) || account.selected ? '#f3f4f6' : 'transparent',
            }}
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <img className="mr-2 bank-logo" src={account.logo} alt="Bank Logo" style={{ width: '30px', height: '30px' }} />
                    <span className="text-xl text-black bank-name">{account.name}</span>
                </div>
                <div className='text-gray-500 '>
                    <span className="balance-label">Account Balance:</span>
                    <span className="balance-amount">${account.originalBalance}</span>
                </div>
            </div>
            {account.selected && account.proratedAmount > 0 && (
                <div className="flex justify-between text-blue-900">
                    <span className="prorated-label">Prorate Amount:</span>
                    <span className="prorated-value">${account.proratedAmount}</span>
                </div>
            )}
        </div>
    );
};

export default AccountCard;
