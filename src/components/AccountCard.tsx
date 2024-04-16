import React, { useState } from 'react';
import { Account } from '../../types';

type Props = {
    account: Account; // Account object containing details
    onSelectionChange: (accountId: number) => void; // Function to handle account selection change
};

const AccountCard: React.FC<Props> = ({ account, onSelectionChange }) => {
    // State to track hover state
    const [isHovered, setIsHovered] = useState(false);

    // Function to handle click event
    const handleClick = () => {
        onSelectionChange(account.id); // Call onSelectionChange with account ID
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
                backgroundColor: (isHovered && !account.selected) || account.selected ? '#e5e7eb' : 'white',
            }}
        >
            {/* Content of the account card */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    
                    {/* Bank logo */}
                    <img className="mr-2 bank-logo" src={account.logo} alt="Bank Logo" style={{ width: '35px', height: '30px' }} />
                    
                    {/* Bank name */}
                    <span className="text-xl text-gray-800 bank-name">{account.name}</span>
                </div>
                
                {/* Account balance */}
                <div className='text-gray-500 '>
                    <span className="balance-label">Account Balance:</span>
                    <span className="balance-amount">${account.originalBalance}</span>
                </div>
            </div>
            
            {/* Display prorated amount if account is selected and prorated amount is greater than 0 */}
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
