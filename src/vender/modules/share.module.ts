import { NgModule } from "@angular/core";
import { SortByPipe } from "../pipe/orderBy.pipe";

@NgModule({
  declarations: [SortByPipe],
  exports: [SortByPipe],
})
export class ShareModule {}
