import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Component, OnInit, OnDestroy } from '@angular/core';

import PRODUCTS_QUERY from '../apollo/queries/product/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  data: any = {};
  loading = true;
  errors: any;
  leftProductsCount: any;
  leftProducts: any[];
  rightProducts: any[];

  private queryProducts: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.queryProducts = this.apollo
      .watchQuery({
        query: PRODUCTS_QUERY,
      })
      .valueChanges.subscribe((result) => {
        this.data = result.data;
        this.leftProductsCount = Math.ceil(this.data.products.length / 5);
        this.leftProducts = this.data.products.slice(0, this.leftProductsCount);
        this.rightProducts = this.data.products.slice(
          this.leftProductsCount,
          this.data.products.length
        );
        console.log(this.leftProducts);
        console.log(this.rightProducts);
        this.loading = result.loading;
        this.errors = result.errors;
      });
  }

  ngOnDestroy() {
    this.queryProducts.unsubscribe();
  }
}
