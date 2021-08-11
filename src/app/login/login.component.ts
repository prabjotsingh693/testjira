import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

import { Service } from '../api.service';
import { SessionService } from '../common/services/session.service';
import { IF_LoginRes, logininterface, IF_LoginReq } from './login.interface';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginObj: IF_LoginReq;
  errorFlag: boolean = false;
  message: string = "Invalid Username/Password";

  constructor(private service: Service, private loginService: LoginService, private ss:SessionService,
    private router: Router) {
      this.loginObj = {
        email: "",
        password: ""
      };
      this.ss.flushSession();
   }
  
   onclick_event() {
    this.errorFlag = false;
  }
  
  LoginUser(logindata){
    if (!logindata.valid) {
      
    } else {
      this.service.doLogin(this.loginObj).subscribe(
        (loginData: IF_LoginRes) => {
          this.loginService.onAuthSuccess(loginData);
          this.router.navigate(["/product-detail-list"]);

        },
        e => {
          if (e != undefined) {
            this.errorFlag = true;
          }
          this.message = e.error.message;
        }
      );
    }
  }

  ngOnInit(): void {
    this.ss.flushSession();
    setTimeout(() => {
      $(".text-box input").on("focus", function() {
        $(this).addClass("focus");
      });

      $(".text-box input").on("blur", function() {
        if ($(this).val() === "") {
          $(this).removeClass("focus");
        }
      });
    });
  }
  
}
