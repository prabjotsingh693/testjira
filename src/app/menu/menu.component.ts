import { Component, OnInit } from '@angular/core';
import { SessionService } from '../common/services/session.service';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  userInfo: any;
  loginFlag: boolean = false;
  isLoggedIn: boolean;
  constructor(private session:SessionService,private login:LoginService,private router: Router) { }

  isValidsession(){
    if(this.session.loggedIn()){
       this.loginFlag = true;
    }else{
       this.loginFlag= false;
    }
  }

  ngOnInit(): void {
    this.session.changeToken.subscribe((data)=>{
      if(data&& data!=""){
        this.isLoggedIn=true;
      }else{
        this.isLoggedIn=false;
      }
    })
    this.userInfo = this.session.getUserInfo();
    this.isValidsession();
  }
  logout(){
    this.session.flushSession();
    this.isLoggedIn=false;
    this.router.navigate(["/login"]);

  }

}
