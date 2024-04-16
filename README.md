# Prorate Payment Form

## Overview

The Prorate Payment Form is a React application developed from scratch without any boiler plate code to run the server using Parcel bundler.This form allows users to distribute a total payment amount across multiple accounts based on their balances. This application is useful for scenarios where users need to make payments to multiple accounts proportionally.

## Features

- Enter the total payment amount
- Select accounts to distribute the payment to
- Automatically calculate prorated amounts for selected accounts
- Display error messages for invalid input or insufficient balances

## Installation

1. Clone the repository:

```bash
   git clone https://github.com/your-username/prorate-payment-form.git
```

2. Navigate to the project directory:

```bash
   cd ProRatePayForm/
```

3. Install dependencies:

```bash
    npm install
```

## Usage

1. Start the development server:

```bash
    npm run start
```
2. Run testcases:

```bash
    npm run test
```

2. Enter the total payment amount in the input field labeled "Amount to Credit $".

3. Select the accounts you want to distribute the payment to by clicking on their respective cards.

4. Click the "Pay" button to submit the payment.

5. If the form is valid, the payment will be submitted, and a success message will be displayed. Otherwise, error messages will be shown indicating the reason for the validation failure.

## Project Structure

- src/ : Contains the source code for the application.
- components/ : React components used in the application.
  1. components/tests: consists of unit testcases files
  2. others: individual components
- hooks/ : Custom React hook for managing state and logic.
- utils/ : consists mock data.

## Technologies Used

1. Parcel Bundler 
2. React
3. TypeScript
4. Jest
5. Tailwind CSS
