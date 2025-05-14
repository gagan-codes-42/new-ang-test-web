import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { SimpleModalService } from 'ngx-simple-modal';
import { StoreDetailsComponent } from '../store-details/store-details.component';
@Component({
  selector: 'app-india-map',
  templateUrl: './india-map.component.html',
  styleUrls: ['./india-map.component.scss']
})
export class IndiaMapComponent implements OnInit {
  title = "map1";
  tooltip!: string;
  operatingState=['Uttar Pradesh','Odisha', 'Assam', 'Haryana'];
  storeLocations :any= [
    { state:'Odisha', storeDetails:  [ { City:'Bhubaneswar', locations:['Patia','Barmunda']}]},
    { state:'Uttar Pradesh', storeDetails:  [ { City:'Uttar Pradesh', locations:['Noida', 'Varanasi']}]},
    { state:'Assam', storeDetails:  [ { City:'Tripura', locations:['Jay Nagar']}]},
    { state:'Haryana', storeDetails:  [ { City:'Bhiwani', locations:['Bhiwani']}]}
  ]
  constructor(private http: HttpClient, private router: Router , private modalSvc:SimpleModalService) {}
  ngOnInit(): void {

  }

  onClick(value:any) {
    console.log(value);
    var state = value.split(" ").join("");
    if(this.operatingState.includes(value)) {
      const details = this.storeLocations.filter((r:any)=> r.state === value);
      this.openSimpleModal(value,details);
    }
    
  }

  over_state(value:any) {
    this.tooltip = value;
  }

  out_state(value:any) {
    this.tooltip = "";
    console.log(value);
  }

  openSimpleModal(value:any ,obj:any) {
    this.modalSvc.addModal(
      StoreDetailsComponent,
      {
        title: 'Store details',
        state: value,
        details: obj,
        message: 'Coming Soon !!!',
      },
      {
        closeOnEscape: true,
        closeOnClickOutside: true,
      }
    );
  }

}
