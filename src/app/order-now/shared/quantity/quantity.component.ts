import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  DoCheck,
} from '@angular/core';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss'],
})
export class QuantityComponent implements OnInit, OnChanges {
  @Input() quantityShow!: number;
  @Input() minQuantity!: number;
  @Input() type!: string;
  @Output() quantityChanges = new EventEmitter<object>();
  quantity:any;
  isItemIncrease = false;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.quantity = this.quantityShow;
    this.isItemIncrease = false;
  }

  onAdd = () => {
    if (this.quantity >= 99) {
      return;
    }
    if (this.quantity >= this.minQuantity) {
      this.quantity++;
      this.isItemIncrease = true;
     }
    this.quantityChanges.emit({quantity:this.quantity , isItemIncrease : this.isItemIncrease});
  };

  onSubtract = () => {
    if (this.quantity > this.minQuantity) {
      this.quantity--;
      this.isItemIncrease = false;
    }
    this.quantityChanges.emit({quantity:this.quantity , isItemIncrease : this.isItemIncrease});
  };
}
