// src/app/report/report.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-report',
  standalone: false,
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  transactions = [
    { date: '2023-01-01', description: 'Salary', amount: 5000, type: 'Income' },
    { date: '2023-01-05', description: 'Groceries', amount: -200, type: 'Expense' },
    { date: '2023-01-10', description: 'Utilities', amount: -150, type: 'Expense' },
    { date: '2023-01-15', description: 'Freelance Work', amount: 500, type: 'Income' },
  ];
}