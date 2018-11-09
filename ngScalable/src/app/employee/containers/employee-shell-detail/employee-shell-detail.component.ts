import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Employee } from '../../model/employee.model';
import { EmployeeService } from './../../services/employee.service';

@Component({
  selector: 'app-employee-shell-detail',
  templateUrl: 'employee-shell-detail.component.html'
})
export class EmployeeShellDetailComponent implements OnInit, OnDestroy {
  pageTitle = 'Employee Detail';

  employee: Employee | null;
  sub: Subscription;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.sub = this.employeeService.selectedEmployeeChanges$.subscribe(
      selectedEmpl => (this.employee = selectedEmpl)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
