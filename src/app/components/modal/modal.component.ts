import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @ViewChild(ModalDirective, { static: false }) modal!: ModalDirective;
  messages!: string[];
  @Input() title!: string;
  @Input() modalBodyClass!: boolean;
  constructor() {}

  ngOnInit(): void {}
  showModal() {
    this.messages = [];
    this.modal.show();
  }
  hideModal() {
    this.messages = [];
    this.modal.hide();
  }
}
