import { CartService } from '../../../services/cartService.service';
import { ItemMenuComponent } from './../item-menu/item-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-replicate-order',
  templateUrl: './replicate-order.component.html',
  styleUrls: ['./replicate-order.component.scss'],
})
export class ReplicateOrderComponent implements OnInit {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<ReplicateOrderComponent>,
    private cartService: CartService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onChoose = () => {
    let item = this.data.item;
    let price = this.data.price;
    const dialogRef = this.dialog.open(ItemMenuComponent, {
      data: { item: item, price: price },
      panelClass: 'open-item',
    });
    dialogRef.afterClosed().subscribe((result) => {});
    this._bottomSheetRef.dismiss();
  };

  onRepeat = ():any => {
    let item:any = this.data.item;
    let prevItem:any = this.getPrevItem();
    if (this.cartService.cart_items[prevItem.cartItemId]) {
      this.cartService.cart_items[prevItem.cartItemId].quantity += 1;
    } else {
      this.cartService.cart_items[prevItem.cartItemId] = prevItem.value;
    }
    this._bottomSheetRef.dismiss();
  };

  getPrevItem = ():any => {
     return this.cartService.prev_items[this.data.item.id];
  };
}
