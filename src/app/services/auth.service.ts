import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface OTPSendResponse {
  message: string;
  msg_id: string;
  status: string;
  token: string;
}

export interface OTPResendResponse {
  message: string;
  msg_id: string;
  status: string;
  token: string;
}

export interface OTPVerifyResponse {
  valid: string;
}

export interface RegistrationInfo {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface Item {
  dateModified: number;
  extension: string;
  modelType: number;
  name: string;
  price: number;
  uid: number;
  subscriptionPrice: number;
}

export interface Costing {
  items: Item[];
}

export interface SubscribeData {
  email: string;
}

export interface PForm {
  aadhar: string;
  address: string;
  createdDate: string;
  email: string;
  fatherName: string;
  firstName: string;
  formId: string;
  gst_no: string;
  gst_treatment: string;
  isMulti: boolean;
  isSubscription: boolean;
  lastName: string;
  location: string;
  mobile: string;
  pincode: string;
  selectedTowns: string[];
  state: string;
  status: number;
  termsAndConditions: string;
  title: string;
  price: number;
  uid: number;
}

export interface PartnerForm {
  forms: PForm[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registrationInfo: RegistrationInfo = {
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  loginInfo: LoginInfo = {
    email: '',
    password: '',
  };

  subscribeData: SubscribeData = {
    email: '',
  };
  bs = new BehaviorSubject(0);
  constructor(private httpClient: HttpClient) { }

  sendOTP(
    phone: string,
    firstName: string,
    lastName: string,
    email: string
  ): Observable<OTPSendResponse> {
    return this.httpClient.post<OTPSendResponse>(
      `${environment.serverURL}/sendOTP`,
      {
        phone,
        firstName,
        lastName,
        email,
      }
    );
  }

  sendOrderOTP(
    phone: string,
    firstName: string,
    lastName: string,
    email: string
  ): Observable<OTPSendResponse> {
    return this.httpClient.post<OTPSendResponse>(
      `${environment.orderNowServerURL}/sendOTP`,
      {
        phone,
        firstName,
        lastName,
        email,
      }
    );
  }

  resendOTP(phone: string, token: string): Observable<OTPResendResponse> {
    return this.httpClient.post<OTPResendResponse>(
      `${environment.serverURL}/resendOTP`,
      {
        phone,
        token,
      }
    );
  }

  verifyOTP(
    phone: string,
    token: string,
    otp: string,
    firstName: string,
    lastName: string,
    email: string,
    title: string
  ) {
    return this.httpClient.post<OTPVerifyResponse>(
      `${environment.serverURL}/verifyOTP`,
      {
        phone,
        token,
        otp,
        firstName,
        lastName,
        email,
        title,
      }
    );
  }

  verifyOrderOTP(phone: string, token: string, otp: string) {
    return this.httpClient.post<OTPVerifyResponse>(
      `${environment.orderNowServerURL}/verifyOTP`,
      {
        phone,
        token,
        otp,
      }
    );
  }

  signUpSubscriber(
    title: string,
    firstName: string,
    lastName: string,
    email: string,
    mobile: string
  ) {
    return this.httpClient.post<any>(
      `${environment.serverURL}/register/subscriber`,
      {
        title,
        firstName,
        lastName,
        email,
        mobile,
      }
    );
  }

  loginSubscriber(email: string, password: string) {
    return this.httpClient.post<any>(
      `${environment.serverURL}/login/subscriber`,
      {
        email,
        password,
      }
    );
  }

  subscribeNewsLetter(email: string) {
    return this.httpClient.post<any>(
      `${environment.serverURL}/subscribeNewsletter`,
      {
        email,
      }
    );
  }

  savePartnerForm(partnerFormValue: any) {
    console.log(partnerFormValue);
    return this.httpClient.post<any>(
      `${environment.serverURL}/v2/saveGeneralForm`,
      partnerFormValue
    );
  }

  fetchPartnerForm() {
    return this.httpClient.get<any>(
      `${environment.serverURL}/getGeneralInformation`
    );
  }

  fetchCandidateDetails() {
    return this.httpClient.get<PartnerForm>(
      `${environment.serverURL}/getCandidateForms`
    );
  }

  fetchModelPartnerDetails() {
    return this.httpClient.get<Costing>(`${environment.serverURL}/getCosting`);
  }
  makePayment(params: any) {
    console.log(params);
    return this.httpClient.post<any>(`${environment.serverURL}/payNow`, params);
  }
  upload(fileArray: any, orderId: any): any {
    const formData: FormData = new FormData();
    for (let i = 0; i < fileArray.length; i++) {
      formData.append('files[]', fileArray[i].file[0]);
      formData.append(fileArray[i].type, fileArray[i].file[0].name);
    }
    formData.append('order_id', orderId);
    return this.httpClient.post<any>(
      `${environment.serverURL}/uploadDocuments`,
      formData
    );
  }
  getOrderId() {
    return this.httpClient.get<any>(`${environment.serverURL}/getLatestOrder`);
  }
  getMOU(path: any) {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json',
    };
    return this.httpClient.get<any>(
      `${environment.serverURL}/getMOU?path=${path}`,
      httpOptions
    );
  }
  checkPaymentStatus(params: any) {
    console.log(params);
    return this.httpClient.post<any>(
      `${environment.serverURL}/checkPaymentStatus`,
      params
    );
  }
  getMyOrders() {
    return this.httpClient.get<any>(
      `${environment.serverURL}/getPersonalOrders`
    );
  }
  getTrackingHistory(id: any) {
    return this.httpClient.get<any>(
      `${environment.serverURL}/getTrackingHistory?order_id=${id}`
    );
  }
  getImageByname(name: string) {
    return this.httpClient.get<any>(
      `${environment.serverURL}/getModelImage/${name}`,
      { responseType: 'blob' as 'json' }
    );
  }
  getAgreementData() {
    return this.httpClient.get<any>(
      `${environment.serverURL}/getAgreementData`
    );
  }
  getMenuCard(cartId: any) {
    return this.httpClient.get<any>(
      `${environment.serverURL}/getMenu?cartId=${cartId}`
    );
  }
  getAllCategories() {
    return this.httpClient.get<any>(
      `${environment.serverURL}/getAllCategories`
    );
  }
  getItemByCategory(categories: any) {
    return this.httpClient.get<any>(
      `${environment.serverURL}/getItemByCategory?categoryId=${categories}`
    );
  }
  getCartId() {
    return this.httpClient.get<any>(`${environment.serverURL}/getCartId`);
  }
  getOrderById(order_id: any) {
    return this.httpClient.get<any>(
      `${environment.serverURL}/getOrderById?order_id=${order_id}`
    );
  }

  getAlias(customerId: any) {
    return this.httpClient.get<any>(
      `${environment.serverURL}/getAliasData?customerId=${customerId}`
    );
  }
  getShoppingCart() {
    return this.httpClient.get<any>(`${environment.serverURL}/getShoppingCart`);
  }
  getModelNames() {
    return this.httpClient.get<any>(`${environment.serverURL}/v2/getModelNames`);
  }
  addToCartShoppingCart(payload: any) {
    console.log(payload);
    return this.httpClient.post<any>(
      `${environment.serverURL}/addToCartShoppingCart`,
      payload
    );
  }
  getFranchiseCosting() {
    return this.httpClient.get<any>(`${environment.serverURL}/getCosting`);
  }
  addToFavourites(payload: any) {
    console.log(payload);
    return this.httpClient.post<any>(
      `${environment.serverURL}/addToFavourites`,
      payload
    );
  }

  getFavourites() {
    return this.httpClient.get<any>(`${environment.serverURL}/getFavourites`);
  }
  removeFavourites(payload: any) {
    console.log(payload);
    return this.httpClient.post<any>(
      `${environment.serverURL}/removeFromFavourites`,
      payload
    );
  }
  loginCustomer(email: string, password: string) {
    return this.httpClient.post<any>(
      `${environment.serverURL}/login/customer`,
      {
        email,
        password,
      }
    );
  }
  signUpCustomer(
    title: string,
    firstName: string,
    lastName: string,
    mobile: string
  ) {
    return this.httpClient.post<any>(
      `${environment.serverURL}/register/customer`,
      {
        title,
        firstName,
        lastName,
        mobile,
      }
    );
  }
  convertToCustomer() {
    return this.httpClient.get<any>(
      `${environment.serverURL}/convertToSubscriber`
    );
  }
  getOrderDetails(orderId: any) {
    return this.httpClient.get<any>(
      `${environment.orderNowServerURL}/getOrderDetails?orderId=${orderId}`
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
  getPaymentProfile(cartId: any) {
    return this.httpClient.get<any>(
      environment.iotURL + `/getProfile?deviceId=${cartId}`
    );
  }
  pendingOrders() {
    return this.httpClient.get<any>(
      `${environment.orderNowServerURL}/pendingOrders`
    );
  }
  generateSamplePdf(orderId: string) {
    return this.httpClient.get<any>(
      `${environment.serverURL}/generateSamplePdf?orderId=${orderId}`
    );
  }
  getSamplePdf(fileName: string) {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json',
    };
    return this.httpClient.get<any>(
      `${environment.serverURL}/getSamplePdf?file=${fileName}`,
      httpOptions
    );
  }
  deleteSamplePdf(fileName: string) {
    return this.httpClient.get<any>(
      `${environment.serverURL}/deleteSamplePdf?file=${fileName}`
    );
  }

  setPendingOrderNumber(pendingOrder: number) {
    this.bs.next(pendingOrder);
  }

  clearPendingOrder() {
    this.bs.next(0);
  }

  getPendingOrder(): any {
    return this.bs.asObservable();
  }

  getUserProfile(cartId: any) {
    return this.httpClient.get<any>(`${environment.serverURL}/getCartProfile`, {
      params: { cartId: cartId },
    });
  }
  createZohoContact(payload: any) {
    return this.httpClient.post<any>(
      `${environment.serverURL}/createZohoContact`,
      payload
    );
  }

  getAdvanceValue(id: any) {
    return this.httpClient.get<any>(
      `${environment.serverURL}/getModelById?uid=${id}`
    );
  }

  getAppPrice(payload: any) {
    const params = new HttpParams()
      .append('modelType', payload.modelType)
      .append('modelName', payload.modelName)
      .append('extension', payload.extension)
      .append('purchaseType', payload.purchaseType);

    return this.httpClient.get<any>(`${environment.serverURL}/getAppPrice`, {
      params: params,
    });
  }


  getAssociatedMessage(prms: any) {
    const params = new HttpParams()
      .append('franchiseType', prms.franchiseType)
      .append('state', prms.state)
      .append('town', prms.town)
      .append('franchiseCategory', prms.franchiseCategory);

    return this.httpClient.get<any>(`${environment.serverURL}/v2/associatedMessage`, {
      params: params,
    });
  }

  getPricing_condition1(prms: any) {
    const params = new HttpParams()    
      .append('franchiseType', prms.franchiseType)
      .append('modelName', prms.modelName)
      .append('extension', prms.extension)
      .append('purchaseType', prms.purchaseType);

    return this.httpClient.get<any>(`${environment.serverURL}/v2/getPricing`, {
      params: params,
    });
  }

  getPricing_condition2(prms: any) {
    const params = new HttpParams()
      .append('franchiseType', prms.franchiseType)
      .append('franchiseCategory', prms.franchiseCategory);

    return this.httpClient.get<any>(`${environment.serverURL}/v2/getPricing`, {
      params: params,
    });
  }

  getCandidateForms() {
    return this.httpClient.get<any>(`${environment.serverURL}/v2/getCandidateForms`);
  }

}
