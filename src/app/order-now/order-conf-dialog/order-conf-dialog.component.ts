import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService }  from '../order.service';

@Component({
  selector: 'app-order-conf-dialog',
  templateUrl: './order-conf-dialog.component.html',
  styleUrls: ['./order-conf-dialog.component.scss']
})
export class OrderConfDialogComponent implements OnInit {
  getdata!: any;
  previousTotal:number=0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private orderService: OrderService) { }

  ngOnInit(): void {
    this.getdata = this.data.details;
    if(this.getdata)
    {
      this.previousTotal=this.getdata.total-this.getdata.deliveryCharge-this.getdata.packingCharge;
    }
  }
  clickHandler(orderId: any, eventType: string) {
    const payload ={
      orderId: orderId,
      status: eventType === 'A' ? "confirmed" : "canceled"
    }
    this.orderService.updateOrderStatus(payload).subscribe((res:any)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
    })

  }


}
