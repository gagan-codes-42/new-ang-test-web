import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  path : any ;
  pdfSrc :any;
  constructor(private sharedDataService : SharedDataService , private router : Router , private authService : AuthService ,
    private toastService : ToastService) { }

  ngOnInit(): void {
    this.path = this.sharedDataService.output;
    this.fetchpdf(this.path);
  }
  backtoLanding(){
    this.router.navigate(['/landing']);
  }
  fetchpdf(path : any ){

    this.authService.getMOU(path).subscribe((res)=>{
        if(res){
          this.pdfSrc = res;
        }
    },(err)=>{
      this.toastService.showErrorToast('Error','Something Went wrong!');
    })

  }

}
