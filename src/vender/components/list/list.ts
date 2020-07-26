import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { ItemSliding } from "ionic-angular";

@Component({
  selector: "list",
  templateUrl: "list.html",
})
export class ListComponent {
  @Input() set listValue(values: any) {
    this.mainList = values;
    this.renderList = [...this.mainList];
  }

  @Output() editList: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteList: EventEmitter<string> = new EventEmitter<string>();
  @Input() sortByColumn: string = "name";
  @Input() orderBy: "asc" | "desc" = "asc";
  @Input() searchColumn: string = "address";

  public mainList: any;
  public renderList: any;
  public search: string;

  constructor() {}

  onSearch(_event: any): any {
    this.renderList = [...this.mainList];

    if (this.search && this.search.trim().length > 0) {
      this.renderList = this.renderList.filter((employee) => {
        return (
          employee[this.searchColumn]
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) > -1
        );
      });
    }
    return this.renderList;
  }

  onOrder() {
    if (this.sortByColumn === "") return;
    this.orderBy = this.orderBy === "asc" ? "desc" : "asc";
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
