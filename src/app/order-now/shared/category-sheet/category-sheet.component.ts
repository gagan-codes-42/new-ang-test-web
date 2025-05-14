import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-category-sheet',
  templateUrl: './category-sheet.component.html',
  styleUrls: ['./category-sheet.component.scss']
})
export class CategorySheetComponent implements OnInit {
  tempData:any=[];

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,private _bottomSheetRef: MatBottomSheetRef<CategorySheetComponent>) {
    this.tempData=JSON.parse(JSON.stringify(this.data));
  }
  
  ngOnInit(): void {}
  
  setCategory(category :any){
    this._bottomSheetRef.dismiss(category);
  }
  searchCategory(search  :any){
    if(search==="") this.tempData=JSON.parse(JSON.stringify(this.data));
    else{
      this.tempData=[];
      this.data.forEach((category:any)=>{
        if(category.name.toLowerCase().includes(search.toLowerCase()))
          this.tempData.push(category);
      })
    }
  }
}