import { Component } from '@angular/core';

interface Transaction {
    date: string;
    description: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
}

@Component({
    selector: 'app-recent-transactions',
    templateUrl: './recent-transactions.component.html',
    styleUrls: ['./recent-transactions.component.css'],
    standalone: false
})
export class RecentTransactionsComponent {
    transactions: Transaction[] = [
        {
            date: '2024-03-15',
            description: 'Grocery Shopping',
            amount: 150.50,
            type: 'expense',
            category: 'Food'
        },
        {
            date: '2024-03-14',
            description: 'Salary',
            amount: 3000.00,
            type: 'income',
            category: 'Income'
        },
        {
            date: '2024-03-13',
            description: 'Netflix Subscription',
            amount: 15.99,
            type: 'expense',
            category: 'Entertainment'
        },
        {
            date: '2024-03-12',
            description: 'Gas',
            amount: 45.00,
            type: 'expense',
            category: 'Transportation'
        }
    ];
} 