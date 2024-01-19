import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction, Report } from '../finance.model';
import { FinanceService } from '../finance-service.service'; 

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css'],
})
export class FinanceComponent {
  // Form group for transaction input
  transactionForm: FormGroup;

  // Array to store transactions
  transactions: Transaction[] = [];

  // Object to store financial report
  report: Report;

  // Date range for the financial report
  reportStartDate: Date;
  reportEndDate: Date;

  constructor(private fb: FormBuilder, private financeService: FinanceService) {
    // Initialize the transaction form with validators
    this.transactionForm = this.fb.group({
      date: [null, Validators.required],
      category: ['', Validators.required],
      amount: [null, [Validators.required, Validators.pattern(/^-?\d*(\.\d+)?$/)]],
    });

    // Fetch transactions from the service
    this.transactions = this.financeService.getTransactions();

    // Generate the initial financial report
    this.generateReport();
  }

  // Add a new transaction
  addTransaction(): void {
    const transaction: Transaction = this.transactionForm.value;
    this.financeService.addTransaction(transaction);
    this.transactions = this.financeService.getTransactions();
    this.generateReport();
    this.transactionForm.reset();
  }

  // Delete a transaction by ID
  deleteTransaction(id: number): void {
    this.financeService.deleteTransaction(id);
    this.transactions = this.financeService.getTransactions();
    this.generateReport();
  }

  // Generate a financial report based on transactions
  generateReport(): void {
    this.report = this.financeService.generateReport(this.transactions);
  }
}
