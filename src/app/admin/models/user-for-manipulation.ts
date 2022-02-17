export class UserForManipulation {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  departmentId: string;

  constructor(id: string, firstName: string, lastName: string, phone: string, email: string, departmentId: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.departmentId = departmentId;
  }
}
