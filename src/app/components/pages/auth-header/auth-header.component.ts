import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/shared/appConstant.constant';
import { FbAuthService } from 'src/app/shared/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SharedService } from 'src/app/shared.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.scss'],
})
export class AuthHeaderComponent implements OnInit {
  roles: string[] = [];
  showDashboardLink = false;
  mobileMode: boolean = false;

  constructor(
    private router: Router,
    private fbAuthService: FbAuthService,
    public sharedSvc: SharedService,
    private toastSvc: ToastService,
    private observer: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.roles = this.fbAuthService.userData?.roles;
    this.showDashboardLink =
      this.roles?.length && this.roles[this.roles.length - 1] == 'franchisee'
        ? true
        : false;
    this.observer
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((result) => {
        if (result.matches) {
          this.mobileMode = true;
          this.sharedSvc.closeSidebar();
        } else {
          this.mobileMode = false;
        }
      });
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

  navigateToDashboard() {
    this.router.navigate(['/dashboard/controlPanel']);
  }

  navigateToCurrent() {
    this.router.navigate(['/landing']);
  }
  navigateToApprovalProccess() {
    this.router.navigate(['/approvalProcess']);
  }
  navigateToAdvantage() {
    this.router.navigate(['/advantage']);
  }
  createVideoRoom() {
    this.sharedSvc.openDetailsPage();
  }

  async logout() {
    await this.fbAuthService.logout();
    this.fbAuthService.userData = null;
    this.router.navigate(['']);
  }
}
