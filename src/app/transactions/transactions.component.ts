import { Component, OnInit } from '@angular/core';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.model';

@Component({
  selector: 'app-transactions',
  standalone: false,
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService.getTransactions();
    this.transactionService.transactionsChangedEvent.subscribe((transactions: Transaction[]) => {
      this.transactions = transactions;
      console.log('Fetched transactions:', this.transactions);
    });
  }

  showAddTransactionModal: boolean = false;
}
