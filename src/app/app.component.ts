import { Component, OnInit } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { EmployeeService } from "../vender/services/employee.service";
@Component({
  templateUrl: "app.html",
})
export class MyApp implements OnInit {
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private employeeService: EmployeeService
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  ngOnInit(): void {
    this.employeeService.setList().subscribe();
  }
}
