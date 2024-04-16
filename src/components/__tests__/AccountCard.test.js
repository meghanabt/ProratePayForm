import {render, screen} from '@testing-library/react';
import AccountCard from '../AccountCard';
import accountDetails from '../../utils/mockData';
import "@testing-library/jest-dom";

test("Test to check if Props is passed while rendering Account Card Component", ()=>{
              
    render(<AccountCard account={accountDetails[1]} onSelectionChange={accountDetails[1].id}  />)
    const accountName= screen.getByText('JPMorgan Chase');
    expect(accountName).toBeInTheDocument()

})