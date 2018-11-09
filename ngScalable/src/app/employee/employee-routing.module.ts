import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as fromContainer from './containers';
import * as fromGuard from './guards';

const routes: Routes = [
  {
    path: '',
    // component: fromContainer.EmployeeListComponent
    component: fromContainer.EmployeeShellComponent
  },
  {
    path: 'new',
    component: fromContainer.EmployeeComponent
  },
  {
    path: ':employeeId',
    component: fromContainer.EmployeeComponent,
    canActivate: [fromGuard.EmployeeEditGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
