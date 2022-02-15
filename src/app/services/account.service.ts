import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SupplementaryAccount} from '../admin/models/supplementary-account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  constructor(private http: HttpClient) {

  }

  getSupplementaryAccount() {
    return this.http.get<SupplementaryAccount[]>(`${environment.apiUrl}/Account/supplementary`);
  }

  resetAccount(username: string) {
    return this.http.put(`${environment.apiUrl}/Account/user-change`, {
      username,
      'userId': null,
    })
  }
}
