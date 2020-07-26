import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { EmployeeListPage } from "./employee-list";
import { ShareModule } from "../../modules/share.module";
import { ListComponent } from "../../components/list/list";

@NgModule({
  declarations: [EmployeeListPage, ListComponent],
  imports: [IonicPageModule.forChild(EmployeeListPage), ShareModule],
  entryComponents: [EmployeeListPage],
})
export class EmployeeListPageModule {}
