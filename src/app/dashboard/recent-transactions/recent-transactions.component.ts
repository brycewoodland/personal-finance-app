import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../transactions/transaction.service';
import { Transaction } from '../../transactions/transaction.model';

@Component({
    selector: 'app-recent-transactions',
    templateUrl: './recent-transactions.component.html',
    styleUrls: ['./recent-transactions.component.css'],
    standalone: false
})
export class RecentTransactionsComponent implements OnInit {
    transactions: Transaction[] = [];

    constructor(private transactionService: TransactionService) { }

    ngOnInit(): void {
        this.transactionService.getTransactions();
        this.transactionService.transactionsChangedEvent.subscribe((transactions: Transaction[]) => {
            this.transactions = transactions;
            console.log('Fetched transactions:', this.transactions);
        });
    }
} 