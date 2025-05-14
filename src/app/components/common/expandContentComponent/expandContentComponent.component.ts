import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-expand-content',
  templateUrl: './expandContentComponent.component.html',
  styleUrls: ['./expandContentComponent.component.scss'],
})
export class ExpandContentComponent  {
  isExpand = false;
  @Output() expandCollapse = new EventEmitter<boolean>();
 
  constructor() {
   
  }
 
  onClick() {
    this.isExpand = !this.isExpand;
    this.expandCollapse.emit(this.isExpand);
  }

}
