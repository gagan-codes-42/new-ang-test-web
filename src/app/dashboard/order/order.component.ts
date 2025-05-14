import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  myOrderList: any[] = [];

  constructor(
    private authService: AuthService,
    private sharedDataService: SharedDataService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getMyOrders();
  }
  getMyOrders() {
    this.authService.getMyOrders().subscribe(
      (res) => {
        console.log(res);
        if (res) {
          this.myOrderList = res.filter((e: any) => e.status !== 'pending');
        }
      },
      (error) => {
        console.log(error);
        this.myOrderList = [];
      }
    );
  }

  showTracking(item: any) {
    this.sharedDataService.trackingItem = item;
    this.router.navigate(['/dashboard/tracking']);
  }

  getDate(date: any): any {
    if (date) {
      return this.datePipe.transform(new Date(date), 'MMM d, y');
    } else {
      return ' - ';
    }
  }
}
