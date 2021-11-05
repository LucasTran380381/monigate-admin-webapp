export class Account {
  username: string;
  password?: string;
  roleName: string;

  constructor(username: string, roleName: string, password?: string) {
    this.username = username;
    this.password = password;
    this.roleName = roleName;
  }
}
