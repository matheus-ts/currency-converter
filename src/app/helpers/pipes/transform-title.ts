import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    standalone: true,
    name: 'currencyTitle'
  })
  export class CurrencyTitle implements PipeTransform {
    transform(value?: string): string {
      return value ? value?.split('/')[0].trim() : ''
    }
  }