import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnderReviewComponent } from '../components/pages/under-review/under-review.component';
import { ApplyAgainComponent } from './apply-again/apply-again.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrderComponent } from './order/order.component';
import { PaymentsComponent } from './payments/payments.component';
import { TrackHistoryComponent } from './track-history/track-history.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'order', component: OrderComponent },
      { path: 'controlPanel', component: ControlPanelComponent },
      //  { path: 'agreements', component: AgreementsComponent },
      { path: 'newOrder', component: NewOrderComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'tracking', component: TrackHistoryComponent },
      { path: 'apply-again', component: ApplyAgainComponent },
      {
        path: 'under-review',
        component: UnderReviewComponent,
        data: { backTo: '/dashboard/controlPanel' },
      },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
