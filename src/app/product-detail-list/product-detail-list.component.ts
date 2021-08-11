
import { Component, OnInit } from '@angular/core';
import { Service } from '../api.service';
import { SessionService } from '../common/services/session.service';

@Component({
  selector: 'app-product-detail-list',
  templateUrl: './product-detail-list.component.html',
  styleUrls: ['./product-detail-list.component.scss']
})
export class ProductDetailListComponent implements OnInit {
  productdata:any;
  cols: any[];
  userInfo: any;

  constructor( private service: Service,private session: SessionService) { }

    getProductList(){
      this.service.getProductList(this.userInfo).subscribe((res:any) =>{
        this.productdata=res[0];
      },
      (err:any)=>console.log("error occured...")
      );
    }

    tableColumns() {
      this.cols = [
        { field: "tagNumber", header: "Tag Number" },
        { field: "productName", header: "Product Name" },
        { field: "serialNumber", header: "Serial Number" },
        { field: "description", header: "Description" },
        { feild: "createdDate", header:"Date"}
      ];
    }

  ngOnInit(){
    this.userInfo = this.session.getUserInfo();
    
    this.tableColumns();
    this.getProductList();
  }

}