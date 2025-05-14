import { DatePipe } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CarouselModule } from 'ngx-owl-carousel-o';

import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
} from 'ngx-perfect-scrollbar';
import { SimpleModalModule } from 'ngx-simple-modal';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdvantageComponent } from './components/advantage/advantage.component';
import { AboutComponent } from './components/layouts/about/about.component';
import { BookTableComponent } from './components/layouts/book-table/book-table.component';
import { ChefsComponent } from './components/layouts/chefs/chefs.component';
import { ComingSoonComponent } from './components/layouts/coming-soon/coming-soon.component';
import { CommercialComponent } from './components/layouts/commercial/commercial.component';
import { ComplianceComponent } from './components/layouts/compliance/compliance.component';
import { ContactComponent } from './components/layouts/contact/contact.component';
import { CtaComponent } from './components/layouts/cta/cta.component';
import { FeaturesComponent } from './components/layouts/features/features.component';
import { FeedbackComponent } from './components/layouts/feedback/feedback.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { GalleryComponent } from './components/layouts/gallery/gallery.component';
import { HeaderOneComponent } from './components/layouts/header-one/header-one.component';
import { InstagramComponent } from './components/layouts/instagram/instagram.component';
import { OfferComponent } from './components/layouts/offer/offer.component';
import { PartnerComponent } from './components/layouts/partner/partner.component';
import { PreloaderComponent } from './components/layouts/preloader/preloader.component';
import { RegistrationModalComponent } from './components/layouts/registration-modal/registration-modal.component';
import { ReservationModalComponent } from './components/layouts/reservation-modal/reservation-modal.component';
import { SocialsComponent } from './components/layouts/socials/socials.component';
import { StatisticsComponent } from './components/layouts/statistics/statistics.component';
import { StunningThingsComponent } from './components/layouts/stunning-things/stunning-things.component';
import { SupportComponent } from './components/layouts/support/support.component';
import { VideoComponent } from './components/layouts/video/video.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { OTPAuthenticationComponent } from './components/otpauthentication/otpauthentication.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { ApprovalProcessComponent } from './components/pages/approval-process/approval-process.component';
import { BlankHeaderComponent } from './components/pages/blank-header/blank-header.component';
import { BlogSingleComponent } from './components/pages/blog-single/blog-single.component';
import { BlogsComponent } from './components/pages/blogs/blogs.component';
import { FormAcceptedComponent } from './components/pages/form-accepted/form-accepted.component';
import { HomeOneComponent } from './components/pages/home-one/home-one.component';
import { IndiaMapComponent } from './components/pages/india-map/india-map.component';
import { LandingComponent } from './components/pages/landing/landing.component';
import { PitchModalComponent } from './components/pages/landing/pitch-modal.component';
import { LoginComponent } from './components/pages/login/login.component';
import { OrderLoginComponent } from './components/pages/order-login/order-login.component';
import { PasswordInputComponent } from './components/pages/password-input/password-input.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { RegCustOtpComponent } from './components/pages/reg-cust-otp/reg-cust-otp.component';
import { RegisterCustomerComponent } from './components/pages/register-customer/register-customer.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { SmartInvoiceComponent } from './components/pages/smart-invoice/smart-invoice.component';
import { StoreDetailsComponent } from './components/pages/store-details/store-details.component';
import { TermsPageComponent } from './components/pages/terms-page/terms-page.component';
import { VideoDetailsComponent } from './components/pages/video-details/video-details.component';
import { PartnerSignUpComponent } from './components/partner-sign-up/partner-sign-up.component';
import { PaymentMultiComponent } from './components/payment-multi/payment-multi.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { UploadComponent } from './components/upload/upload.component';
import { ViewPdfDialogComponent } from './components/upload/view-pdf-dialog/view-pdf-dialog.component';
import { AppMaterialModule } from './shared/material.module';
import { ModelsDetails } from './components/pages/models-details/models-details.component';
import { FbAuthService } from './shared/services/auth.service';
import { FirebaseInterceptor } from './shared/services/firebase.interceptor';
import { SharedModule } from './shared/shared.module';
import { NgxSlickJsModule } from 'ngx-slickjs';
import { BlogsWidgetComponent } from './components/pages/blogs-widget/blogs-widget.component';
import { BlogContentFormatPipe } from './shared/pipes/blog-format.pipe';
import { CancellationPolicyComponent } from './components/pages/cancellation-policy/cancellation-policy.component';
import { ContactUsComponent } from './components/pages/contact-us/contact-us.component';
import { RefundPolicyComponent } from './components/pages/refund-policy/refund-policy.component';
import { ShippingComponent } from './components/pages/shipping/shipping.component';
import { ExpandContentComponent } from './components/common/expandContentComponent/expandContentComponent.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export function initializeApp(fbAuthSvc: FbAuthService) {
  return (): Promise<any> => {
    return fbAuthSvc.InitApp();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeOneComponent,
    PreloaderComponent,
    FooterComponent,
    HeaderOneComponent,
    AboutComponent,
    StunningThingsComponent,
    OfferComponent,
    VideoComponent,
    PartnerComponent,
    ContactComponent,
    InstagramComponent,
    BookTableComponent,
    ChefsComponent,
    CtaComponent,
    GalleryComponent,
    FeaturesComponent,
    FeedbackComponent,
    ReservationModalComponent,
    StatisticsComponent,
    ComingSoonComponent,
    OTPAuthenticationComponent,
    RegistrationComponent,
    LoginComponent,
    PartnerSignUpComponent,
    RegistrationModalComponent,
    LandingComponent,
    BlankHeaderComponent,
    SupportComponent,
    TermsPageComponent,
    PrivacyPolicyComponent,
    PaymentsComponent,
    UploadComponent,
    OrderConfirmationComponent,
    PdfViewerComponent,
    ComplianceComponent,
    ResetPasswordComponent,
    SocialsComponent,
    BlogsComponent,
    PitchModalComponent,
    ApprovalProcessComponent,
    PasswordInputComponent,
    CommercialComponent,
    OrderLoginComponent,
    AdvantageComponent,
    RegisterCustomerComponent,
    RegCustOtpComponent,
    SmartInvoiceComponent,
    BlogSingleComponent,
    ViewPdfDialogComponent,
    FormAcceptedComponent,
    AboutUsComponent,
    IndiaMapComponent,
    StoreDetailsComponent,
    VideoDetailsComponent,
    PaymentMultiComponent,
    ModelsDetails,
    BlogsWidgetComponent,
    ExpandContentComponent,
    BlogContentFormatPipe,
    CancellationPolicyComponent,
    ContactUsComponent,
    RefundPolicyComponent,
    ShippingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    SimpleModalModule,
    CarouselModule,
    NgxSlickJsModule.forRoot({
      links: {
        jquery: "https://code.jquery.com/jquery-3.4.0.min.js",
        slickJs:
          "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js",
        slickCss:
          "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css",
        slickThemeCss: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css",
      }
    }),
    PerfectScrollbarModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 2000 }),
    PdfViewerModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    MatCardModule,
    AppMaterialModule,
  ],
  exports: [],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FirebaseInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [FbAuthService],
      multi: true,
    },
    DatePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
