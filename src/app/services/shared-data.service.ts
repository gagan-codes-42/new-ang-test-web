import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
interface Iobj {
  price:any;
  uid:any
} 

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private _modelObj!: Iobj;
  private _orderId :any; 
  private _selectedModel: any;
  private _output : any;
  private _trackingItem :any;
  AggrementData: Subject<string> = new Subject();
  constructor() {}
  get modelObj(): any {
    return this._modelObj;
  }

  set modelObj(val: any) {
    this._modelObj = val;
  }
  get orderId(){
    return this._orderId ;
  }
  set orderId(val:any){
    this._orderId = val;
  }
  get output(){
    return this._output ;
  }
  set output(val:any){
    this._output = val ;
  }
  get trackingItem(){
    return this._trackingItem ;
  }
  set trackingItem(val:any){
    this._trackingItem = val ;
  }
  get selectedModel(){
    return this._selectedModel ;
  }
  set selectedModel(val:any){
    this._selectedModel = val ;
  }
}
