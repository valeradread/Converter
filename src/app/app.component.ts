import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "./services/currency.service";
import {ICurrency} from "./models/currency";
import {tap} from "rxjs";
import { FormControl, Validators } from '@angular/forms';

const USD_code = 840;
const EUR_code = 978;

const UAH_image = './assets/Ukraine.png';
const USD_image = './assets/USA.png';
const EUR_image = './assets/European%20union.png';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'converter';
  currencies: ICurrency[];
  loading = false;
  UAH_currency: ICurrency;
  USD_currency: ICurrency;
  EUR_currency: ICurrency;
  input1: FormControl;
  input2: FormControl;
  selectedCurrency1: string;
  selectedCurrency2: string;
  selectedCurrency1_value: number;
  selectedCurrency2_value: number;
  selectedCurrency1_image: string;
  selectedCurrency2_image: string;


  validCheck(changedInput: FormControl) {
    const inputValue = changedInput.value;
    let validInput = inputValue.replace(/[^0-9.]/g, '');

    if (validInput.startsWith('.')) {
      validInput = '0' + validInput;
    }

    const lastIndex = validInput.lastIndexOf('.');
    if (lastIndex !== -1) {
      validInput = validInput.substring(0, lastIndex + 1) +
        validInput.substring(lastIndex + 1).replace(/\./g, '');
    }

    const decimalIndex = validInput.indexOf('.');
    if (decimalIndex !== -1 && validInput.length - decimalIndex > 3) {
      validInput = validInput.substring(0, decimalIndex + 3);
    }

    changedInput.setValue(validInput);
  }

  onInputChange(changedInput: FormControl) {
    this.validCheck(changedInput);
    if(changedInput === this.input1){
      this.updateInput2()
    } else {
      this.updateInput1()
    }

  }

  updateInput2() {
    const input1Value = parseFloat(this.input1.value);
    if (!isNaN(input1Value)) {
      const result = input1Value * this.selectedCurrency1_value / this.selectedCurrency2_value;
      const roundedResult = Math.round(result * 100) / 100;
      this.input2.setValue(roundedResult.toFixed(2));
    }
  }

  updateInput1() {
    this.input1.setValue(this.input2.value * this.selectedCurrency2_value / this.selectedCurrency1_value);
    const input2Value = parseFloat(this.input2.value);
    if (!isNaN(input2Value)) {
      const result = input2Value * this.selectedCurrency2_value / this.selectedCurrency1_value;
      const roundedResult = Math.round(result * 100) / 100;
      this.input1.setValue(roundedResult.toFixed(2));
    }
  }

  onSelect1Change(selectedValue: string) {
    if(selectedValue === 'UAH') {
      this.selectedCurrency1_value = 1;
      this.selectedCurrency1_image = UAH_image;
    }
    if(selectedValue === 'USD') {
      this.selectedCurrency1_value = this.USD_currency.rateSell;
      this.selectedCurrency1_image = USD_image;
    }
    if(selectedValue === 'EUR') {
      this.selectedCurrency1_value = this.EUR_currency.rateSell;
      this.selectedCurrency1_image = EUR_image;
    }
    this.updateInput2()

  }

  onSelect2Change(selectedValue: string) {
    if(selectedValue === 'UAH') {
      this.selectedCurrency2_value = 1;
      this.selectedCurrency2_image = UAH_image;
    }
    if(selectedValue === 'USD') {
      this.selectedCurrency2_value = this.USD_currency.rateSell;
      this.selectedCurrency2_image = USD_image;
    }
    if(selectedValue === 'EUR') {
      this.selectedCurrency2_value = this.EUR_currency.rateSell;
      this.selectedCurrency2_image = EUR_image
    }
    this.updateInput1()

  }

  changePlaces() {
    let h = this.selectedCurrency1;
    this.selectedCurrency1 = this.selectedCurrency2;
    this.selectedCurrency2 = h;
    let h2 = this.input1.value;
    this.input1.setValue(this.input2.value);
    this.input2.setValue(h2);
  }

  constructor(private service: CurrencyService){
    this.selectedCurrency1 = 'UAH';
    this.selectedCurrency2 = 'USD';
    this.selectedCurrency1_image = UAH_image;
    this.selectedCurrency2_image = USD_image;
  }

  ngOnInit(): void {
    this.loading = true;

    this.service.getAll().pipe(
      tap((response) => {
        this.currencies = response;
        this.USD_currency = this.currencies.find(c => c.currencyCodeA === USD_code)!;
        this.EUR_currency = this.currencies.find(c => c.currencyCodeA === EUR_code)!;
        this.selectedCurrency1_value = 1;
        this.selectedCurrency2_value = this.USD_currency.rateSell;
        this.loading = false;
        console.log(this.USD_currency);
      })
    ).subscribe();

    this.input1 = new FormControl('', Validators.pattern('[0-9]*'));
    this.input2 = new FormControl('');
    // this.input1.valueChanges.subscribe( value => {
    //  this.updateInput1();
    // })
    // this.input1.valueChanges.subscribe( value => {
    //   this.updateInput2();
    // })


  }


}
