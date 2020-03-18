import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials) {
    return this.http.post('/api/authenticate', JSON.stringify(credentials))
      .pipe(map(response => {
        let res = response as any;
        
        if (res && res.token) {
          localStorage.setItem('token', res.token);
          return true;
        }

        return false;
      }))
  }

  logout() {
    localStorage.removeItem('token');
  }
}
