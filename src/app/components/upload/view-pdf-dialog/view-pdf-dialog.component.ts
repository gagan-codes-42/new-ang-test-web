import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-view-pdf-dialog',
  templateUrl: './view-pdf-dialog.component.html',
  styleUrls: ['./view-pdf-dialog.component.scss']
})
export class ViewPdfDialogComponent implements OnInit {
pdfSrc="";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.pdfSrc=this.data.pdfSrc;
  }

  

}
