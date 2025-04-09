import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-add',
  standalone: false,
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  category: Category = new Category('', '', '', '', '', new Date(), new Date());

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Any initialization logic can go here
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) return;

    this.category.createdAt = new Date();
    this.category.updatedAt = new Date();

    this.categoryService.addCategory(this.category);
    this.router.navigate(['/categories']); // Navigate back to categories after adding
  }

  onCancel(): void {
    this.router.navigate(['/categories']); // Navigate back to categories
  }
}
