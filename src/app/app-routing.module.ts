import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvantageComponent } from './components/advantage/advantage.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { OTPAuthenticationComponent } from './components/otpauthentication/otpauthentication.component';
import { ApprovalProcessComponent } from './components/pages/approval-process/approval-process.component';
import { BlogSingleComponent } from './components/pages/blog-single/blog-single.component';
import { BlogsComponent } from './components/pages/blogs/blogs.component';
import { FormAcceptedComponent } from './components/pages/form-accepted/form-accepted.component';
import { HomeOneComponent } from './components/pages/home-one/home-one.component';
import { LandingComponent } from './components/pages/landing/landing.component';
import { ModelsDetails } from './components/pages/models-details/models-details.component';
import { LoginComponent } from './components/pages/login/login.component';
import { OrderLoginComponent } from './components/pages/order-login/order-login.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { RegCustOtpComponent } from './components/pages/reg-cust-otp/reg-cust-otp.component';
import { RegisterCustomerComponent } from './components/pages/register-customer/register-customer.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { SmartInvoiceComponent } from './components/pages/smart-invoice/smart-invoice.component';
import { TermsPageComponent } from './components/pages/terms-page/terms-page.component';
import { UnderReviewComponent } from './components/pages/under-review/under-review.component';
import { PartnerSignUpComponent } from './components/partner-sign-up/partner-sign-up.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { UploadComponent } from './components/upload/upload.component';
import { Role } from './shared/appConstant.constant';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginGuard } from './shared/guards/login.guard';
import { RoleGuard } from './shared/guards/role.guard';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { CancellationPolicyComponent } from './components/pages/cancellation-policy/cancellation-policy.component';
import { RefundPolicyComponent } from './components/pages/refund-policy/refund-policy.component';
import { ContactUsComponent } from './components/pages/contact-us/contact-us.component';
import { PaymentMultiComponent } from './components/payment-multi/payment-multi.component';
import { ShippingComponent } from './components/pages/shipping/shipping.component';

const routes: Routes = [
  { path: '', component: HomeOneComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'blog/:blogTitle', component: BlogSingleComponent },
  {
    path: 'otp-auth',
    component: OTPAuthenticationComponent,
    canActivate: [LoginGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: 'reset',
    component: ResetPasswordComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'register',
    component: RegistrationComponent,
    canActivate: [LoginGuard],
  },
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuard] },
  { path: 'tnc', component: TermsPageComponent },
  { path: 'cancellation-policy', component: CancellationPolicyComponent },
  { path: 'refund-policy', component: RefundPolicyComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'shipping', component: ShippingComponent },
  {
    path: 'advantage',
    component: AdvantageComponent,
    data: { roles: [Role.SUBSCRIBER, Role.CUSTOMER] },
  },
  {
    path: 'register-partner',
    component: PartnerSignUpComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.SUBSCRIBER, Role.CUSTOMER] },
  },
  {
    path: 'under-review',
    component: UnderReviewComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.SUBSCRIBER, Role.CUSTOMER, Role.IN_REVIEW] },
  },
  {
    path: 'form-accepted',
    component: FormAcceptedComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.SUBSCRIBER, Role.CUSTOMER, Role.FORM_ACCEPTED] },
  },
  {
    path: 'payment',
    component: PaymentsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.SUBSCRIBER, Role.CUSTOMER] },
  },
  {
    path: 'payment-multi',
    component: PaymentMultiComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.SUBSCRIBER, Role.CUSTOMER, Role.FORM_ACCEPTED] },
  },
  {
    path: 'upload',
    component: UploadComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.SUBSCRIBER, Role.CUSTOMER, Role.PAID_SUBSCRIBER] },
  },
  {
    path: 'order-confirm',
    component: OrderConfirmationComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: [
        Role.SUBSCRIBER,
        Role.CUSTOMER,
        Role.PAID_SUBSCRIBER,
        Role.FRANCHISEE,
      ],
    },
  },
  {
    path: 'pdf-viewer',
    component: PdfViewerComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: [
        Role.SUBSCRIBER,
        Role.CUSTOMER,
        Role.PAID_SUBSCRIBER,
        Role.FRANCHISEE,
      ],
    },
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: [
        Role.SUBSCRIBER,
        Role.CUSTOMER,
        Role.PAID_SUBSCRIBER,
        Role.FRANCHISEE,
      ],
    },
  },
  {
    path: 'ordernow',
    loadChildren: () =>
      import('./order-now/order-now.module').then((m) => m.OrderNowModule),
    canActivate: [AuthGuard],
    data: {
      roles: [
        Role.SUBSCRIBER,
        Role.CUSTOMER,
        Role.PAID_SUBSCRIBER,
        Role.FRANCHISEE,
      ],
    },
  },
  {
    path: 'approvalProcess',
    component: ApprovalProcessComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order-login',
    component: OrderLoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'register-customer',
    component: RegisterCustomerComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'reg-cust-otp',
    component: RegCustOtpComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'smart-invoice/:id',
    component: SmartInvoiceComponent,
  },
  {
    path: 'model-details',
    component: ModelsDetails,
  },
  { path: 'aboutus', component: AboutUsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
