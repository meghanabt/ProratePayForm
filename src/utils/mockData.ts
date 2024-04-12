import type { User, Account } from "../../types";

// const UserDetails: User[] = [{
//     userId: 1,
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     accounts: [
//       {
//         id: 101,
//         bankName: 'First National Bank',
//         logo: 'https://www.firstnationalbank.com/logo.png',
//         balance: 1000.00,
//       },
//       {
//         id: 102,
//         bankName: 'Savings Bank',
//         logo: 'https://www.savingsbank.com/logo.png',
//         balance: 500.00,
//       },
//     ],
//   }];

const accountDetails: Account[] = [

  { id: 1, name: "Account 1", originalBalance: 100, selected: false, proratedAmount: 0 },
  { id: 2, name: "Account 2", originalBalance: 50, selected: false, proratedAmount: 0 },
  { id: 3, name: "Account 3", originalBalance: 150, selected: false, proratedAmount: 0 },
];

  export default accountDetails;
  