import { Component, OnInit, ViewChild } from '@angular/core';
import {
  faCaretDown,
  faCaretUp,
  faCheckCircle,
  faFileDownload,
  faFolder,
  faHeart,
  faMale,
  faPiggyBank,
  faPlayCircle,
  faProjectDiagram,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { SimpleModalService } from 'ngx-simple-modal';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ModalComponent } from '../../modal/modal.component';
import { PitchModalComponent } from './pitch-modal.component';
import { Role } from 'src/app/shared/appConstant.constant';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { FbAuthService } from 'src/app/shared/services/auth.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  @ViewChild('orderNowModal', { static: false }) orderNowModal!: ModalComponent;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;
  faFileDownload = faFileDownload;
  faPlayCircle = faPlayCircle;
  faHeart = faHeart;
  faMale = faMale;
  faPiggyBank = faPiggyBank;
  faFolder = faFolder;
  faCheckCircle = faCheckCircle;
  faThumbsUp = faThumbsUp;
  faProjectDiagram = faProjectDiagram;
  title = 'Details';
  messages!: string[];
  isContentOpen = false;
  roles: string[] = [];

  @ViewChild('ApprovalProcessModal', { static: false })
  approvalProcessModal!: ModalComponent;
  @ViewChild('AdvantageModal', { static: false })
  advantageModal!: ModalComponent;

  favUID = 0;
  accordionItem: {
    heading: string;
    content: {
      uid: number;
      subHeading: string;
      subContent: string;
    }[];
  }[] = [
    {
      heading: 'Table Top',
      content: [
        {
          uid: 1,
          subHeading: '3 nozzle',
          subContent:
            'A premium finish, IOT enabled device capable of dispensing 3 different flavours at a time.',
        },

        {
          uid: 2,
          subHeading: '2 nozzle',
          subContent:
            'One of a kind product, IOT enabled, capable of dispensing two different flavours at a time.',
        },
        {
          uid: 3,
          subHeading: '1 nozzle',
          subContent: 'Plug and play extension for every street vendor.',
        },
      ],
    },
    // ,
    // {
    //   heading: 'Kiosk',
    //   content: [
    //     { uid: 6, subHeading: '1 nozzle', subContent: '' },
    //     { uid: 5, subHeading: '2 nozzles', subContent: '' },
    //     { uid: 4, subHeading: '3 nozzles', subContent: '' },
    //   ],
    // },
    // {
    //   heading: 'Cart',
    //   content: [
    //     { uid: 9, subHeading: '1 nozzle', subContent: '' },
    //     { uid: 8, subHeading: '2 nozzles', subContent: '' },
    //     { uid: 7, subHeading: '3 nozzles', subContent: '' },
    //   ],
    // },
    // {
    //   heading: 'E Cart',
    //   content: [
    //     { uid: 12, subHeading: '1 nozzle', subContent: '' },
    //     {
    //       uid: 11,
    //       subHeading: '2 nozzles',
    //       subContent: '',
    //     },
    //     {
    //       uid: 10,
    //       subHeading: '3 nozzles',
    //       subContent: '',
    //     },
    //   ],
    // },
    {
      heading: 'Dispenser',
      content: [
        {
          uid: 11,
          subHeading: '2 nozzle',
          subContent:
            'One of a kind product, IOT enabled, capable of dispensing two different flavours at a time.',
        },
      ],
    },
  ];

  accordionItemMaster: any = [
    {
      heading: 'State Franchise',
      content: [
        { subHeading: '1 nozzle', subContent: '' },
        { subHeading: '2 nozzles', subContent: '' },
        { subHeading: '3 nozzles', subContent: '' },
      ],
    },
    {
      heading: 'Town Franchise',
      content: [
        { subHeading: '1 nozzle', subContent: '' },
        { subHeading: '2 nozzles', subContent: '' },
        { subHeading: '3 nozzles', subContent: '' },
      ],
    },
    {
      heading: 'Master Kitchen',
      content: [
        { subHeading: '1 nozzle', subContent: '' },
        { subHeading: '2 nozzles', subContent: '' },
        { subHeading: '3 nozzles', subContent: '' },
      ],
    },
  ];

  constructor(
    private modalSvc: SimpleModalService,
    private authService: AuthService,
    public sharedSvc: SharedService,
    private toastSvc: ToastService,
    private fbAuthService: FbAuthService,
    private router: Router,
    private sharedDataService: SharedDataService,

  ) {}

  ngOnInit(): void {
    this.getData();
    this.roles = this.fbAuthService.userData?.roles;
  }

  getData() {
    let favouriteData = this.authService.getFavourites();
    favouriteData.subscribe((res: { models: number[] }) => {
      this.favUID = res.models.length > 0 ? res.models[0] : 0;
    });
  }

  sendEstimates(item: any) {
    this.favUID = item.uid;
    this.authService
      .addToFavourites({ uid: item.uid })
      .subscribe((res: any) => {
        console.log(res);
        // this.toastSvc.showSuccessToast(
        //   'Success',
        //   'Succesfully added to favourite'
        // );
      });
  }

  showApprovalDialog() {
    this.approvalProcessModal.showModal();
  }

  showAdvantageDialog() {
    this.advantageModal.showModal();
  }

  navigateTo(ele: any, item: any) {
    
    if (this.roles?.length) {
      if (this.roles.includes(Role.PAID_SUBSCRIBER)) {
        this.router.navigate(['/upload']);
      } else if (this.roles.includes(Role.IN_REVIEW)) {
        this.router.navigate(['/under-review']);
      } else if (this.roles.includes(Role.FORM_ACCEPTED)) {
        this.router.navigate(['/form-accepted']);
      } else {
        this.sharedDataService.selectedModel = {
          ele,
          item
        };
        this.router.navigate(['register-partner']);
      }
    }
  }

  openPitch() {
    // this.modalSvc.addModal(
    //   PitchModalComponent,
    //   {
    //     title: this.title,
    //     message: '',
    //   },
    //   {
    //     closeOnEscape: true,
    //     closeOnClickOutside: true,
    //   }
    // );
    this.router.navigate(['/model-details'])
  }
  createVideoRoom() {
    this.sharedSvc.openDetailsPage();
  }
}
