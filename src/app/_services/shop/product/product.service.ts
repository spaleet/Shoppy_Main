import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '@app_models/_common/IResponse';
import { ProductModel } from '@app_models/shop/product/product';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { LoadingService } from '@loading';
import { catchError, tap } from 'rxjs/operators';
import { SearchProductModel } from '@app_models/shop/product/search-product';
import { ProductDetailsModel } from '@app_models/shop/product/product-details';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }

  getLatestProducts(): Observable<ProductModel[]> {
    this.loading.loadingOn();

    return this.http.get<ProductModel[]>
      (`${environment.shopBaseApiUrl}/product/latest`)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  searchProduct(search: SearchProductModel): Observable<SearchProductModel> {

    this.loading.loadingOn();

    let params = new HttpParams()
      .set('PageId', search.pageId.toString())
      .set('TakePage', search.takePage.toString())
      .set('SelectedMaxPrice', search.selectedMaxPrice)
      .set('SelectedMinPrice', search.selectedMinPrice)
      .set('SortCreationDateOrder', search.sortCreationDateOrder)
      .set('SearchProductPriceOrder', search.searchProductPriceOrder);

    if (search.phrase !== "" && search.phrase !== undefined) {
      params = params.set('Phrase', search.phrase);
    }

    if (search.selectedCategories !== null && search.selectedCategories?.length) {
      for (let category of search.selectedCategories) {
        params = params.append('SelectedCategories', category);
      }
    } else {
      search.selectedCategories = [];
    }

    return this.http.get<SearchProductModel>
      (`${environment.shopBaseApiUrl}/product/search`, { params })
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  getProductDetails(slug: string): Observable<ProductDetailsModel> {
    this.loading.loadingOn();

    return this.http.get<ProductDetailsModel>
      (`${environment.shopBaseApiUrl}/product/${slug}`)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  getRelatedProducts(categoryId: string): Observable<ProductModel[]> {
    this.loading.loadingOn();

    return this.http.get<ProductModel[]>
      (`${environment.shopBaseApiUrl}/product/get-related/${categoryId}`)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }
}
