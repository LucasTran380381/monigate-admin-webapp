import {Account} from './account';

export class User {
  id: string = '';
  firstName: string;
  lastName: string;
  avatarUrl: string;
  status: number;
  phone: string;
  email: string;
  account: Account;

  constructor(id: string, firstName: string, lastName: string, avatarUrl: string, status: number, phone: string, email: string, account: Account) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.avatarUrl = avatarUrl;
    this.status = status;
    this.phone = phone;
    this.email = email;
    this.account = account;
  }
}
