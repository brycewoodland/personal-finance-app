import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { BudgetService } from '../budget/budget.service';
import { Category } from './category.model';
import { Budget } from '../budget/budget.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  budgets: Budget[] = [];
  showAddCategoryModal: boolean = false;

  private colors: string[] = ['#5e63ff', '#00A3FF', '#2693C0', '#00D4B5'];

  constructor(
    private categoryService: CategoryService,
    private budgetService: BudgetService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchBudgets();
  }

  fetchCategories(): void {
    this.categoryService.getCategories();
    this.categoryService.categoryListChangedEvent.subscribe((categories: Category[]) => {
      this.categories = categories.map(category => {
        category.color = this.getRandomColor();
        return category;
      });
    });
  }

  fetchBudgets(): void {
    this.budgetService.getBudgets();
    this.budgetService.budgetListChangedEvent.subscribe((budgets: Budget[]) => {
      this.budgets = budgets;
    });
  }

  private getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }

  deleteCategory(category: Category): void {
    if (confirm(`Are you sure you want to delete the category "${category.name}"?`)) {
      this.categoryService.deleteCategory(category);
    }
  }

  navigateToAddCategory(): void {
    this.router.navigate(['/categories/add']);
  }
}
