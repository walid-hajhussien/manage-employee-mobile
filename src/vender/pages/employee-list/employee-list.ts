import { Component, OnInit, OnDestroy } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EmployeeModel } from "../../models/employee.model";
import { EditAddPage } from "../edit-add/edit-add";
import { Subscription } from "rxjs/Subscription";
import { EmployeeService } from "../../services/employee.service";

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

  private subjectList: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private employeeService: EmployeeService
  ) {
    this.employeeList = [];
    this.pushPage = EditAddPage;

    this.params = { id: "New" };
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

  onDelete(employeeId: string) {
    this.employeeService.deleteEmployeeById(employeeId);
  }

  onEdit(employeId: string) {
    this.navCtrl.push("add-edit", {
      id: employeId,
    });
  }

  ngOnDestroy(): void {
    this.subjectList.unsubscribe();
  }

  // for testing
  doInfinite(infiniteScroll): void {
    // if (this.employeeService.pageNumber < 2) {
    //   this.employeeService.getNextPage().subscribe((list) => {
    //     this.employeeList.push(...list);
    //     infiniteScroll.complete();
    //   });
    // } else {
    //   infiniteScroll.complete();
    // }

    setTimeout(() => {
      // let newLoaded = this.employeeService.nextEmployee;
      // this.employeeList = [...this.employeeList, ...newLoaded];
      infiniteScroll.complete();
    }, 2000);
  }

  onRefresh(event: any): void {
    this.employeeService.setList().subscribe((employeeList) => {
      this.employeeList = employeeList;
      event.complete();
    });
  }
}
