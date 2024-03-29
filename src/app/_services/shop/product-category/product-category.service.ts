import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ProductCategoryModel } from '@app_models/shop/product-category/product-category';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { FilterProductCategoryRequestModel } from '@app_models/shop/product-category/filter-product-category-request';
import { FilterProductCategoryResponseModel } from '@app_models/shop/product-category/filter-product-category-response';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService
  ) { }

  getProductCategoriesList(): Observable<ProductCategoryModel[]> {
    this.loading.loadingOn();
    return this.http.get<ProductCategoryModel[]>
      (`${environment.shopBaseApiUrl}/product-category/get-all`)
      .pipe(
        shareReplay(1),
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  getProductCategoryBy(filter: FilterProductCategoryRequestModel): Observable<FilterProductCategoryResponseModel> {
    this.loading.loadingOn();

    if (filter.slug === undefined || filter.slug === "") {
      this.toastr.error("اطلاعات مناسب پیدا نشد", 'خطا', { timeOut: 2500 });
      throw new Error("اطلاعات مناسب پیدا نشد");
    }

    let params = new HttpParams()
      .set('Slug', filter.slug);

    return this.http.get<FilterProductCategoryResponseModel>
      (`${environment.shopBaseApiUrl}/product-category/get`, { params })
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
