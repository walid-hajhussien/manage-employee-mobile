import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EmployeeProvider } from "../../providers/employee/employee";
import { EmployeeModel } from "../../models/employee.model";

/**
 * Generated class for the EmployeeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-employee-list",
  templateUrl: "employee-list.html",
})
export class EmployeeListPage {
  public employeeList: EmployeeModel[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private employeeService: EmployeeProvider
  ) {
    this.employeeList = [];
  }

  ionViewDidLoad() {
    this.employeeList = this.employeeService.employeeList;

    console.log(this.employeeList);
  }
}
