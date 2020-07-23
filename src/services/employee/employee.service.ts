import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EmployeeModel } from "../../models/employee.model";
import { Observable } from "rxjs/Observable";
import { tap, catchError, map } from "rxjs/operators";
import { _throw } from "rxjs/observable/throw";
import { Subject } from "rxjs/Subject";

@Injectable()
export class EmployeeService {
  public listSubject: Subject<EmployeeModel[]>;
  private _list: EmployeeModel[];
  private _counter: number;
  private loadEmployeeCount: number;
  constructor(public http: HttpClient) {
    this._list = [];
    this._counter = 1;
    this.listSubject = new Subject();
    this.loadEmployeeCount = 0;
  }

  get employeeList() {
    return [...this._list];
  }

  // load the next 4 employee
  get nextEmployee() {
    let loadList = [...this._list].slice(
      this.loadEmployeeCount,
      this.loadEmployeeCount + 4
    );
    this.loadEmployeeCount = this.loadEmployeeCount + 4;
    return loadList;
  }

  // get the loaded employee
  get currentEmployeeLoad() {
    return [...this._list].slice(0, this.loadEmployeeCount);
  }

  // get the data from a backend then saves the data to a local list
  setList(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>("/assets/moch-data/data.json").pipe(
      map((employees) => {
        return employees.filter((employee) => {
          return employee.isActive;
        });
      }),
      map((employees: EmployeeModel[]) => {
        return employees.map((employee) => {
          employee.phone = employee.phone.replace(/[^0-9]/g, "").trim();
          return employee;
        });
      }),
      tap((employees: EmployeeModel[]) => {
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
    this.loadEmployeeCount--;
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
    console.log(id);
    this._list = this._list.filter((value) => {
      return value._id !== id;
    });
    this.listSubject.next([...this._list]);
  }
}
