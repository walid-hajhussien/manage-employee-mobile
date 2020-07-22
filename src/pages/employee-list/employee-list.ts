import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EmployeeProvider } from "../../providers/employee/employee.provider";
import { EmployeeModel } from "../../models/employee.model";
import { EditAddPage } from "../edit-add/edit-add";
import { Subscription } from "rxjs/Subscription";
import * as _ from "lodash";

/**
 * Generated class for the EmployeeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "employee-list",
})
@Component({
  selector: "page-employee-list",
  templateUrl: "employee-list.html",
})
export class EmployeeListPage implements OnInit, OnDestroy {
  @ViewChild("slidingItem") slidingItem;

  public employeeList: EmployeeModel[];
  public pushPage: any;
  public params: Object;
  public search: string;
  private subjectList: Subscription;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private employeeService: EmployeeProvider
  ) {
    this.employeeList = [];
    this.pushPage = EditAddPage;
    this.search = "";
    this.params = { id: "New" };
  }

  ngOnInit(): void {
    this.subjectList = this.employeeService.listSubject.subscribe(
      (employeeList: EmployeeModel[]) => {
        this.employeeList = employeeList;
        console.log(this.employeeList, _);
      }
    );
  }

  ionViewDidLoad() {
    this.employeeList = this.employeeService.employeeList;
    this.orderByList("name");
  }

  onSearch(event: any) {
    this.employeeList = this.employeeService.employeeList;

    if (this.search && this.search.trim().length > 0) {
      this.employeeList = this.employeeList.filter((employee) => {
        return (
          employee.address.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
    }
  }

  onDelete(employeeId: string) {
    console.log("delete");
    this.employeeService.deleteCustomerById(employeeId);
    this.search = "";
    this.slidingItem.close();
  }

  onEdit(employeId: string) {
    this.navCtrl.push("add-edit", {
      id: employeId,
    });
    this.slidingItem.close();
  }

  onClickItem(slidingItem, item) {
    console.log("item click!");
  }

  ngOnDestroy(): void {
    this.subjectList.unsubscribe();
  }

  orderByList(key) {
    // desc , asc
    this.employeeList = _.orderBy(
      this.employeeList,
      function (value: EmployeeModel) {
        console.log(value);
        return value.name.first;
      },
      ["asc"]
    );
  }

  reorderItems(indexes: any) {
    let element = this.employeeList[indexes.from];
    this.employeeList.splice(indexes.from, 1);
    this.employeeList.splice(indexes.to, 0, element);
  }
}
