import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EmployeeModel } from "../models/employee.model";
import { Observable } from "rxjs/Observable";
import { tap, catchError, map, switchMap } from "rxjs/operators";
import { _throw } from "rxjs/observable/throw";
import { of } from "rxjs/observable/of";
import { Subject } from "rxjs/Subject";

@Injectable()
export class EmployeeService {
  public listSubject: Subject<EmployeeModel[]>;
  private _list: EmployeeModel[];
  private _counter: number;
  public pageNumber: number;
  constructor(public http: HttpClient) {
    this._list = [];
    this._counter = 1;
    this.listSubject = new Subject();
    this.pageNumber = 1;
  }

  get employeeList() {
    return [...this._list];
  }

  // get the data from a backend then saves the data to a local list
  setList(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(`/assets/moch-data/page1.json`).pipe(
      map((employees) => {
        return employees.reduce((result, employee) => {
          if (employee.isActive) {
            employee.phone = employee.phone.replace(/[^0-9]/g, "").trim();
            result.push(employee);
          }
          return result;
        }, []);
      }),
      tap((employees: EmployeeModel[]) => {
        this.pageNumber++;
        this._list = employees;
      }),
      catchError((error: HttpErrorResponse) => {
        this._list = [];
        return _throw("server not found");
      })
    );
  }

  getEmployeeById(id: string): EmployeeModel {
    return [...this._list].find((value) => {
      return value._id === id;
    });
  }

  addEmployee(newCustomer: EmployeeModel): void {
    newCustomer._id = this._counter.toString();
    this._counter++;
    this._list.push(newCustomer);
    this.listSubject.next([...this._list]);
  }

  editEmployee(updateCustomer: EmployeeModel): void {
    let index = this._list.findIndex((element) => {
      return element._id === updateCustomer._id;
    });
    this._list.splice(index, 1, updateCustomer);
    this.listSubject.next([...this._list]);
  }

  deleteEmployeeById(id: string): void {
    this._list = this._list.filter((value) => {
      return value._id !== id;
    });
    this.listSubject.next([...this._list]);
  }

  getNextPage(): Observable<EmployeeModel[]> {
    return this.http
      .get<EmployeeModel[]>(`/assets/moch-data/page${this.pageNumber}.json`)
      .pipe(
        map((employees) => {
          return employees.filter((employee) => {
            return employee.isActive;
          });
        }),
        map((employees: EmployeeModel[]) => {
          return employees.map((employee) => {
            employee.phone = employee.phone.replace(/[^0-9]/g, "").trim();
            this.pageNumber++;
            return employee;
          });
        })
      );
  }
}
