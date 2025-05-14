import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';

export interface Location {
  device_id: string;
  location: string;
}

export interface Locations {
  locations: Location[];
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient, private socket: Socket) {}
  private subscriptions: Subscription = new Subscription();

  getLocationsForStateAndCity(state: string, city: string) {
    return this.httpClient.get<Locations>(
      `${environment.serverURL}/getAllLocations?state=${state}&town=${city}`
    );
  }
  getMenuCard(cartId: any) {
    return this.httpClient.get<any>(
      `${environment.orderNowServerURL}/getMenu?cartId=${cartId}`
    );
  }
  getOrderCart(cartId: any) {
    return this.httpClient.get<any>(
      `${environment.orderNowServerURL}/getOrderCart?cartId=${cartId}`
    );
  }
  addToOrderCart(payload: any) {
    return this.httpClient.post<any>(
      `${environment.orderNowServerURL}/addToOrderCart`,
      payload
    );
  }
  removeFromOrderCart(payload: any) {
    return this.httpClient.post<any>(
      `${environment.orderNowServerURL}/removeFromOrderCart`,
      payload
    );
  }
  placeOrder(payload: any) {
    return this.httpClient.post<any>(
      `${environment.orderNowServerURL}/placeOrder`,
      payload
    );
  }

  registerCartSID(token: string) {
    this.socket.emit('registerSidByCustomer', { token });
    return this.socket.fromEvent('customerResponse');
  }

  listenForOrders() {
    return this.socket.fromEvent('receiveEditedOrder');
  }

  cancelSubscriptions() {
    this.subscriptions.unsubscribe();
    this.socket.removeAllListeners();
  }

  allOrderStatus(token: string) {
    this.socket.emit('allOrderStatus', { token });
    return this.socket.fromEvent('allOrderStatus');
  }

  getOrderByOrderId(orderId: any) {
    this.socket.emit('getOrderByOrderId', { orderId });
    return this.socket.fromEvent('getOrderByOrderId');
  }

  updateOrderStatus(payload: any) {
    return this.httpClient.post<any>(
      `${environment.orderNowServerURL}/updateOrderStatus`,
      payload
    );
  }
  getBill(orderId: any) {
    const httpOptions = {
      responseType: 'blob' as 'json',
    };
    return this.httpClient.get<any>(
      `${environment.orderNowServerURL}/generateInvoice?orderId=${orderId}`,
      httpOptions
    );
  }
  getCitiesByState(state: string) {
    return this.httpClient.get<any>(
      `${environment.serverURL}/getCitiesByState?state=${state}`
    );
  }
  getAddress() {
    return this.httpClient.get<any>(
      `${environment.orderNowServerURL}/getAddress`
    );
  }

  addAddress(payload: any) {
    return this.httpClient.post<any>(
      `${environment.orderNowServerURL}/updateAddress/add`,
      payload
    );
  }
}
