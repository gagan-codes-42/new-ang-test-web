import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  faArrowRight,
  faCheckCircle,
  faCreditCard,
  faFileInvoice,
  faHeart,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../shared/services/toast.service';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-approval-process',
  templateUrl: './approval-process.component.html',
  styleUrls: ['./approval-process.component.scss'],
})
export class ApprovalProcessComponent implements OnInit {
  isSelected = '1';
  defaultImage = 'assets/img/no-image-available.png';
  faHeart = faHeart;
  isSelectedClass = 'is-inActive';
  isToggle = false;
  title = 'Approval Process';
  faArrowRight = faArrowRight;
  faFolder = faFileInvoice;
  faPiggyBank = faCreditCard;
  faMale = faUserCircle;
  faCheckCircle = faCheckCircle;
  alldata: any = [];
  allCostData: any = [];
  allFaviorateData: any = [];
  franchiseeData: any = [];
  masterData: any = [];
  isImageLoading = true;
  @ViewChild('ApprovalProcessModal', { static: false })
  approvalProcessModal!: ModalComponent;
  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastSvc: ToastService
  ) {}

  ngOnInit(): void {
    this.getAllData();
  }

  selectTab(index: string) {
    this.isSelected = index;
  }
  sendEstimates(item: any) {
    item.isFavourite = !item.isFavourite;
    if (item.isFavourite) {
      this.authService
        .addToFavourites({ uid: item.uid })
        .subscribe((res: any) => {
          console.log(res);
          this.toastSvc.showSuccessToast(
            'Success',
            'Succesfully added to favourite'
          );
        });
    } else {
      this.authService
        .removeFavourites({ uid: item.uid })
        .subscribe((res: any) => {
          console.log(res);
          this.toastSvc.showSuccessToast(
            'Success',
            'Succesfully removed from favourite'
          );
        });
    }
  }
  showApprovalDialog() {
    this.approvalProcessModal.showModal();
  }

  getAllData() {
    let costingData = this.authService.getFranchiseCosting();
    let favouriteData = this.authService.getFavourites();
    this.spinner.show();
    forkJoin([costingData, favouriteData]).subscribe(
      (res) => {
        try {
          console.log(res);
          this.allCostData = res[0].items;
          this.allFaviorateData = res[1].models;
          this.buildDataForTabs();
        } catch (err) {
          this.spinner.hide();
        }
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  buildDataForTabs() {
    this.allCostData = this.allCostData.map((e: any, index: number) => {
      e['isFavourite'] = false;
      e['imgSrc'] = '';
      let item = this.allFaviorateData.filter((v: any) => {
        return v === e.uid;
      });
      if (e.model_image) {
        this.getImageByName(e.model_image, e);
      }
      if (item && item.length) {
        e['isFavourite'] = true;
      }
      return e;
    });

    this.franchiseeData = this.allCostData.filter((e: any) => {
      return e.modelType === 1;
    });

    this.masterData = this.allCostData.filter((e: any) => {
      return e.modelType === 2;
    });

    console.log(this.franchiseeData);
    console.log(this.masterData);
    this.spinner.hide();
  }
  getImageByName(image: any, item: any) {
    this.authService.getImageByname(image).subscribe(
      (res) => {
        console.log(res);
        if (res) {
          this.createImageFromBlob(res, item);
          this.isImageLoading = false;
        }
      },
      (err) => {
        console.log(err);
        this.isImageLoading = false;
      }
    );
  }
  createImageFromBlob(image: Blob, item: any) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        item.imgSrc = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
