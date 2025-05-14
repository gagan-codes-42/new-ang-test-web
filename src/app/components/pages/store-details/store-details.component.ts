import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface MessageModel {
  title: string;
  message: string;
  state:string;
  details:any;
}

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})
export class StoreDetailsComponent  extends SimpleModalComponent<MessageModel, boolean>
  implements MessageModel{
    title: string = '';
    message: string = '';
    state:  string = '';
    details :any = [];
  constructor() { 
    super();
  }

  ngOnInit(): void {
  }

}
