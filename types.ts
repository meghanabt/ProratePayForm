export type User =
{
    userId: number; // Unique identifier for the user
    name: string; // User's name 
    email: string; // User's email address 
    accounts: Account[]; // Array of Account objects
};

export type Account =
{
  id: number;
  name: string;
  originalBalance: number;
  selected: boolean;
  proratedAmount: number;
};