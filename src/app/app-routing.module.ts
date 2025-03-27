import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { BudgetComponent } from './budget/budget.component';
import { ReportComponent } from './report/report.component';
// import { SettingsComponent } from './settings/settings.component';
// import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'categories', component: CategoryComponent },
    { path: 'budget', component: BudgetComponent },
    { path: 'reports', component: ReportComponent },
    // { path: 'settings', component: SettingsComponent },
    // { path: 'logout', component: LogoutComponent },
    { path: '**', redirectTo: '/dashboard' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
