import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../budget/budget.service';
import { Budget } from '../budget/budget.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  totalBudget: number = 0;
  totalSpent: number = 0;
  totalRemaining: number = 0;

  constructor(private budgetService: BudgetService) {}

  ngOnInit() {
    this.budgetService.getBudgets();
    this.budgetService.budgetListChangedEvent.subscribe((budgets: Budget[]) => {
      this.calculateTotals(budgets);
    });
  }

  calculateTotals(budgets: Budget[]) {
    this.totalBudget = budgets.reduce((sum, budget) => sum + budget.allocated, 0);
    this.totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
    this.totalRemaining = this.totalBudget - this.totalSpent;
  }
}