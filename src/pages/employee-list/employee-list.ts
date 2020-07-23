import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ItemSliding,
} from "ionic-angular";
import { EmployeeModel } from "../../models/employee.model";
import { EditAddPage } from "../edit-add/edit-add";
import { Subscription } from "rxjs/Subscription";
import { EmployeeService } from "../../services/employee/employee.service";

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
  public sortByColumn: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private employeeService: EmployeeService
  ) {
    this.employeeList = [];
    this.pushPage = EditAddPage;
    this.search = "";
    this.params = { id: "New" };
    this.sortByColumn = "name";
    this.orderBy = "asc";
  }

  ngOnInit(): void {
    this.subjectList = this.employeeService.listSubject.subscribe(
      (employeeList: EmployeeModel[]) => {
        this.employeeList = employeeList;
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

  reorderItems(indexes: any) {
    let element = this.employeeList[indexes.from];
    this.employeeList.splice(indexes.from, 1);
    this.employeeList.splice(indexes.to, 0, element);
  }

  // for testing
  doInfinite(infiniteScroll): void {
    if (this.employeeService.pageNumber < 2) {
      this.employeeService.getNextPage().subscribe((list) => {
        console.log(list);
        this.employeeList.push(...list);
        infiniteScroll.complete();
      });
    } else {
      infiniteScroll.complete();
    }

    // setTimeout(() => {
    //   // let newLoaded = this.employeeService.nextEmployee;
    //   // this.employeeList = [...this.employeeList, ...newLoaded];
    //   infiniteScroll.complete();
    // }, 2000);
  }

  onRefresh(event: any): void {
    this.employeeService.setList().subscribe((employeeList) => {
      this.employeeList = employeeList;
      event.complete();
    });
  }

  onOrder() {
    if (this.sortByColumn === "") return;
    this.orderBy = this.orderBy === "asc" ? "des" : "asc";
  }
}
