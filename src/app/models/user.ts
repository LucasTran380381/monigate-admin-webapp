import {Account} from './account';
import {Department} from './department';

export class User {
  id: string = '';
  firstName: string;
  lastName: string;
  avatarUrl: string;
  status: number;
  phone: string;
  email: string;
  departmentId: string;
  department: Department;
  currentAccount: Account;
  accounts: Account[];

  constructor(id: string, firstName: string, lastName: string, avatarUrl: string, status: number, phone: string, email: string, departmentId: string, department: Department, currentAccount: Account, accounts: Account[]) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.avatarUrl = avatarUrl;
    this.status = status;
    this.phone = phone;
    this.email = email;
    this.departmentId = departmentId;
    this.department = department;
    this.currentAccount = currentAccount;
    this.accounts = accounts;
  }

  get fullName(): string {
    return `${this.lastName} ${this.firstName}`
  }
}
