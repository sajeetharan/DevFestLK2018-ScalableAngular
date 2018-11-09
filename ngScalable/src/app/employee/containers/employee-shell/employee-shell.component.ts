import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../services';

@Component({
  templateUrl: 'employee-shell.component.html'
})
export class EmployeeShellComponent implements OnInit, OnDestroy {
  message: string;
  private sub: Subscription;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.sub = this.employeeService.selectedEmployeeChanges$.subscribe(empl => {
      console.log(empl);
      if (empl) {
        this.message = `Employee ${empl.firstname} ${empl.lastname}`;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
