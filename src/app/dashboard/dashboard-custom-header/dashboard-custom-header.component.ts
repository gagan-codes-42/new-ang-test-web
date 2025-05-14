import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FbAuthService } from 'src/app/shared/services/auth.service';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataService } from '../../services/shared-data.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-dashboard-custom-header',
  templateUrl: './dashboard-custom-header.component.html',
  styleUrls: ['./dashboard-custom-header.component.scss']
})
export class DashboardCustomHeaderComponent implements OnInit, OnDestroy{
  pendingAggrement = 0;
  isSwitchedOn = localStorage.getItem('lang') === 'hn'? false : true ;
  faShoppingCart = faShoppingCart;
  mobileMode: boolean = false;
  constructor(private fbAuthService : FbAuthService , private router :Router, private authService : AuthService ,
    private translate : TranslateService ,
    private sharedData : SharedDataService, private observer: BreakpointObserver, public sharedService: SharedService
    ) { }

    ngOnInit(): void {
      this.authService.getAgreementData().subscribe((res)=>{
        if(res && res.result){
          this.pendingAggrement = res.result.length;
          this.sharedData.AggrementData.next(res);
        }
      })
      this.observer
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((result) => {
        if (result.matches) {
          this.mobileMode = true;
          this.sharedService.closeSidebar2();
        } else {
          this.mobileMode = false;
        }
      });
    }
    async logout() {
      await this.fbAuthService.logout();
      this.fbAuthService.userData = null;
      this.router.navigate(['']);
    }
    onChange(e:any){
      console.log(e);
      let lang = e ? 'en' : 'hn'
      localStorage.setItem('lang', lang);
      this.translate.use(lang.match(/en|hn/) ? localStorage.getItem('lang')! : 'en');    
    }
    ngOnDestroy() {
      this.sharedService.closeSidebar2();
    }

}
