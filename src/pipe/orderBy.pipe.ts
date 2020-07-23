import { Pipe, PipeTransform } from "@angular/core";
import orderBy from "lodash/orderBy";
import { EmployeeModel } from "../models/employee.model";

@Pipe({ name: "sortBy" })
export class SortByPipe implements PipeTransform {
  transform(
    values: EmployeeModel[],
    column: string = "",
    order: "asc" | "des" = "asc"
  ): EmployeeModel[] {
    if (values.length <= 1 || !column || column === "") {
      return values;
    }

    let sortedValues = orderBy(values, (employee: EmployeeModel) => {
      if (column === "name") {
        return employee.name.first;
      }
      return employee[column];
    });
    return order === "asc" ? sortedValues : sortedValues.reverse();
  }
}
