import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
export interface MessageModel {
  title: string;
  message: string;
}

@Component({
  selector: 'app-pitch-modal',
  template: `
    <div style="max-width: initial !important" class="modal-content" tabindex="-1" role="dialog" aria-hidden="true">
      
      <div class="modal-body">
        <div
          class="col-md-6"
          style="position: relative; overflow: hidden; max-width: 100%"
        >
          <div class="text-center" *ngIf="isLoading">Loading...</div>
          <iframe
            id="public-pitch"
            name="public-pitch"
            title="public-pitch"
            type="text/html"
            width="100%"
            style="height: 80vh;"
            frameborder="0"
            allowFullScreen
            allowTransparency="true"
            src="https://ptch.link/NN9Qyhs"
            allow="autoplay"
            (load)="isLoading = false"
          ></iframe>
        </div>
      </div>
    </div>
  `,
  styleUrls: [],
})
export class PitchModalComponent
  extends SimpleModalComponent<MessageModel, boolean>
  implements MessageModel
{
  title: string = '';
  message: string = '';
  isLoading = true;

  constructor() {
    super();
  }

  // ngOnInit(): void {
  // }
}
