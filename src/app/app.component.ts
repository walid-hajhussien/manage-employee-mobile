import { Component, OnInit } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { EmployeeProvider } from "../providers/employee/employee.provider";
@Component({
  templateUrl: "app.html",
})
export class MyApp implements OnInit {
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private employeeService: EmployeeProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  ngOnInit(): void {
    this.employeeService.setList().subscribe();
  }
}
