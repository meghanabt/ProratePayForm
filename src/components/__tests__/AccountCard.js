import {render, screen} from '@testing-library/react';
import AccountCard from '../AccountCard';
import accountDetails from '../../utils/mockData';
import "@testing-library/jest-dom";

test("Test to check if Props is passed while rendering Account Card Component", ()=>{
              
              render(<AccountCard account={accountDetails[0]} onSelectionChange={accountDetails[0].id}  />)
    const accountName= screen.getByText('Account 1');
    expect(accountName).toBeInTheDocument()

})