import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EmployeeModel } from "../../models/employee.model";
import { Observable } from "rxjs/Observable";
import { StorageInterface } from "../../interfaces/storage.interface";
import { tap, catchError } from "rxjs/operators";
import { _throw } from "rxjs/observable/throw";

/*
  Generated class for the EmployeeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EmployeeProvider implements StorageInterface {
  private _list: EmployeeModel[];
  private _counter: number;
  constructor(public http: HttpClient) {
    this._list = [];
    this._counter = 1;
    console.log("Hello EmployeeProvider Provider");
  }

  get employeeList() {
    return [...this._list];
  }

  // get the data from a backend then saves the data to a local list
  setList(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>("/assets/moch-data/data.json").pipe(
      tap((employees: EmployeeModel[]) => {
        this._list = employees;
      }),
      catchError((error: HttpErrorResponse) => {
        this._list = [];
        return _throw("server not found");
      })
    );
  }

  getCustomerById(id: string): EmployeeModel {
    return [...this._list].find((value) => {
      return value._id === id;
    });
  }

  addCustomer(newCustomer: EmployeeModel): void {
    newCustomer._id = this._counter.toString();
    this._counter++;
    this._list.push(newCustomer);
  }

  editCustomer(updateCustomer: EmployeeModel): void {
    let index = this._list.findIndex((element) => {
      return element._id === updateCustomer._id;
    });
    this._list.splice(index, 1, updateCustomer);
  }

  deleteCustomerById(id: string): EmployeeModel[] {
    this._list = this._list.filter((value) => {
      return value._id !== id;
    });

    return [...this._list];
  }
}
