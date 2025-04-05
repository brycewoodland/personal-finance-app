import { Component, OnInit } from '@angular/core';
import { Budget } from './budget.model';
import { BudgetService } from './budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
  standalone: false
})
export class BudgetComponent implements OnInit {
  budgets: Budget[] = [];
  showAddCategoryModal: boolean = false;

  // Define an array of colors
  private colors: string[] = ['#5e63ff', '#00A3FF', '#2693C0', '#00D4B5'];

  constructor(private budgetService: BudgetService) { }

  ngOnInit() {
    this.budgetService.getBudgets();
    this.budgetService.budgetListChangedEvent.subscribe(
      (budgets: Budget[]) => {
        this.budgets = budgets.map(budget => ({
          ...budget,
          color: this.getRandomColor() // Assign a random color to each budget
        }));
      }
    );
  }

  loadBudgets() {
    this.budgetService.getBudgets();
  }

  getProgress(spent: number, allocated: number): number {
    return (spent / allocated) * 100;
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

  // Method to get a random color from the colors array
  private getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }
}
