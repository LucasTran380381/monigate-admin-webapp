import {Role} from '../../models/role';
import {User} from '../../models/user';

export class SupplementaryAccount {
  username: string;
  roleId: string;
  role: Role;
  userId: string;
  user?: User;
}
