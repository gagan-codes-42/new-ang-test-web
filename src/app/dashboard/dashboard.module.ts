import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { AgreementsComponent } from './agreements/agreements.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrderComponent } from './order/order.component';
import { PaymentsComponent } from './payments/payments.component';
import { TrackHistoryComponent } from './track-history/track-history.component';
import { ApplyAgainComponent } from './apply-again/apply-again.component';
import { DashboardCustomHeaderComponent } from './dashboard-custom-header/dashboard-custom-header.component';
import { AppMaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [
    DashboardComponent,
    OrderComponent,
    ControlPanelComponent,
    AgreementsComponent,
    NewOrderComponent,
    PaymentsComponent,
    HeaderComponent,
    TrackHistoryComponent,
    CheckoutComponent,
    ApplyAgainComponent,
    DashboardCustomHeaderComponent
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, AppMaterialModule],
  providers: [DatePipe, TranslateService],
})
export class DashboardModule {}
