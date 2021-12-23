import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Role} from '../../models/role';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getRoles() {
    return this.http.get<Role[]>(`${environment.apiUrl}/Role`)
  }

  updateRole(role: Role) {
    return this.http.put(`${environment.apiUrl}/Role`, role)
  }

  addRole(nameRole: string) {
    return this.http.post(`${environment.apiUrl}/Role`, nameRole)
  }

  getRole(id: string) {
    return this.http.get<Role>(`${environment.apiUrl}/Role/${id}`)
  }
}
