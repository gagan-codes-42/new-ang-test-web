import { Component, OnInit } from '@angular/core';
import { faCheckCircle , faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {
  orderId = 121323423423;
  faCheckCircle = faCheckCircle;
  faArrowLeft = faArrowLeft;
  constructor(private router : Router , private sharedDataService : SharedDataService) { }

  ngOnInit(): void {
    this.orderId = this.sharedDataService.orderId;
    
  }
  gotoHome(){
    this.router.navigate(['/landing']);
  }
  viewDASHBOARD(){
    this.router.navigate(['/dashboard']);
  }
  backtoLanding(){
    this.router.navigate(['/landing']);
  }
}
