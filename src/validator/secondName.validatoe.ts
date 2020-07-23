import { FormControl } from "@angular/forms";
import { ValidatorError } from "../interfaces/validator.interface";

export function secondNameValidator(control: FormControl): ValidatorError {
  if (!control.value) return null;
  if (!control.value.split(" ")[1]) {
    return { seconName: true };
  } else {
    return null;
  }
}
