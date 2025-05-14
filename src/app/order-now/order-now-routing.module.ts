import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderNowComponent } from '../order-now/order-now.component';
import { MenuCardComponent } from '../order-now/menu-card/menu-card.component';
import { StoreLocatorComponent } from './store-locator/store-locator.component';
import { CartComponent  } from '../order-now/cart/cart.component';
import { OrderTypeComponent } from './order-type/order-type.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrdertrackingComponent } from './ordertracking/ordertracking.component';
import { ReviewOrderComponent } from './review-order/review-order.component'

const routes: Routes = [
  {
    path: '', component: OrderNowComponent,
    children: [
      { path: 'menu-card', component: MenuCardComponent },
      { path: 'store-locator', component: StoreLocatorComponent },
      { path : 'cart' , component:CartComponent},
      { path:'order-type' , component: OrderTypeComponent },
      { path: 'confirmation' , component: ConfirmationComponent },
      { path: 'order-history' , component: OrderHistoryComponent },
      { path: 'order-tracking' , component: OrdertrackingComponent },
      { path: 'order-review' , component: ReviewOrderComponent },
      { path: '**', redirectTo: '/ordernow', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderNowRoutingModule {}
