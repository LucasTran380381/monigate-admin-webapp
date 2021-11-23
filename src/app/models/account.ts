import {Role} from './role';

export class Account {
  username: string;
  password?: string;
  roleName: string;
  role?: Role;

  constructor(username: string, roleName: string, password?: string, role?: Role) {
    this.username = username;
    this.password = password;
    this.roleName = roleName;
    this.role = role
  }
}
