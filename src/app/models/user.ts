export class User {
  id: string = '';
  firstName: string;
  lastName: string;
  avatarUrl: string;
  status: number;
  phone: string;
  email: string;
  role: string;

  constructor(id: string, firstName: string, lastName: string, avatarUrl: string, status: number, phone: string, email: string, role: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.avatarUrl = avatarUrl;
    this.status = status;
    this.phone = phone;
    this.email = email;
    this.role = role;
  }
}
