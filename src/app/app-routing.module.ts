import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { BudgetComponent } from './budget/budget.component';
import { BudgetAddComponent } from './budget/budget-add/budget-add.component';
import { ReportComponent } from './report/report.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
// import { SettingsComponent } from './settings/settings.component';
// import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    {
        path: 'categories', component: CategoryComponent, children: [
            { path: 'edit/:id', component: CategoryEditComponent },
            { path: 'new', component: CategoryAddComponent }

        ]
    },
    {
        path: 'budget', component: BudgetComponent, children: [
            { path: 'new', component: BudgetAddComponent }
        ]
    },
    { path: 'reports', component: ReportComponent },
    // { path: 'settings', component: SettingsComponent },
    // { path: 'logout', component: LogoutComponent },
    { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
