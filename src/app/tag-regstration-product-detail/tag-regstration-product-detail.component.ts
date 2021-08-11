import { Component, OnInit } from '@angular/core';
import { Service } from '../api.service';
import { productinterface } from '../login/login.interface';
import { Router } from '@angular/router';
import { SessionService } from '../common/services/session.service';
import _ from 'lodash';

@Component({
  selector: 'app-tag-regstration-product-detail',
  templateUrl: './tag-regstration-product-detail.component.html',
  styleUrls: ['./tag-regstration-product-detail.component.scss']
})
export class TagRegstrationProductDetailComponent implements OnInit {
  prodObj:productinterface;
  productData: any;
  userInfo: any;
  data: any;
  config:any;

  constructor( private service: Service, private router: Router,private session:SessionService) {
    this.prodObj = {};
    this.initVariables();
  }

  createProduct(data){
    if(data.valid){
    this.prodObj.registration = this.userInfo.id;
    this.service.createProduct(this.prodObj).subscribe((res:any) => {
      this.router.navigate(["/product-detail-list"]);
      
    })
  }
}

  initVariables(){
    this.data = [];
    }

  getPageConfig(){
    this.service.getPageConfig().subscribe(res=>{
      this.config = res;
    })
  }

  handleEvent($event) {    
    this.prodObj.photo = JSON.stringify($event.data.files);
  }

  ngOnInit(){
    this.userInfo = this.session.getUserInfo();
    this.getPageConfig(); 
  }
  
}
