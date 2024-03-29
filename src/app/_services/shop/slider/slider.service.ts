import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { SliderModel } from '@app_models/shop/slider/slider';
import { environment } from '@environments/environment';
import { LoadingService } from '@loading';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService
  ) { }

  getSlidersList(): Observable<SliderModel[]> {
    this.loading.loadingOn();
    return this.http.get<SliderModel[]>
    (`${environment.shopBaseApiUrl}/slider/get-all`)
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
