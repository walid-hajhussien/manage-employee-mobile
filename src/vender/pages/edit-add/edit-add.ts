import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EmployeeModel } from "../../models/employee.model";

import { EmployeeService } from "../../services/employee.service";
import { secondNameValidator } from "../../validator/secondName.validatoe";

@IonicPage({
  name: "add-edit",
  segment: "add-edit/:id",
  defaultHistory: ["home"],
})
@Component({
  selector: "page-edit-add",
  templateUrl: "edit-add.html",
})
export class EditAddPage implements OnInit {
  public mode: string;
  public id: string;
  public isClickSave: boolean;
  public formData: FormGroup;
  public employee: EmployeeModel;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private employeeService: EmployeeService
  ) {
    this.isClickSave = false;
  }
  ngOnInit(): void {
    this.id = this.navParams.get("id");
    this.mode = this.id === "New" ? "New" : "Edit";

    if (this.mode === "Edit") {
      this.employee = this.employeeService.getEmployeeById(this.id);
    } else {
      this.employee = new EmployeeModel(null, null, null, "", "", "", "", "");
    }

    // setup the form
    this.formData = new FormGroup({
      fullName: new FormControl(
        this.mode === "Edit"
          ? this.employee.name.first + " " + this.employee.name.last
          : null,
        [Validators.required, secondNameValidator]
      ),
      email: new FormControl(
        this.mode === "Edit" ? this.employee.email : null,
        [Validators.email]
      ),
      phone: new FormControl(this.mode === "Edit" ? this.employee.phone : null),
      address: new FormControl(
        this.mode === "Edit" ? this.employee.address : null
      ),
      eyeColor: new FormControl(
        this.mode === "Edit" ? this.employee.eyeColor : null
      ),
      age: new FormControl(this.mode === "Edit" ? this.employee.age : null),
      about: new FormControl(this.mode === "Edit" ? this.employee.about : null),
      picture: new FormControl(
        this.mode === "Edit" ? this.employee.picture : null
      ),
    });
  }

  // Edit or Add new employee
  onSave(): void {
    this.isClickSave = true;
    if (this.formData.invalid) return;

    let values = this.formData.value;
    let name = values.fullName.split(" ");

    this.employee.name.first = name[0];
    this.employee.name.last = name.slice(1).join("");
    this.employee.age = +values.age;
    this.employee.eyeColor = values.eyeColor;
    this.employee.email = values.email;
    this.employee.phone = values.phone;
    this.employee.address = values.address;
    this.employee.about = values.about;

    if (this.mode === "New") {
      this.employeeService.addEmployee(this.employee);
    } else {
      this.employeeService.editEmployee(this.employee);
    }

    this.navCtrl.pop();
  }
}
