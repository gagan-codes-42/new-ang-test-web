import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    Location,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
  ],
})
export class AppComponent implements OnInit {
  location: any;
  routerSubscription: any;
  hideFloatMenu = false;
  title: any;

  constructor(private router: Router, public translate: TranslateService) {
    translate.addLangs(['en', 'hn']);
    translate.setDefaultLang(
      localStorage.getItem('lang') ? localStorage.getItem('lang')! : 'en'
    );

    const browserLang = localStorage.getItem('lang')
      ? localStorage.getItem('lang')!
      : translate.getBrowserLang();
    localStorage.setItem('lang', browserLang);
    translate.use(
      browserLang.match(/en|hn/) ? localStorage.getItem('lang')! : 'en'
    );
  }

  ngOnInit() {
    this.recallJsFuntions();
    // TODO: need to find some other way
    // this.loadScript('../assets/js/zoho.js');
    // this.loadScript('../assets/js/whatsapp.js');
  }
  recallJsFuntions() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        $('.preloader-area').fadeIn('slow');
      }
    });
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd || event instanceof NavigationCancel
        )
      )
      .subscribe((event) => {
        if (
          this.router.url &&
          (this.router.url === '/ordernow/menu-card' ||
            this.router.url === '/ordernow/cart' ||
            this.router.url === '/ordernow/confirmation' ||
            this.router.url === '/ordernow/store-locator' ||
            this.router.url === '/ordernow/order-history' ||
            this.router.url === '/ordernow/order-tracking')
        ) {
          this.hideFloatMenu = true;
        } else {
          this.hideFloatMenu = false;

          // TODO: need to find some other way
          // this.loadScript('../assets/js/zoho.js');
          // this.loadScript('../assets/js/whatsapp.js');
        }
        $.getScript('../assets/js/main.js');
        $('.preloader-area').fadeOut('slow');
        this.location = this.router.url;
        if (!(event instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0);
      });
  }

  // TODO: need to find some other way
  // public loadScript(url: string) {
  //   const body = <HTMLDivElement> document.body;
  //   const script = document.createElement('script');
  //   script.innerHTML = '';
  //   script.src = url;
  //   script.async = false;
  //   script.defer = true;
  //   body.appendChild(script);
  // }
}
