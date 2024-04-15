// const {render}=require('@testing-library/react')
// const dom=require('@testing-library/jest-dom')

import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "../Form";


test("Test for Header Check in Form", ()=>{
    render(<Form/>);


     const heading=screen.getByRole("heading")

    //Assertion
    
   expect(heading).toBeInTheDocument()
})

test("Test for Submit Button in Payment Form", ()=>{
    render(<Form/>);
  

     const button=screen.getByRole("button")


    
   expect(button).toBeInTheDocument()
})

test("Test for Placeholder for Input Field in Payment Form", ()=>{
    render(<Form/>);
  

     const inputPlaceholder=screen.getByPlaceholderText("Enter Amount")

     fireEvent.


    
   expect(inputPlaceholder).toBeInTheDocument()
})