import { Component } from "@angular/core";
import { NavController, IonicPage } from "ionic-angular";
import { EmployeeListPage } from "../employee-list/employee-list";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  public pushPage: any;
  constructor(public navCtrl: NavController) {
    this.pushPage = EmployeeListPage;
  }

  onNavigate() {
    console.log("click");
    this.navCtrl.push("EmployeeListPage");
  }
}
