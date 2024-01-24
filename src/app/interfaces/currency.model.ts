export interface CurrencyData {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}

export interface ExchangeRates {
  CADBRL: CurrencyData;
  ARSBRL: CurrencyData;
  GBPBRL: CurrencyData;
}
