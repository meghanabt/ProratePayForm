import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PaymentForm from "../PaymentForm";

test("Test for Submit Button in Payment Form", ()=>{
  
  render(<PaymentForm/>);
  const button=screen.getByRole("button");
  expect(button).toBeInTheDocument();

});

test("Test for Placeholder for Input Field in Payment Form", ()=>{
  
  render(<PaymentForm/>);
  const inputPlaceholder=screen.getByPlaceholderText("Enter Amount");
  expect(inputPlaceholder).toBeInTheDocument();

});


test('simulate amount input and card selection', () => {

  render(<PaymentForm />);

  const amountInput = screen.getByPlaceholderText('Enter Amount');
  fireEvent.change(amountInput, { target: { value: '343.09' } });

  const cards = screen.getAllByTestId('account-card');
  fireEvent.click(cards[0]);
  fireEvent.click(cards[1]);

  const prorateAmounts = screen.getAllByTestId('prorate-amount');
  expect(prorateAmounts[0]).toHaveTextContent('57.18');
  expect(prorateAmounts[1]).toHaveTextContent('285.91');
});
