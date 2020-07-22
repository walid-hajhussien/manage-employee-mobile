import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the EditAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "add-edit",
  segment: "add-edit/:id",
  defaultHistory: ["employee-list"],
})
@Component({
  selector: "page-edit-add",
  templateUrl: "edit-add.html",
})
export class EditAddPage {
  public mode: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.mode = this.navParams.get("id") === "New" ? "New" : "Edit";
    console.log("ionViewDidLoad EditAddPage", this.navParams.get("id"));
  }
}
