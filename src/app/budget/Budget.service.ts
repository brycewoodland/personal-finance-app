import { Injectable, EventEmitter } from '@angular/core';
import { Budget } from './budget.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  budgets: Budget[] = [];
  budgetSelectedEvent = new EventEmitter<Budget>();
  budgetListChangedEvent = new EventEmitter<Budget[]>();
  maxBudgetId: number;
  budgetsSubject = new Subject<Budget[]>();
  private apiUrl = 'http://localhost:3000/api/budget';

  constructor(private http: HttpClient) { }

  getMaxId(): number {
    let maxId = 0;
    for (let budget of this.budgets) {
      let currentId = budget.customId;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getBudgets() {
    this.http.get<Budget[]>(this.apiUrl).subscribe(
      (budgets: Budget[]) => {
        this.budgets = budgets ? budgets : [];
        this.maxBudgetId = this.getMaxId();

        // Emit updated budget list
        this.budgetListChangedEvent.next(this.budgets.slice());
      },
      (error) => {
        console.error('Error fetching budgets:', error);
      }
    );
  }
  
  getBudget(id: number): Budget {
    return this.budgets.find(budget => budget.customId === id);
  }

  addBudget(newBudget: Budget) {
    if (!newBudget) {
      return;
    }

    // Ensure new budget has no ID before sending it
    newBudget.customId = null;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: String, budget: Budget }>(this.apiUrl, newBudget, { headers }).subscribe(
      (responseData) => {
        this.budgets.push(responseData.budget);
        this.sortAndSend();
      },
      (error) => {
        console.error('Error adding budget:', error);
      }
    );
  }

  updateBudget(originalBudget: Budget, newBudget: Budget) {
    if (!originalBudget || !newBudget) {
      return;
    }

    const pos = this.budgets.findIndex(b => b.customId === originalBudget.customId);
    if (pos < 0) {
      return;
    }

    newBudget.customId = originalBudget.customId;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(this.apiUrl + '/' + originalBudget.customId, newBudget, { headers }).subscribe(
      () => {
        this.budgets[pos] = newBudget;
        this.sortAndSend();
      },
      (error) => {
        console.error('Error updating budget:', error);
      }
    );
  }
  
  deleteBudget(budget: Budget) {
    if (!budget) {
      return;
    }

    const pos = this.budgets.findIndex(b => b.customId === budget.customId);

    if (pos < 0) {
      return;
    }

    this.http.delete(this.apiUrl + '/' + budget.customId).subscribe(
      () => {
        this.budgets.splice(pos, 1);
        this.sortAndSend();
      },
      (error) => {
        console.error('Error deleting budget:', error);
      }
    );
  }

 private sortAndSend() {
    this.budgets.sort((a, b) => (a.categoryId > b.categoryId) ? -1 : a.categoryId < b.categoryId ? 1 : 0);
    this.budgetListChangedEvent.next(this.budgets.slice());
 }
}
