import { Component, OnInit } from '@angular/core';
import { registrationinterface } from '../login/login.interface';
import { Service } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-regstration',
  templateUrl: './user-regstration.component.html',
  styleUrls: ['./user-regstration.component.scss']
})
export class UserRegstrationComponent implements OnInit {
  userObj: registrationinterface;
  isRegistered: boolean = false;

  constructor(private service: Service,
    private router: Router) {
    this.userObj = {};
  }


  userRegistration(data) {
    if (!data.valid ) {
      return;
    }else{   
      this.service.createUser(this.userObj).subscribe(
        (res: any) => {
              this.router.navigate(['/login']);
            },
        (err: any) => {
              this.isRegistered = true;
            },
      );
  }

}
  resetUserObj() {
    this.userObj = {};
  }

  ngOnInit(): void {
  }
}
