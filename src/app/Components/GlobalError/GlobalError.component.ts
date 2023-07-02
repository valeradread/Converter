import {Component} from '@angular/core'
import {ErrorService} from "../../services/error.service";




@Component({
  selector: 'app-global-error',
  templateUrl: './GlobalError.component.html',
  styleUrls: ['./GlobalError.component.css']
})

export class GlobalError {
 constructor(public errorService: ErrorService) {
 }

}
