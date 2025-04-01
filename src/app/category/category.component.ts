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
      color: '#5e63ff',
      totalSpent: 450.75,
      budget: 500,
      transactionCount: 12
    },
    {
      name: 'Transportation',
      icon: 'Vehicle',
      color: '#00A3FF',
      totalSpent: 200.50,
      budget: 300,
      transactionCount: 5
    },
    {
      name: 'Entertainment',
      icon: 'movie',
      color: '#2693C0',
      totalSpent: 150.25,
      budget: 200,
      transactionCount: 8
    },
    {
      name: 'Shopping',
      icon: 'shopping',
      color: '#00D4B5',
      totalSpent: 325.00,
      budget: 400,
      transactionCount: 15
    }
  ];

  showAddCategoryModal: boolean = false;
}
