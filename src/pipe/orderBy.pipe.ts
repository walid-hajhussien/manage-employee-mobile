import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "lodash";
import { EmployeeModel } from "../models/employee.model";

@Pipe({ name: "sortBy" })
export class SortByPipe implements PipeTransform {
  transform(
    values: EmployeeModel[],
    column: string = "",
    order: "asc" | "des" = "asc"
  ): EmployeeModel[] {
    console.log(order);
    if (values.length <= 1 || !column || column === "") {
      return values;
    }

    let sortedValues = _.orderBy(values, (employee: EmployeeModel) => {
      if (column === "name") {
        return employee.name.first;
      }
      return employee[column];
    });

    console.log(sortedValues);

    return order === "asc" ? sortedValues : sortedValues.reverse();
  }
}
