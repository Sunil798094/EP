export interface Transaction {
  id: number;
  date: Date;
  category: string;
  amount: number;
}

export interface Report {
  income: number;
  expenses: number;
  netBalance: number;
}
