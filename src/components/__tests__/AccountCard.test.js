import {render, screen, fireEvent} from '@testing-library/react';
import AccountCard from '../AccountCard';
import accountDetails from '../../utils/mockData';
import "@testing-library/jest-dom";

test("Test to check if Props is passed while rendering Account Card Component", ()=>{
              
    render(<AccountCard account={accountDetails[1]} onSelectionChange={accountDetails[1].id}  />)
    const accountName= screen.getByText('JPMorgan Chase');
    expect(accountName).toBeInTheDocument()

});

describe('AccountCard component', () => {
    const mockAccount = {
      id: 1,
      name: 'Test Account',
      logo: 'test_logo.png',
      originalBalance: 100,
      selected: false,
      proratedAmount: 50,
    };
  
    test('renders account card with correct details', () => {
      const onSelectionChange = jest.fn();
      const { getByText, getByTestId } = render(
        <AccountCard account={mockAccount} onSelectionChange={onSelectionChange} />
      );
  
      expect(getByTestId('account-card')).toBeInTheDocument();
      expect(getByText('Test Account')).toBeInTheDocument();
      expect(getByText('$100')).toBeInTheDocument();
    });
  
    test('calls onSelectionChange when clicked', () => {
      const onSelectionChange = jest.fn();
      const { getByTestId } = render(
        <AccountCard account={mockAccount} onSelectionChange={onSelectionChange} />
      );
  
      fireEvent.click(getByTestId('account-card'));
      expect(onSelectionChange).toHaveBeenCalledWith(1);
    });
  
    test('displays prorated amount when account is selected and prorated amount is greater than 0', () => {
      const selectedAccount = { ...mockAccount, selected: true };
      const { getByTestId } = render(
        <AccountCard account={selectedAccount} onSelectionChange={() => {}} />
      );
  
      expect(getByTestId('prorate-amount')).toBeInTheDocument();
      expect(getByTestId('prorate-amount')).toHaveTextContent('$50');
    });
  
    test('does not display prorated amount when account is not selected', () => {
      const { queryByTestId } = render(
        <AccountCard account={mockAccount} onSelectionChange={() => {}} />
      );
  
      expect(queryByTestId('prorate-amount')).toBeNull();
    });
    
  });