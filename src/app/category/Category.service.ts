import { Injectable, EventEmitter } from '@angular/core';
import { Category } from './category.model'; // Ensure this path is correct
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: Category[] = [];
  categorySelectedEvent = new EventEmitter<Category>();
  categoryListChangedEvent = new Subject<Category[]>();
  maxCategoryId: number;
  private apiUrl = 'http://localhost:3000/api/category'; // Adjust the URL as necessary

  constructor(private http: HttpClient) { }

  getMaxId(): number {
    let maxId = 0;
    for (let category of this.categories) {
      let currentId = parseInt(category.id, 10); // Convert string to number
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getCategories(): void {
    this.http.get<Category[]>(this.apiUrl).subscribe((categories: Category[]) => {
      this.categories = categories;
      this.maxCategoryId = this.getMaxId();
      this.categoryListChangedEvent.next(this.categories);
    });
  }

  getCategory(id: string): Category {
    return this.categories.find(category => category.id === id);
  }

  addCategory(newCategory: Category) {
    if (!newCategory) {
      return;
    }

    // Ensure new category has no ID before sending it
    newCategory.id = null; // Adjust as necessary

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string, category: Category }>(this.apiUrl, newCategory, { headers }).subscribe(
      (responseData) => {
        this.categories.push(responseData.category);
        this.categoryListChangedEvent.next(this.categories);
      },
      (error) => {
        console.error('Error adding category:', error);
      }
    );
  }

  updateCategory(originalCategory: Category, newCategory: Category) {
    if (!originalCategory || !newCategory) {
      return;
    }

    const pos = this.categories.findIndex(c => c.id === originalCategory.id);
    if (pos < 0) {
      return;
    }

    newCategory.id = originalCategory.id; // Ensure the ID remains the same

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(this.apiUrl + '/' + originalCategory.id, newCategory, { headers }).subscribe(
      () => {
        this.categories[pos] = newCategory;
        this.categoryListChangedEvent.next(this.categories);
      },
      (error) => {
        console.error('Error updating category:', error);
      }
    );
  }

  deleteCategory(category: Category) {
    if (!category) {
      return;
    }

    const pos = this.categories.findIndex(c => c.id === category.id);

    if (pos < 0) {
      return;
    }

    this.http.delete(this.apiUrl + '/' + category.id).subscribe(
      () => {
        this.categories.splice(pos, 1);
        this.categoryListChangedEvent.next(this.categories);
      },
      (error) => {
        console.error('Error deleting category:', error);
      }
    );
  }
}