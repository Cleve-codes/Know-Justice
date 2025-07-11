export interface Transaction {
  id: string
  type: "credit" | "debit"
  amount: number
  description: string
  date: string
  category: string
}

export interface BankCard {
  id: string
  cardNumber: string
  cardHolder: string
  expiryDate: string
  bankName: string
  cardType: "visa" | "mastercard" | "amex"
}

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "credit",
    amount: 250.0,
    description: "Cashback Reward",
    date: "2024-01-10",
    category: "Rewards",
  },
  {
    id: "2",
    type: "debit",
    amount: 45.99,
    description: "Grocery Store",
    date: "2024-01-09",
    category: "Shopping",
  },
  {
    id: "3",
    type: "debit",
    amount: 12.5,
    description: "Coffee Shop",
    date: "2024-01-08",
    category: "Food",
  },
  {
    id: "4",
    type: "credit",
    amount: 1200.0,
    description: "Salary Deposit",
    date: "2024-01-05",
    category: "Income",
  },
  {
    id: "5",
    type: "debit",
    amount: 89.99,
    description: "Gas Station",
    date: "2024-01-04",
    category: "Transportation",
  },
]

export const mockBankCards: BankCard[] = [
  {
    id: "1",
    cardNumber: "4532123456789012",
    cardHolder: "John Doe",
    expiryDate: "12/26",
    bankName: "Chase Bank",
    cardType: "visa",
  },
  {
    id: "2",
    cardNumber: "5555123456789012",
    cardHolder: "John Doe",
    expiryDate: "08/25",
    bankName: "Bank of America",
    cardType: "mastercard",
  },
  {
    id: "3",
    cardNumber: "378282246310005",
    cardHolder: "John Doe",
    expiryDate: "03/27",
    bankName: "American Express",
    cardType: "amex",
  },
]
