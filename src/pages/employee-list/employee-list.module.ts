import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { EmployeeListPage } from "./employee-list";
import { SortByPipe } from "../../pipe/orderBy.pipe";
import { ShareModule } from "../../modules/share.module";

@NgModule({
  declarations: [EmployeeListPage],
  imports: [IonicPageModule.forChild(EmployeeListPage), ShareModule],
  entryComponents: [EmployeeListPage],
})
export class EmployeeListPageModule {}
