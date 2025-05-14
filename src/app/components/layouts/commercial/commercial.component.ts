import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FbAuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.scss'],
})
export class CommercialComponent implements OnInit {
  constructor(private router: Router, private fbAuthSvc: FbAuthService) {}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
    },
    autoplay: true,
    autoplaySpeed: 1000,
  };

  ngOnInit(): void {}

  openRegistrationPage() {
    this.router.navigate(['/register']);
  }

  get isFranchise() {
    return (
      this.fbAuthSvc.userData &&
      (this.fbAuthSvc.userData.roles as string[]).includes('franchisee')
    );
  }
}
