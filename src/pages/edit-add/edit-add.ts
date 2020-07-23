import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EmployeeModel } from "../../models/employee.model";
import { EmployeeProvider } from "../../providers/employee/employee.provider";
import { ValidatorError } from "../../interfaces/validator.interface";

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
    private employeeService: EmployeeProvider
  ) {
    this.isClickSave = false;
  }
  ngOnInit(): void {
    this.id = this.navParams.get("id");
    this.mode = this.id === "New" ? "New" : "Edit";

    // setup the form
    switch (this.mode) {
      case "New":
        this.formData = new FormGroup({
          fullName: new FormControl(null, [
            Validators.required,
            this.secondNameValidator.bind(this),
          ]),
          email: new FormControl(null, [Validators.email]),
          phone: new FormControl(null),
          address: new FormControl(null),
          eyeColor: new FormControl(null),
          age: new FormControl(null),
          about: new FormControl(null),
        });
        break;
      default:
        this.employee = this.employeeService.getEmployeeById(this.id);
        this.formData = new FormGroup({
          fullName: new FormControl(
            this.employee.name.first + " " + this.employee.name.last,
            [Validators.required, this.secondNameValidator.bind(this)]
          ),
          email: new FormControl(this.employee.email, [Validators.email]),
          phone: new FormControl(this.employee.phone),
          address: new FormControl(this.employee.address),
          eyeColor: new FormControl(this.employee.eyeColor),
          age: new FormControl(this.employee.age),
          about: new FormControl(this.employee.about),
        });
        break;
    }
  }

  // Edit or Add the new employee
  onSave(): void {
    this.isClickSave = true;
    if (this.formData.invalid) return;
    let values = this.formData.value;
    let name = values.fullName.split(" ");
    switch (this.mode) {
      case "New":
        let newEmployee = new EmployeeModel(
          name[0],
          name[1],
          +values.age,
          values.eyeColor,
          values.email,
          values.phone,
          values.address,
          values.about
        );
        this.employeeService.addEmployee(newEmployee);
        this.navCtrl.pop();
        break;
      default:
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
        break;
    }
  }

  // custom validator for the second name
  secondNameValidator(control: FormControl): ValidatorError {
    if (!control.value) return null;
    if (!control.value.split(" ")[1]) {
      return { seconName: true };
    } else {
      return null;
    }
  }
}
