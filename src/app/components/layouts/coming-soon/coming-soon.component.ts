import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
export interface MessageModel {
  title: string;
  message: string;
}

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss'],
})
export class ComingSoonComponent
  extends SimpleModalComponent<MessageModel, boolean>
  implements MessageModel
{
  title: string = '';
  message: string = '';

  constructor() {
    super();
  }

  // ngOnInit(): void {
  // }
}
