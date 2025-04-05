import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar.component';
import { DashboardBoxComponent } from './dashboard/dashboard-box/dashboard-box.component';
import { DashboardGraphComponent } from './dashboard/dashboard-graph/dashboard-graph.component';
import { RecentTransactionsComponent } from './dashboard/recent-transactions/recent-transactions.component';
import { CategoryComponent } from './category/category.component';
import { BudgetComponent } from './budget/budget.component';
import { ReportComponent } from './report/report.component';
import { BudgetAddComponent } from './budget/budget-add/budget-add.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    DashboardBoxComponent,
    DashboardGraphComponent,
    RecentTransactionsComponent,
    CategoryComponent,
    BudgetComponent,
    ReportComponent,
    BudgetAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }