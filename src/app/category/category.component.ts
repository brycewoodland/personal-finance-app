import { Component } from '@angular/core';

interface Category {
  name: string;
  icon: string;
  color: string;
  totalSpent: number;
  budget: number;
  transactionCount: number;
}

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories: Category[] = [
    {
      name: 'Food & Dining',
      icon: 'restaurant',
      color: '#FF6B6B',
      totalSpent: 450.75,
      budget: 500,
      transactionCount: 12
    },
    {
      name: 'Transportation',
      icon: 'Vehicle',
      color: '#4ECDC4',
      totalSpent: 200.50,
      budget: 300,
      transactionCount: 5
    },
    {
      name: 'Entertainment',
      icon: 'movie',
      color: '#45B7D1',
      totalSpent: 150.25,
      budget: 200,
      transactionCount: 8
    },
    {
      name: 'Shopping',
      icon: 'shopping',
      color: '#96CEB4',
      totalSpent: 325.00,
      budget: 400,
      transactionCount: 15
    }
  ];

  showAddCategoryModal: boolean = false;
}
