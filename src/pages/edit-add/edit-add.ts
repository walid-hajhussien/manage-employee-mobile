import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams, Thumbnail } from "ionic-angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EmployeeModel } from "../../models/employee.model";

import { EmployeeService } from "../../services/employee/employee.service";
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
    }

    // setup the form
    this.formData = new FormGroup({
      fullName: new FormControl(
        this.employee
          ? this.employee.name.first + " " + this.employee.name.last
          : null,
        [Validators.required, secondNameValidator]
      ),
      email: new FormControl(this.employee ? this.employee.email : null, [
        Validators.email,
      ]),
      phone: new FormControl(this.employee ? this.employee.phone : null),
      address: new FormControl(this.employee ? this.employee.address : null),
      eyeColor: new FormControl(this.employee ? this.employee.eyeColor : null),
      age: new FormControl(this.employee ? this.employee.age : null),
      about: new FormControl(this.employee ? this.employee.about : null),
    });
  }

  // Edit or Add the new employee
  onSave(): void {
    this.isClickSave = true;
    if (this.formData.invalid) return;

    let values = this.formData.value;
    let name = values.fullName.split(" ");

    if (this.mode === "New") {
      let newEmployee = new EmployeeModel(
        name[0],
        name.slice(1).join(""),
        +values.age,
        values.eyeColor,
        values.email,
        values.phone,
        values.address,
        values.about
      );
      this.employeeService.addEmployee(newEmployee);
      this.navCtrl.pop();
    } else {
      this.employee.name.first = name[0];
      this.employee.name.last = name[1];
      this.employee.age = +values.age;
      this.employee.eyeColor = values.eyeColor;
      this.employee.email = values.email;
      this.employee.phone = values.phone;
      this.employee.address = values.address;
      this.employee.about = values.about;
      this.employeeService.editEmployee(this.employee);
      this.navCtrl.pop();
    }
  }
}
