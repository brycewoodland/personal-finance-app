import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-edit',
  standalone: false,
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  originalCategory: Category;
  category: Category;
  editMode: boolean = false;
  id: string;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.originalCategory = this.categoryService.getCategory(this.id);

      if (!this.originalCategory) {
        return;
      }

      this.editMode = true;
      this.category = JSON.parse(JSON.stringify(this.originalCategory));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newCategory = new Category(
      this.id,
      value.name,
      value.icon,
      value.userId, // Adjust as necessary
      value.description,
      new Date(), // createdAt
      new Date()  // updatedAt
    );

    if (this.editMode) {
      this.categoryService.updateCategory(this.originalCategory, newCategory);
    } else {
      this.categoryService.addCategory(newCategory);
    }

    this.router.navigate(['/categories']);
  }

  onCancel() {
    this.router.navigate(['/categories']);
  }
}