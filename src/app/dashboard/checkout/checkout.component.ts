import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { forkJoin, pipe } from 'rxjs';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  constructor( private authService : AuthService , private datePipe : DatePipe , private spinner: NgxSpinnerService, private router:Router ) { }

  ngOnInit(): void {
  }
  backtoNewOrder(){
    this.router.navigate(['/dashboard/newOrder']);
  }
}
