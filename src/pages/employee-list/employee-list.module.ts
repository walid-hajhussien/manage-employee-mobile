import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { EmployeeListPage } from "./employee-list";
import { SortByPipe } from "../../pipe/orderBy.pipe";

@NgModule({
  declarations: [EmployeeListPage, SortByPipe],
  imports: [IonicPageModule.forChild(EmployeeListPage)],
  entryComponents: [EmployeeListPage],
})
export class EmployeeListPageModule {}
