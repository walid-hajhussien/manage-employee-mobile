import { EmployeeModel } from "../models/employee.model";
import { Observable } from "rxjs/Observable";

export interface StorageInterface {
  setList(): Observable<EmployeeModel[]>;
  getCustomerById(id: string): EmployeeModel;
  addCustomer(newCustomer: EmployeeModel): void;
  editCustomer(updateCustomer: EmployeeModel): void;
  deleteCustomerById(id: string): void;
}
