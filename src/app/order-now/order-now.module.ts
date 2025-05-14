import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { OrderService } from '../order-now/order.service';
import { AppMaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { AddressAddComponent } from './address-add/address-add.component';
import { AddressComponent } from './address/address.component';
import { CartComponent } from './cart/cart.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { OrderConfDialogComponent } from './order-conf-dialog/order-conf-dialog.component';
import { OrderHeaderComponent } from './order-header/order-header.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderNowRoutingModule } from './order-now-routing.module';
import { OrderNowComponent } from './order-now.component';
import { OrderTypeComponent } from './order-type/order-type.component';
import { OrdertrackingComponent } from './ordertracking/ordertracking.component';
import { PaymentTypeComponent } from './payment-type/payment-type.component';
import { ReviewOrderComponent } from './review-order/review-order.component';
import { CategorySheetComponent } from './shared/category-sheet/category-sheet.component';
import { ItemMenuComponent } from './shared/item-menu/item-menu.component';
import { QuantityComponent } from './shared/quantity/quantity.component';
import { ReplicateOrderComponent } from './shared/replicate-order/replicate-order.component';
import { StoreLocatorComponent } from './store-locator/store-locator.component';

const config: SocketIoConfig = { url: environment.socketURL, options: {} };
@NgModule({
  declarations: [
    OrderNowComponent,
    MenuCardComponent,
    StoreLocatorComponent,
    OrderHeaderComponent,
    CategorySheetComponent,
    ItemMenuComponent,
    ReplicateOrderComponent,
    QuantityComponent,
    CartComponent,
    PaymentTypeComponent,
    OrderTypeComponent,
    ConfirmationComponent,
    OrderConfDialogComponent,
    OrderHistoryComponent,
    OrdertrackingComponent,
    AddressComponent,
    AddressAddComponent,
    ReviewOrderComponent,
  ],
  imports: [
    CommonModule,
    OrderNowRoutingModule,
    SharedModule,
    MatDividerModule,
    AppMaterialModule,
    MatDialogModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [OrderService, DatePipe],
})
export class OrderNowModule {}
