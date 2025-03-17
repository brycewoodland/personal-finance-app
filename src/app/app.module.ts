import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CategoryComponent } from './category/category.component';
import { BudgetComponent } from './budget/budget.component';
import { ReportComponent } from './report/report.component';
import { HeaderComponent } from './sidebar.component';
import { DashboardBoxComponent } from './dashboard/dashboard-box/dashboard-box.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TransactionsComponent,
    CategoryComponent,
    BudgetComponent,
    ReportComponent,
    HeaderComponent,
    DashboardBoxComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }