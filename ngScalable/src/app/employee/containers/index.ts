import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeShellDetailComponent } from './employee-shell-detail/employee-shell-detail.component';
import { EmployeeShellListComponent } from './employee-shell-list/employee-shell-list.component';
import { EmployeeShellComponent } from './employee-shell/employee-shell.component';
import { EmployeeComponent } from './employee/employee.component';

export const containers: any[] = [
  EmployeeListComponent,
  EmployeeComponent,
  EmployeeShellComponent,
  EmployeeShellListComponent,
  EmployeeShellDetailComponent
];

export * from './employee-list/employee-list.component';
export * from './employee-shell-detail/employee-shell-detail.component';
export * from './employee-shell-list/employee-shell-list.component';
export * from './employee-shell/employee-shell.component';
export * from './employee/employee.component';
