import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faUserClock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-under-review',
  templateUrl: './under-review.component.html',
  styleUrls: ['./under-review.component.scss'],
})
export class UnderReviewComponent implements OnInit {
  constructor(private router: Router, private authSvc: AuthService, private activatedRute: ActivatedRoute) {}

  faUserClock = faUserClock;
  faArrowLeft = faArrowLeft;

  backTo = '/landing';
  orderDetails: any = {};

  ngOnInit(): void {
    this.authSvc.getCandidateForms().subscribe(res =>{
      this.orderDetails = res;
    });
    if (
      this.activatedRute.snapshot.data &&
      this.activatedRute.snapshot.data.backTo
    ) {
      this.backTo = this.activatedRute.snapshot.data.backTo;
    }
  }

  showLanding() {
    this.router.navigate([this.backTo]);
  }
}
