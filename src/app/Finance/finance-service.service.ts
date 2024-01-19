import { Injectable } from '@angular/core';
import { Transaction, Report } from './finance.model';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {

  // Array to store transactions
  private transactions: Transaction[] = [];

  // Get all transactions
  getTransactions(): Transaction[] {
    return this.transactions;
  }

  // Add a new transaction
  addTransaction(transaction: Transaction): void {
    // Assign a unique ID to the transaction
    transaction.id = this.transactions.length + 1;

    // Add the transaction to the array
    this.transactions.push(transaction);
  }

  // Delete a transaction by ID
  deleteTransaction(id: number): void {
    // Filter out the transaction with the specified ID
    this.transactions = this.transactions.filter((t) => t.id !== id);
  }

  // Generate a financial report based on transactions
  generateReport(transactions: Transaction[]): Report {
    // Calculate total income by summing positive amounts
    const income = transactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    // Calculate total expenses by summing negative amounts
    const expenses = transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0);

    // Calculate net balance by adding income and subtracting expenses
    const netBalance = income + expenses;

    // Return a report object
    return { income, expenses, netBalance };
  }
}


// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class FinanceServiceService {

//   constructor() { }
// }
