import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Currency } from 'src/app/helpers/ENUM';
import { CurrencyData } from 'src/app/interfaces/currency.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() currency?: CurrencyData;
  @Input() isLoading: boolean = false;
  @Input() hasError: boolean = false;
  @Input() code?: string;

  @Output() refresh: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  getClassForValue(value: any): string {
    const roundedValue: number = parseFloat(value);
    if (roundedValue <= 1.0) {
      return 'text-danger';
    }
    if (roundedValue > 1.0 && roundedValue <= 5.0) {
      return 'text-info';
    }
    if (roundedValue > 5.0) {
      return 'text-success';
    }
    return '';
  }

  emitEvent(): void {
    return this.refresh.emit(this.code);
  }
}
