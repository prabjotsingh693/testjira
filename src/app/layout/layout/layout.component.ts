import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from 'src/app/common/services/session.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  userInfo: any;
  @ViewChild('Topbar', { static: false }) Topbar: any;
  sidebarFlag: boolean = true;
  mobileSideBar: boolean = false;
  constructor(private ss: SessionService) { }

  MenuToggler(screen) {
    if (screen === "mobile") {
      this.Topbar.setLeft();
      this.mobileSideBar = !this.mobileSideBar;
      this.sidebarFlag = !this.sidebarFlag;
    } else {
      this.Topbar.setLeft();
      this.sidebarFlag = !this.sidebarFlag;
    }
  }

  ngOnInit() {
    this.userInfo = this.ss.getUserInfo();
  }

}
