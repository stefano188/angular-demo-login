import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin;

  constructor(
    private auth: AuthService, 
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit() {
  }

  signIn(credentials) {
    console.log('signIn', credentials);
    this.invalidLogin = true;
    this.auth.login(credentials)
      .subscribe(result => {
        if (result) {
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([ returnUrl || '/' ]);
          this.invalidLogin = false;
        } 
      })
  }

}
