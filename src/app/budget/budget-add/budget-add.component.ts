import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Budget } from '../budget.model';
import { BudgetService } from '../budget.service';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/category.model';

@Component({
  selector: 'app-budget-add',
  standalone: false,
  templateUrl: './budget-add.component.html',
  styleUrls: ['./budget-add.component.css']
})
export class BudgetAddComponent implements OnInit {

  originalBudget: Budget;
  budget: Budget = new Budget(null, 0, 0, 0, null, null, new Date(), new Date());
  editMode: boolean = false;
  customId: number;
  categories: Category[] = [];

  constructor(
    private budgetService: BudgetService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.customId = +params['id'];

      if (!this.customId && this.customId !== 0) {
        this.editMode = false;
        return;
      }

      this.originalBudget = this.budgetService.getBudget(this.customId);

      if (!this.originalBudget) return;

      this.editMode = true;
      this.budget = JSON.parse(JSON.stringify(this.originalBudget));
    });

    this.categoryService.getCategories();
    this.categoryService.categoryListChangedEvent.subscribe((categories: Category[]) => {
      this.categories = categories;
      console.log('Fetched categories:', this.categories);
    });
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) return;

    const value = form.value;
    const newBudget: Budget = {
      customId: this.customId,
      allocated: value.allocated,
      categoryId: value.categoryId,
      spent: 0,
      remaining: value.allocated,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (this.editMode) {
      this.budgetService.updateBudget(this.originalBudget, newBudget);
    } else {
      this.budgetService.addBudget(newBudget);
    }

    this.router.navigate(['/budget']);
  }

  onCancel(): void {
    this.router.navigate(['/budget']);
  }
}
