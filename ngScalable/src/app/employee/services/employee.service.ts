import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Employee } from './../model/employee.model';

@Injectable()
export class EmployeeService {
  private employees: Employee[];
  private selectedEmployeeSource = new BehaviorSubject<Employee>(null);
  selectedEmployeeChanges$ = this.selectedEmployeeSource.asObservable();

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    if (this.employees) {
      return of(this.employees);
    }
    return this.http.get<Employee[]>(`${environment.apiBaseUrl}/employees`).pipe(
      tap(list => (this.employees = list)),
      catchError((error: any) => _throw(error))
    );
  }

  getEmployee(id: number): Observable<Employee> {
    if (this.employees) {
      const item = this.employees.find(e => e.id === id);
      if (item) {
        return of(item);
      }
    }
    return this.http
      .get<Employee>(`${environment.apiBaseUrl}/employees/${id}`)
      .pipe(catchError((error: any) => _throw(error)));
  }

  createEmployee(payload: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${environment.apiBaseUrl}/employees`, payload).pipe(
      tap(emp => {
        this.employees.push(emp);
        this.changeSelectedEmployee(emp);
      }),
      catchError((error: any) => _throw(error))
    );
  }

  updateEmployee(payload: Employee): Observable<Employee> {
    return this.http
      .put<Employee>(`${environment.apiBaseUrl}/employees/${payload.id}`, payload)
      .pipe(catchError((error: any) => _throw(error)));
  }

  removeEmployee(payload: Employee): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/employees/${payload.id}`).pipe(
      tap(empl => {
        const idx = this.employees.findIndex(e => e.id === payload.id);
        if (idx >= 0) {
          this.employees.splice(idx, 1);
        }
      }),
      catchError((error: any) => _throw(error))
    );
  }

  changeSelectedEmployee(employee) {
    this.selectedEmployeeSource.next(employee);
  }

  checkEmailUnique(email: string) {
    // service call for example
    return of(email).pipe(
      delay(1000),
      map(e => e !== 'info@google.com')
    );
  }
}
