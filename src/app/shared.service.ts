import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VideoDetailsComponent } from './components/pages/video-details/video-details.component';
export interface StateAndCities {
  [stateName: string]: string[];
}
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  statesJsonPath = 'assets/json/statesAndCities.json';
  modelDataPath = 'assets/json/modelData.json';
  private sidebarOpen = false;
  private sidebarOpen1 = false;
  private sidebarOpen2 = false;

  private _hideOfferNotificationPopup = false;

  constructor(
    private readonly http: HttpClient,
    private modalSvc: SimpleModalService
  ) {}

  getCitiesAndStates(): Observable<StateAndCities> {
    return this.http.get<StateAndCities>(this.statesJsonPath);
  }

  getVideoRoomCreated(payload: any) {
    return this.http.post<any>(
      environment.serverURL + '/startMeeting',
      payload
    ); //mobile:'', email:''
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  getSideBarStatus() {
    return this.sidebarOpen;
  }
  toggleSidebar1() {
    this.sidebarOpen1 = !this.sidebarOpen1;
  }

  closeSidebar1() {
    this.sidebarOpen1 = false;
  }

  getSideBarStatus1() {
    return this.sidebarOpen1;
  }

  toggleSidebar2() {
    this.sidebarOpen2 = !this.sidebarOpen2;
  }

  closeSidebar2() {
    this.sidebarOpen2 = false;
  }

  getSideBarStatus2() {
    return this.sidebarOpen2;
  }

  openDetailsPage() {
    this.modalSvc.addModal(
      VideoDetailsComponent,
      {
        title: 'Start Video Call',
        message: 'Coming Soon !!!',
      },
      {
        closeOnEscape: true,
        closeOnClickOutside: true,
      }
    );
  }
  getModelData(): Observable<any> {
    return this.http.get<any>(this.modelDataPath);
  }

  get hideOfferNotificationPopup() {
    return this._hideOfferNotificationPopup;
  }

  set hideOfferNotificationPopup(value: boolean) {
    this._hideOfferNotificationPopup = value;
  }
}
