import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardBoxComponent } from './dashboard-box/dashboard-box.component';
import { DashboardGraphComponent } from './dashboard-graph/dashboard-graph.component';
import { RecentTransactionsComponent } from './recent-transactions/recent-transactions.component';

@NgModule({
    declarations: [
        DashboardComponent,
        DashboardBoxComponent,
        DashboardGraphComponent,
        RecentTransactionsComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DashboardComponent
    ]
})
export class DashboardModule { } 