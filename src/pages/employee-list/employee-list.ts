import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ItemSliding,
} from "ionic-angular";
import { EmployeeProvider } from "../../providers/employee/employee.provider";
import { EmployeeModel } from "../../models/employee.model";
import { EditAddPage } from "../edit-add/edit-add";
import { Subscription } from "rxjs/Subscription";
import * as _ from "lodash";

@IonicPage({
  name: "employee-list",
  defaultHistory: ["home"],
})
@Component({
  selector: "page-employee-list",
  templateUrl: "employee-list.html",
})
export class EmployeeListPage implements OnInit, OnDestroy {
  public employeeList: EmployeeModel[];
  public pushPage: any;
  public params: Object;
  public search: string;
  private subjectList: Subscription;
  public orderBy: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private employeeService: EmployeeProvider
  ) {
    this.employeeList = [];
    this.pushPage = EditAddPage;
    this.search = "";
    this.params = { id: "New" };
    this.orderBy = "name";
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
  }

  onSearch(_event: any): EmployeeModel[] {
    this.employeeList = this.employeeService.employeeList;

    if (this.search && this.search.trim().length > 0) {
      this.employeeList = this.employeeList.filter((employee) => {
        return (
          employee.address.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
    }
    return this.employeeList;
  }

  onDelete(employeeId: string) {
    this.employeeService.deleteEmployeeById(employeeId);
    this.search = "";
  }

  onEdit(employeId: string, itemSliding: ItemSliding) {
    this.navCtrl.push("add-edit", {
      id: employeId,
    });
    itemSliding.close();
  }

  ngOnDestroy(): void {
    this.subjectList.unsubscribe();
  }

  // testing
  orderByList() {
    // desc , asc
    this.employeeList = _.orderBy(
      this.employeeList,
      function (value: EmployeeModel) {
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

  // for testing
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      infiniteScroll.complete();
    }, 2000);
  }
}
