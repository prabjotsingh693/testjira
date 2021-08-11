import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import PRODUCT_QUERY from '../apollo/queries/product/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  data: any = {
    product: {
      photos: [{
        url: ''
      }]
    }
  };
  loading = true;
  errors: any;

  private queryArticle: Subscription;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit() {
    this.queryArticle = this.apollo
      .watchQuery({
        query: PRODUCT_QUERY,
        variables: {
          id: this.route.snapshot.paramMap.get('id'),
        },
      })
      .valueChanges.subscribe((result) => {
        this.data = result.data;
        this.loading = result.loading;
        this.errors = result.errors;
      });
  }

  ngOnDestroy() {
    this.queryArticle.unsubscribe();
  }
}
