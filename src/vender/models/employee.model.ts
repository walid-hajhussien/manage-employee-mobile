import { NameModel } from "./name.model";

export class EmployeeModel {
  public name: NameModel;
  constructor(
    firstNmae: string,
    lastName: string,
    public age: number,
    public eyeColor: string,
    public email: string,
    public phone: string,
    public address: string,
    public about: string,
    public _id?: string,
    public index?: number,
    public guid?: string,
    public isActive?: boolean,
    public balance?: string,
    public picture?: string,
    public company?: string,
    public registered?: string,
    public latitude?: string,
    public longitude?: string,
    public tags?: string[],
    public greeting?: string,
    public favoriteFruit?: string
  ) {
    this.name = new NameModel(firstNmae, lastName);
  }
}
