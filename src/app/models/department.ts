import {DepartmentStatus} from './enums/department-status';

export class Department {
  id: string;
  name: string;
  status: DepartmentStatus;

  constructor(id: string, name: string, status: number) {
    this.id = id;
    this.name = name;
    this.status = status;
  }
}
