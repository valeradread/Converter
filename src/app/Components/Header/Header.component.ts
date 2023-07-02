import {Component, Input} from '@angular/core'
import {ICurrency} from "../../models/currency";




@Component({
  selector: 'app-header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})

export class Header {
  @Input() USD_currency: ICurrency;
  @Input() EUR_currency: ICurrency;

}
