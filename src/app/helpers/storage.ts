// currency-storage.service.ts

import { Injectable } from '@angular/core';
import { CurrencyData } from 'src/app/interfaces/currency.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyStorageService {
  private readonly STORAGE_PREFIX = 'currency_';

  getDolarCanadense(): CurrencyData | undefined {
    return this.getItem('dolarCanadense');
  }

  setDolarCanadense(data: CurrencyData): void {
    this.setItem('dolarCanadense', data);
  }

  getPesoArgentino(): CurrencyData | undefined {
    return this.getItem('pesoArgentino');
  }

  setPesoArgentino(data: CurrencyData): void {
    this.setItem('pesoArgentino', data);
  }

  getLibraEsterlina(): CurrencyData | undefined {
    return this.getItem('libraEsterlina');
  }

  setLibraEsterlina(data: CurrencyData): void {
    this.setItem('libraEsterlina', data);
  }

  private getItem(key: string): CurrencyData | undefined {
    const storedData = localStorage.getItem(`${this.STORAGE_PREFIX}${key}`);

    if (storedData) {
      return JSON.parse(storedData);
    }

    return undefined;
  }

  private setItem(key: string, data: CurrencyData): void {
    localStorage.setItem(`${this.STORAGE_PREFIX}${key}`, JSON.stringify(data));
  }
}
