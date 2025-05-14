import { Component, OnInit } from '@angular/core';
import { AuthService }  from '../../services/auth.service';
import { SharedDataService }  from '../../services/shared-data.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SharedService } from 'src/app/shared.service';
import { ToastService } from 'src/app/shared/services/toast.service';
@Component({
  selector: 'app-track-history',
  templateUrl: './track-history.component.html',
  styleUrls: ['./track-history.component.scss']
})
export class TrackHistoryComponent implements OnInit {
 
  trackingOrderId : any;
  trackHistory : any [] = []; 
  currentState:any;
  completedState :any = [];
  imageToShow :any;
  isImageLoading = true;
  constructor(private authService : AuthService, private sharedDataService : SharedDataService ,
     private router:Router , private datePipe : DatePipe , public sharedSvc: SharedService, private toastSvc: ToastService,) { }

  ngOnInit(): void {
    this.trackingOrderId = this.sharedDataService.trackingItem;
    if(this.trackingOrderId && this.trackingOrderId.order_id){
      if(this.trackingOrderId.deliveryDate){
        this.trackingOrderId.deliveryDate  = new Date(this.trackingOrderId.deliveryDate);
      }
      this.currentState =this.trackingOrderId;
      this.trackMyOrder(this.trackingOrderId.order_id);
      this.getImageByName(this.trackingOrderId.model_image);
    }else {
      this.router.navigate(['dashboard/order']);
    }
    
  }

  trackMyOrder(id:any){
  
    this.authService.getTrackingHistory(id).subscribe((res)=>{
      this.trackHistory = res;
      if(this.trackHistory.length){
      this.completedState =  this.trackHistory.map((ele)=> ele.status);
      this.completedState = [...new Set(this.completedState)];
      // this.currentState =  this.trackHistory[0]; 
      }

    })
  }
  getDate(status :any):any{
    let history :any[] = [];
       history = this.trackHistory.filter((e)=> e.status === status);
      if(history.length) {
          let dte = history[0].date;
          return dte ? this.datePipe.transform(new Date(dte), 'MMM d, y') : ''
      }
  }
  getImageByName(image: any ){
    this.authService.getImageByname(image).subscribe((res)=> {
      console.log(res);
      if(res){
      this.createImageFromBlob(res);
      this.isImageLoading = false;
      }
    },(err) =>{
      console.log(err);
      this.isImageLoading = false;
    })
  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }
 inspectNow(){
  this.sharedSvc.openDetailsPage();
 }

}
