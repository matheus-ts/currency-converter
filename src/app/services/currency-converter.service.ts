import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/environments/endpoints';
import { Currency } from '../helpers/ENUM';
import { ExchangeRates } from '../interfaces/currency.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterService {
  constructor(private http: HttpClient) {}

  filterLatestCurrency(): Observable<ExchangeRates> {
    return this.http.get<ExchangeRates>(
      `${endpoints.last}/${Currency.DOLAR_CANADENSE},${Currency.PESO_ARGENTINO},${Currency.LIBRA_ESTERLINA}`
    );
  }

  filterLatest(currencyCode: string) {
    return this.http.get<ExchangeRates>(`${endpoints.last}/${currencyCode}`);
  }

  // filterLatestCanada(): Observable<ExchangeRates> {
  //   return this.http.get<ExchangeRates>(
  //     `${endpoints.last}/${Currency.DOLAR_CANADENSE}3`
  //   );
  // }

  // filterLatestArgentina(): Observable<ExchangeRates> {
  //   return this.http.get<ExchangeRates>(
  //     `${endpoints.last}/${Currency.PESO_ARGENTINO}`
  //   );
  // }

  // filterLatestGPB(): Observable<ExchangeRates> {
  //   return this.http.get<ExchangeRates>(
  //     `${endpoints.last}/${Currency.LIBRA_ESTERLINA}`
  //   );
  // }
}
