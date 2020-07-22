import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { EmployeeListPage } from "./employee-list";

@NgModule({
  declarations: [EmployeeListPage],
  imports: [IonicPageModule.forChild(EmployeeListPage)],
  entryComponents: [EmployeeListPage],
})
export class EmployeeListPageModule {}
