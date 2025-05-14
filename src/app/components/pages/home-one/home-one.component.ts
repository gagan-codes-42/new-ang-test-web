import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { SharedService } from 'src/app/shared.service';
import { FbAuthService } from 'src/app/shared/services/auth.service';
import { ComingSoonComponent } from '../../layouts/coming-soon/coming-soon.component';

@Component({
  selector: 'app-home-one',
  templateUrl: './home-one.component.html',
  styleUrls: ['./home-one.component.scss'],
})
export class HomeOneComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private simpleModal: SimpleModalService,
    private fbAuthSvc: FbAuthService,
    public sharedService: SharedService
  ) {}

  notificationPopupClosed = false;

  ngOnInit(): void {}

  ngOnDestroy() {
    this.sharedService.closeSidebar();
  }

  routeToLink(path: string) {
    this.router.navigate([path]);
  }

  showAlert() {
    this.simpleModal.addModal(
      ComingSoonComponent,
      {
        title: 'Alert',
        message: 'Coming Soon !!!',
      },
      {
        closeOnEscape: true,
        closeOnClickOutside: true,
      }
    );
  }

  isRouteActive(path: string) {
    const regex = new RegExp(`^/?${path}`);
    return this.router.url.match(regex);
  }

  get isLoggedIn() {
    return this.fbAuthSvc.userData ? true : false;
  }

  get userName() {
    return this.isLoggedIn
      ? `Hi ${this.fbAuthSvc.userData.firstName}`
      : 'Login';
  }

  async logout() {
    await this.fbAuthSvc.logout();
    this.fbAuthSvc.userData = null;
  }

  closeNotificationPopup() {
    this.notificationPopupClosed = true;
    setTimeout(() => {
      this.sharedService.hideOfferNotificationPopup = true;
    }, 500);
  }

  openOfferForm() {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSehjGbQk3CSXE4ZzFsBhHOSsUwiCWpZSYS_jq1GhYBGM1Fung/viewform?embedded=true',
      '_blank'
    );
    this.closeNotificationPopup();
  }
}
