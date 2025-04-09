import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from './transaction.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000/api/transaction'; // Adjust the URL as necessary
  transactions: Transaction[] = [];
  transactionsChangedEvent = new Subject<Transaction[]>();

  constructor(private http: HttpClient) { }

  // Fetch all transactions
  getTransactions() {
    this.http.get<Transaction[]>(this.apiUrl).subscribe(
      (transactions: Transaction[]) => {
        this.transactions = transactions;
        this.transactionsChangedEvent.next(this.transactions.slice()); // Emit the updated transactions
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }

  // Add a new transaction
  addTransaction(transaction: Transaction) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<{ message: string, transaction: Transaction }>(this.apiUrl, transaction, { headers }).subscribe(
      (responseData) => {
        this.transactions.push(responseData.transaction);
        this.transactionsChangedEvent.next(this.transactions.slice()); // Emit the updated transactions
      },
      (error) => {
        console.error('Error adding transaction:', error);
      }
    );
  }

  // Update an existing transaction
  updateTransaction(originalTransaction: Transaction, newTransaction: Transaction) {
    const pos = this.transactions.findIndex(t => t.customId === originalTransaction.customId);
    if (pos < 0) {
      return;
    }

    newTransaction.customId = originalTransaction.customId; // Ensure the ID is preserved

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.apiUrl + '/' + originalTransaction.customId, newTransaction, { headers }).subscribe(
      () => {
        this.transactions[pos] = newTransaction;
        this.transactionsChangedEvent.next(this.transactions.slice()); // Emit the updated transactions
      },
      (error) => {
        console.error('Error updating transaction:', error);
      }
    );
  }

  // Delete a transaction
  deleteTransaction(transaction: Transaction) {
    const pos = this.transactions.findIndex(t => t.customId === transaction.customId);
    if (pos < 0) {
      return;
    }

    this.http.delete(this.apiUrl + '/' + transaction.customId).subscribe(
      () => {
        this.transactions.splice(pos, 1);
        this.transactionsChangedEvent.next(this.transactions.slice()); // Emit the updated transactions
      },
      (error) => {
        console.error('Error deleting transaction:', error);
      }
    );
  }
}
