import { Component } from '@angular/core';

interface Budget {
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  color: string;
}

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css',
  standalone: false
})
export class BudgetComponent {
  budgets: Budget[] = [
    { category: 'Food & Dining', allocated: 500, spent: 450.75, remaining: 49.25, color: '#5e63ff' },
    { category: 'Transportation', allocated: 300, spent: 200.50, remaining: 99.50, color: '#00A3FF' },
    { category: 'Entertainment', allocated: 200, spent: 150.25, remaining: 49.75, color: '#2693C0' },
    { category: 'Shopping', allocated: 400, spent: 325, remaining: 75, color: '#00D4B5' }
  ];
  showAddCategoryModal: boolean = false;

  getProgress(spent: number, allocated: number): number {
    return (spent / allocated) * 100;
  }

  openBudgetModal() {

  }

  getTotalAllocated(): number {
    return this.budgets.reduce((sum, budget) => sum + budget.allocated, 0);
  }
  
  getTotalSpent(): number {
    return this.budgets.reduce((sum, budget) => sum + budget.spent, 0);
  }
  
  getTotalRemaining(): number {
    return this.budgets.reduce((sum, budget) => sum + budget.remaining, 0);
  }
}
