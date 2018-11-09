import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Employee } from '../../model/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-shell-list',
  templateUrl: 'employee-shell-list.component.html'
})
export class EmployeeShellListComponent implements OnInit, OnDestroy {
  pageTitle = 'Employees';

  employees: Employee[];
  selectedEmployee: Employee;
  sub: Subscription;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    // this.employees$ = this.employeeService.getEmployees(); // wäre schöner; dann im Template mit async arbeiten
    this.employeeService.getEmployees().subscribe(list => (this.employees = list));

    this.sub = this.employeeService.selectedEmployeeChanges$.subscribe(
      emp => (this.selectedEmployee = emp)
    );
  }

  onSelected(employee: Employee): void {
    this.employeeService.changeSelectedEmployee(employee);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
