import { Injectable } from '@angular/core';
import { SessionService } from '../common/services/session.service';
import { IF_LoginRes } from './login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly ss: SessionService) {}

  onAuthSuccess(res: IF_LoginRes) {
    this.ss.setAuthToken(res.accessToken);
    this.ss.setUserInfo(res);
  }
}
