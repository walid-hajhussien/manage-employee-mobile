import { Component, Input, Output, EventEmitter } from "@angular/core";
import { EmployeeModel } from "../../models/employee.model";
import { ItemSliding } from "ionic-angular";

@Component({
  selector: "list",
  templateUrl: "list.html",
})
export class ListComponent {
  @Input() set listValue(values: EmployeeModel[]) {
    this.mainList = values;
    this.renderList = [...this.mainList];
  }

  @Output() editList: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteList: EventEmitter<string> = new EventEmitter<string>();

  public mainList: EmployeeModel[];
  public renderList: EmployeeModel[];
  public search: string;
  public sortByColumn: string;
  public orderBy: string;
  constructor() {
    this.sortByColumn = "name";
    this.orderBy = "asc";
  }

  onSearch(_event: any): EmployeeModel[] {
    this.renderList = [...this.mainList];

    if (this.search && this.search.trim().length > 0) {
      this.renderList = this.renderList.filter((employee) => {
        return (
          employee.address.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
    }
    return this.renderList;
  }

  onOrder() {
    if (this.sortByColumn === "") return;
    this.orderBy = this.orderBy === "asc" ? "des" : "asc";
  }

  reorderItems(indexes: any) {
    let element = this.renderList[indexes.from];
    this.renderList.splice(indexes.from, 1);
    this.renderList.splice(indexes.to, 0, element);
  }

  onEdit(id: string, itemSliding: ItemSliding) {
    itemSliding.close();
    this.editList.emit(id);
  }

  onDelete(id: string) {
    this.deleteList.emit(id);
    this.search = "";
  }
}
