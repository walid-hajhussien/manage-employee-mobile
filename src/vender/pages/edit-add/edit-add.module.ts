import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { EditAddPage } from "./edit-add";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [EditAddPage],
  imports: [IonicPageModule.forChild(EditAddPage), ReactiveFormsModule],
})
export class EditAddPageModule {}
