import { Component, OnInit } from '@angular/core';
import { Budget } from './budget.model';
import { BudgetService } from './budget.service';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute and Router

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
  standalone: false
})
export class BudgetComponent implements OnInit {
  budgets: Budget[] = [];
  showAddCategoryModal: boolean = false; // Default modal visibility

  private colors: string[] = ['#5e63ff', '#00A3FF', '#2693C0', '#00D4B5'];

  constructor(
    private budgetService: BudgetService,
    private route: ActivatedRoute, // Inject ActivatedRoute
    private router: Router // Inject Router
  ) { }

  ngOnInit() {
    this.budgetService.getBudgets();
    this.budgetService.budgetListChangedEvent.subscribe(
      (budgets: Budget[]) => {
        this.budgets = budgets.map(budget => ({
          ...budget,
          color: this.getRandomColor()
        }));
      }
    );
  }

  onBudgetAdded() {
    this.showAddCategoryModal = false; // Close the modal after adding a budget
    this.loadBudgets();
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
    const totalAllocated = this.budgets.reduce((sum, budget) => sum + budget.allocated, 0);
    const totalSpent = this.budgets.reduce((sum, budget) => sum + budget.spent, 0);
    return totalAllocated - totalSpent; // Total allocated minus total spent
  }

  private getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }
}
