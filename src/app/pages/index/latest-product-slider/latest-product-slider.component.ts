import { Component, OnInit } from '@angular/core';
import { ProductModel } from '@app_models/shop/product/product';
import { ProductService } from '@app_services/shop/product/product.service';
import { LoadingService } from '@app_services/_common/loading/loading.service';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'index-latest-product-slider',
  templateUrl: './latest-product-slider.component.html'
})
export class LatestProductSliderComponent implements OnInit {

  productsSubject: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);
  products$: Observable<ProductModel[]> = this.productsSubject.asObservable();

  baseProductPath: string = environment.productBaseImagePath + '/thumbnail/';

  slideConfig = {
    "slidesToShow": 5, "slidesToScroll": 4, "dots": true,
    "fade": false, "loop": true, "arrows": true, "responsive": [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  constructor(
    private productService: ProductService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadingService.loadingOn();
    this.productService.getLatestProducts().subscribe(res => this.productsSubject.next(res))
    this.loadingService.loadingOff();

  }
}
