import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError } from "rxjs";
import {ICurrency} from "../models/currency";
import { catchError } from "rxjs/operators";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
    ) {

  }

  getAll(): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>('https://api.monobank.ua/bank/currency').pipe(
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    this.errorService.handle(error.message)
    return throwError('Сталася помилка. Будь ласка, спробуйте пізніше.');
  }
}
