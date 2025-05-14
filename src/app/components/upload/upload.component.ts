import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faArrowLeft,
  faCheckCircle,
  faFileUpload,
} from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { FbAuthService } from 'src/app/shared/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthService } from '../../services/auth.service';
import { SharedDataService } from '../../services/shared-data.service';
import { Appconstants } from '../../shared/appConstant.constant';
import { MatDialog } from '@angular/material/dialog';
import { ViewPdfDialogComponent } from './view-pdf-dialog/view-pdf-dialog.component';
declare const $: any;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  selectedPANFiles?: FileList;
  selectedPhotoFiles?: FileList;
  selectedAdharFiles?: FileList;
  progress = 0;
  currentFile?: File;
  message = '';
  faFileUpload = faFileUpload;
  fileNamePan: any = '';
  fileNamePhotograph: any = '';
  fileNameAdhar: any = '';
  docFormGroup!: FormGroup;
  faCheckCircle = faCheckCircle;
  signUploadFlag = false;
  adharUploadFlag = false;
  photoUploadFlag = false;
  progressInfos: any = [];
  orderId: any;
  faArrowLeft = faArrowLeft;
  
  pdfFileName:string="";
  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private sharedDataService: SharedDataService,
    private router: Router,
    private fbAuth: FbAuthService,
    private matDialog:MatDialog
  ) {}

  ngOnInit(): void {
    this.docFormGroup = this.fb.group({
      paninput: [''],
      photoinput: ['', Validators.required],
      adharinput: ['', Validators.required],
    });
    this.getOrderId();
  }
  // tracking file change event
  async selectFile(e: any, fileType: string) {
    console.log(e);
    if (e.target.files.length) {
      this.setFiles(fileType, e);
    } else {
      // clearfiles from variables
      this.clearFiles(fileType);
    }
  }

  async checkDimensions(file: any, fileType: string) {
    var self = this;
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const height = img.naturalHeight;
          const width = img.naturalWidth;
          console.log('Width and Height respectively', width, height);
          //after that right an if condition to check dimensions based on fileType as different file types
          //will have different thresholds
          //you may return boolean based on that
          const resolvedValue = self.isvalidDimensions(width, height, fileType);
          resolve(resolvedValue);
        };
      };
    });
  }
  /** function to upload
   *  @param { any }  fileArray
   *  @param { any }  orderId
   */
  upload(fileArray: any, orderId: any) {
    this.spinner.show();
    if (fileArray.length) {
      this.authService.upload(fileArray, orderId).subscribe(
        async (res: any) => {
          if (res && res.message) {
            if(this.pdfFileName!=null && this.pdfFileName!="")
            {
              this.deleteSamplePdf(this.pdfFileName);
            }
            this.spinner.hide();
            this.sharedDataService.output = res.output;
            const updated = await this.fbAuth.InitApp();
            if (updated) {
              this.router.navigate(['/order-confirm']);
            }
          }
        },
        (err: any) => {
          console.log(err);
          this.spinner.hide();
        }
      );
    }
  }
  viewSample() {
    // let sampleAPI = 'http://15.207.147.88:8081/download-sample-pdf';
    // window.open(sampleAPI, '_blank');
    // window.close();
    //generateSamplePdf
  }

  confirmDoc() {
    let fileArray: any[] = [];
    if (this.docFormGroup.valid) {
      if (this.selectedPANFiles) {
        fileArray.push({
          file: this.selectedPANFiles,
          type: 'pan',
        });
      }
      fileArray = [
        ...fileArray,
        { file: this.selectedPhotoFiles, type: 'photo' },
        { file: this.selectedAdharFiles, type: 'aadhar' },
      ];
      this.upload(fileArray, this.orderId);
    }
  }

  clearFiles(fileType: string) {
    if (fileType === 'PAN') {
      this.selectedPANFiles = undefined;
      this.fileNamePan = '';
      this.docFormGroup.controls.paninput.setValue(this.fileNamePan);
    } else if (fileType === 'Photograph') {
      this.selectedPhotoFiles = undefined;
      this.fileNamePhotograph = '';
      this.docFormGroup.controls.photoinput.setValue(this.fileNamePhotograph);
    } else if (fileType === 'Adhar') {
      this.selectedAdharFiles = undefined;
      this.fileNameAdhar = '';
      this.docFormGroup.controls.adharinput.setValue(this.fileNameAdhar);
    }
  }
  setFiles(fileType: string, e: any) {
    if (fileType === 'PAN') {
      this.selectedPANFiles = e.target.files;
      this.readURL(e.target.files, 'PAN');
      this.fileNamePan = e.target.files[0].name;
      this.docFormGroup.controls.paninput.setValue(this.fileNamePan);
    } else if (fileType === 'Photograph') {
      this.selectedPhotoFiles = e.target.files;
      this.readURL(e.target.files, 'Photograph');
      this.fileNamePhotograph = e.target.files[0].name;
      this.docFormGroup.controls.photoinput.setValue(this.fileNamePhotograph);
    } else if (fileType === 'Adhar') {
      this.selectedAdharFiles = e.target.files;
      this.readURL(e.target.files, 'Adhar');
      this.fileNameAdhar = e.target.files[0].name;
      this.docFormGroup.controls.adharinput.setValue(this.fileNameAdhar);
    }
  }
  isvalidDimensions(w: any, h: any, fileType: any): object {
    if (fileType === 'PAN') {
      return w < Appconstants.SignatureWidth && h < Appconstants.Signatureheight
        ? { isvalid: true, errorfiletype: null, errorMsg: null }
        : {
            isvalid: false,
            errorfiletype: 'PAN',
            errorMsg: `PAN file dimension should be ${Appconstants.SignatureWidth}* ${Appconstants.Signatureheight}`,
          };
    } else if (fileType === 'Photograph') {
      return w < Appconstants.PhotographWidth &&
        h < Appconstants.Photographheight
        ? { isvalid: true, errorfiletype: null, errorMsg: null }
        : {
            isvalid: false,
            errorfiletype: 'Photograph',
            errorMsg: `Photograph file dimension should be ${Appconstants.PhotographWidth}* ${Appconstants.Photographheight}`,
          };
    } else if (fileType === 'Adhar') {
      return w < Appconstants.AdharWidth && h < Appconstants.Adharheight
        ? { isvalid: true, errorfiletype: null, errorMsg: null }
        : {
            isvalid: false,
            errorfiletype: 'Adhar',
            errorMsg: `Adhar file dimension should be ${Appconstants.AdharWidth}* ${Appconstants.Adharheight}`,
          };
    }
    return { isvalid: false, errorfiletype: null, errorMsg: null };
  }
  showerrorMsg(obj: any) {
    if (obj && !obj.isvalid) {
      this.toastService.showErrorToast('Error', `${obj.errorMsg}`);
    }
  }
  getOrderId() {
    this.authService.getOrderId().subscribe(
      (res) => {
        console.log(res);
        if (res) {
          this.orderId = res.order_id;
          this.sharedDataService.orderId = this.orderId;
        }
      },
      (err) => {
        this.toastService.showErrorToast('Error', 'Something Went wrong');
      }
    );
  }
  backtoLanding() {
    this.router.navigate(['/landing']);
  }
  readURL(input: any, fileType: string) {
    if (input[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(input[0]);
      reader.onload = () => {
        $(`#${fileType}`).attr('src', reader.result);
      };
    }
  }

  generateSamplePdf() {
    this.spinner.show();
    this.authService.generateSamplePdf(this.orderId).subscribe(
      (res) => {
        this.spinner.hide();
        console.log(res);
        this.pdfFileName=res.result;
        this.getSamplePdf(res.result);
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }
  getSamplePdf(fileName:string) {
    this.spinner.show();
      this.authService.getSamplePdf(fileName).subscribe(
        (res) => {
          this.spinner.hide();
          console.log("fileResult",res);
          this.matDialog.open(ViewPdfDialogComponent, {
            data: { pdfSrc:res },
            maxWidth: '90vw',
            height: '90vh',
            disableClose: true
          });
        },
        (error) => {
          this.spinner.hide();
          console.log(error);
        }
      );
    }

    deleteSamplePdf(fileName:string) {
      //  this.loading = true;
        this.authService.deleteSamplePdf(fileName).subscribe(
          (res) => {
            console.log("deleteResult",res);
          },
          (error) => {
            console.log(error);
          }
        );
      }
}
