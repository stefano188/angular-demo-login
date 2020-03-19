import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt'

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

  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (!token) return false;

    let jwt = new JwtHelperService();
    let isExpired = jwt.isTokenExpired(token);

    return !isExpired;
  }

  get currentUser() {
    let token = localStorage.getItem('token');
    if (!token) return null;

    let jwt = new JwtHelperService();
    let decodedToken = jwt.decodeToken(token);
    console.log('decodedToken', decodedToken);
    return decodedToken;
  }
}
