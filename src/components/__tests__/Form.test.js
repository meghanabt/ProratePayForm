import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PaymentForm from "../PaymentForm";


test("Test for Header Check in Form", ()=>{
    
  render(<PaymentForm/>);
  const heading=screen.getByRole("heading");
  expect(heading).toBeInTheDocument();

});

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