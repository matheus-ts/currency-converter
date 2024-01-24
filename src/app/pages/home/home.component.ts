import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, mergeMap } from 'rxjs';
import { Currency } from 'src/app/helpers/ENUM';
import { CurrencyStorageService } from 'src/app/helpers/storage';
import { CurrencyData } from 'src/app/interfaces/currency.model';
import { CurrencyConverterService } from 'src/app/services/currency-converter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  dolarCanadense?: CurrencyData;
  pesoArgentino?: CurrencyData;
  libraEsterlina?: CurrencyData;

  hasStorage: boolean = false; // Identifies if user has first access

  isLoadingDolar: boolean = false;
  hasErrorDolar: boolean = false;

  isLoadingPeso: boolean = false;
  hasErrorPeso: boolean = false;

  isLoadingLibra: boolean = false;
  hasErrorLibra: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private currencyConverterService: CurrencyConverterService,
    private currencyStorage: CurrencyStorageService
  ) {}

  ngOnInit(): void {
    this.loadFromStorage();

    const intervalSubscription = interval(180000).subscribe(() => {
      this.searchAndDisplayCanada(Currency.DOLAR_CANADENSE);
      this.searchAndDisplayArgentina(Currency.PESO_ARGENTINO);
      this.searchAndDisplayGPB(Currency.LIBRA_ESTERLINA);
    });

    this.subscriptions.push(intervalSubscription);
  }

  loadFromStorage() {
    if (!this.hasStorage) {
      this.searchAndDisplayCanada(Currency.DOLAR_CANADENSE);
      this.searchAndDisplayArgentina(Currency.PESO_ARGENTINO);
      this.searchAndDisplayGPB(Currency.LIBRA_ESTERLINA);
      return;
    } else {
      this.dolarCanadense = this.currencyStorage.getDolarCanadense();
      this.libraEsterlina = this.currencyStorage.getLibraEsterlina();
      this.pesoArgentino = this.currencyStorage.getPesoArgentino();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  searchAndDisplayCanada(currencyCode: string) {
    this.isLoadingDolar = true;
    this.currencyConverterService.filterLatest(currencyCode).subscribe(
      (response) => {
        this.hasErrorDolar = false;
        this.dolarCanadense = response.CADBRL;
        this.currencyStorage.setDolarCanadense(response.CADBRL);
      },
      (error) => {
        this.isLoadingDolar = false;
        this.hasErrorDolar = true;
        console.log(error);
      },
      () => {
        this.isLoadingDolar = false;
      }
    );
  }

  searchAndDisplayArgentina(currencyCode: string) {
    this.isLoadingPeso = true;
    this.currencyConverterService.filterLatest(currencyCode).subscribe(
      (response) => {
        this.hasErrorPeso = false;
        this.pesoArgentino = response.ARSBRL;
        this.currencyStorage.setPesoArgentino(response.ARSBRL);
      },
      (error) => {
        this.isLoadingPeso = false;
        this.hasErrorPeso = true;
        console.log(error);
      },
      () => {
        this.isLoadingPeso = false;
      }
    );
  }
  searchAndDisplayGPB(currencyCode: string) {
    this.isLoadingLibra = true;
    this.currencyConverterService.filterLatest(currencyCode).subscribe(
      (response) => {
        this.hasErrorLibra = false;
        this.libraEsterlina = response.GBPBRL;
        this.currencyStorage.setLibraEsterlina(response.GBPBRL);
      },
      (error) => {
        this.isLoadingDolar = false;
        this.hasErrorLibra = true;
        console.log(error);
      },
      () => {
        this.isLoadingLibra = false;
      }
    );
  }
}
