import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { forkJoin, pipe } from 'rxjs';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit {
  tableData: any = [];
  constructor(
    private authService: AuthService,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCartId();
  }

  getCartId() {
    this.spinner.show();
    this.authService.getCartId().subscribe(
      (res) => {
        if (res && res.result && res.result.length) {
          this.tableData = res.result;
          this.getAllData(res);
        } else {
          this.spinner.hide();
        }
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }
  getOrderById(orderId: any) {
    return this.authService.getOrderById(orderId);
  }
  getAllData(res: any) {
    let objArray: any = [];
    let obj: any = {};
    if (res && res.result && res.result.length) {
      res.result.forEach((e: any, index: any) => {
        obj[`url_${index}`] = this.getOrderById(e.order_id);
        objArray.push(obj[`url_${index}`]);
      });
    }
    forkJoin(objArray).subscribe(
      (res) => {
        console.log(res);
        this.buildTableData(res);
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }
  buildTableData(res: any) {
    this.tableData.forEach((e: any) => {
      res.forEach((item: any) => {
        if (item.order_id === e.order_id) {
          e.launchWizobj = item;
        }
      });
    });
    this.spinner.hide();
    console.log(this.tableData);
  }
  getDate(date: any): any {
    if (date) {
      return this.datePipe.transform(new Date(date), 'MMM d, y');
    } else {
      return ' - ';
    }
  }
  launchWizard() {
    let url = 'https://epanipuricart.com/franchisee-portal/login';
    window.open(url, '_blank');
  }
}
