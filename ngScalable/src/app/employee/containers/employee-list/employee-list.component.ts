import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../../model/employee.model';
import * as fromService from '../../services';
import { FilterCriteriaComponent } from '../../components/filter-criteria/filter.criteria.component';

@Component({
  templateUrl: 'employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  filteredEmployees: Employee[];

  @ViewChild(FilterCriteriaComponent)
  filterComponent: FilterCriteriaComponent;

  constructor(private service: fromService.EmployeeService) {}

  ngOnInit() {
    this.service.getEmployees().subscribe((list: Employee[]) => {
      this.employees = list;
      this.performFilter(this.filterComponent.listFilter);
    });
  }

  onValueChange(value: string): void {
    // this.productParameterService.filterBy = value;
    this.performFilter(value);
  }

  performFilter(filterBy?: string): void {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    if (filterBy) {
      this.filteredEmployees = this.employees.filter(
        (e: Employee) =>
          (
            e.firstname.toLocaleLowerCase() + e.lastname.toLocaleLowerCase()
          ).indexOf(filterBy) !== -1
      );
    } else {
      this.filteredEmployees = this.employees;
    }
  }
}
