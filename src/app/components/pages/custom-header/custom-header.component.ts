import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { SharedService } from 'src/app/shared.service';
import { FbAuthService } from 'src/app/shared/services/auth.service';
import { ComingSoonComponent } from '../../layouts/coming-soon/coming-soon.component';
import { Role } from 'src/app/shared/appConstant.constant';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss']
})
export class CustomHeaderComponent implements OnInit, OnDestroy {
  roles: string[] = [];
  showDashboardLink = false;
  mobileMode: boolean = false;

  constructor(
    private router: Router,
    private simpleModal: SimpleModalService,
    private fbAuthSvc: FbAuthService,
    public sharedService: SharedService,
    private observer: BreakpointObserver,
    private toastSvc: ToastService,
  ) { }

  ngOnInit(): void {
    this.roles = this.fbAuthSvc.userData?.roles;
    this.showDashboardLink =
      this.roles?.length && this.roles[this.roles.length - 1] == 'franchisee'
        ? true
        : false;
        this.observer
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((result) => {
        if (result.matches) {
          this.mobileMode = true;
          this.sharedService.closeSidebar();
        } else {
          this.mobileMode = false;
        }
      });
  }

  ngOnDestroy() {
    this.sharedService.closeSidebar1();
  }
  routeToLink(path: string) {
    this.router.navigate([path]);
  }
  navigateToDashboard() {
    this.router.navigate(['/dashboard/controlPanel']);
  }

  navigateToCurrent() {
    this.router.navigate(['/landing']);
  }
  createVideoRoom() {
    this.toastSvc.showSuccessToast(
      'Creating Video Room',
      `You will be redirected once it's ready`
    );
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
    this.router.navigate(['']);
  }
  navigateTo() {
    if (this.roles?.length) {
      if (this.roles.includes(Role.PAID_SUBSCRIBER)) {
        this.router.navigate(['/upload']);
      } else if (this.roles.includes(Role.IN_REVIEW)) {
        this.router.navigate(['/under-review']);
      } else if (this.roles.includes(Role.FORM_ACCEPTED)) {
        this.router.navigate(['/form-accepted']);
      } else {
        this.router.navigate(['register-partner']);
      }
    }
  }
}

