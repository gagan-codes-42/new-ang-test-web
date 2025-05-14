import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { FbAuthService } from 'src/app/shared/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss'],
})
export class HeaderOneComponent implements OnInit {
  mobileMode: boolean = false;
  constructor(
    private router: Router,
    private fbAuthSvc: FbAuthService,
    public sharedSvc: SharedService,
    private toastSvc: ToastService,
    private observer: BreakpointObserver
  ) {}

  ngOnInit(): void {
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

  routeToLink(path: string) {
    if(path === '/dashboard/controlPanel'){
      if(this.fbAuthSvc.userData.roles.includes('franchisee')){
        this.router.navigate(['/dashboard/controlPanel']);
      }else {
        this.router.navigate(['/landing']);
      }
    } else {
      this.router.navigate([path]);
    }
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

  createVideoRoom() {
    this.sharedSvc.openDetailsPage();
  }

  async logout() {
    await this.fbAuthSvc.logout();
    this.fbAuthSvc.userData = null;
  }
  
}
