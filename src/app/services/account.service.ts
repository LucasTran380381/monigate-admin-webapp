import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SupplementaryAccount} from '../admin/models/supplementary-account';
import {Role} from '../models/role';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  constructor(private http: HttpClient) {

  }

  getSupplementaryAccounts() {
    return this.http.get<SupplementaryAccount[]>(`${environment.apiUrl}/Account/supplementary`);
  }

  resetAccount(username: string) {
    return this.http.put(`${environment.apiUrl}/Account/user-change`, {
      username,
      'userId': null,
    })
  }

  createSuppAccount(username: string, roleId: string) {
    return this.http.post(`${environment.apiUrl}/Account/supplementary`, {
      username,
      roleId,
    })
  }

  getSuppRole() {
    return this.http.get<Role[]>(`${environment.apiUrl}/Role/supplementary`)
  }

  getAvailableAccounts(roleId: string) {
    return this.http.get<SupplementaryAccount[]>(`${environment.apiUrl}/Account/supplementary?roleId=${roleId}`)
      .pipe(map(accounts => accounts.filter(account => account.userId == null)))
  }

  assignAccount(userId: string, username: string) {
    return this.http.put(`${environment.apiUrl}/Account/user-change`, {
      userId, username,
    })
  }
}
