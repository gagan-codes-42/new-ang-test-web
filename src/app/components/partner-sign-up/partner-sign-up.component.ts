import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faFileUpload, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService, StateAndCities } from 'src/app/shared.service';
import { FbAuthService } from 'src/app/shared/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SharedDataService } from '../../services/shared-data.service';
import { ModalComponent } from '../modal/modal.component';
import Swal from 'sweetalert2';

declare const $: any;

interface KitchenDetails {
  [franchiseType: number]: {
    name: string;
    subTypes: {
      [modelName: string]: {
        [extension: string]: {
          price: number;
          uid: number;
          subscriptionPrice: number;
          advance: number;
          appPrice: number;
        };
      };
    };
  };
}

interface franchiseMaster {
  id: number;
  name: string;
}

@Component({
  selector: 'app-partner-sign-up',
  templateUrl: './partner-sign-up.component.html',
  styleUrls: ['./partner-sign-up.component.scss'],
})
export class PartnerSignUpComponent implements OnInit {
  //extraAmount = 0;
  notes: string = '';
  partnerSignUpForm!: FormGroup;
  statesAndCities$!: Observable<StateAndCities>;
  modelDetails: any = [];
  faInfoCircle = faInfoCircle;
  accordionItem = [
    {
      heading: 'heading',
      content: '...some content',
    },
    {
      heading: 'heading',
      content: '...some content',
    },
    {
      heading: 'heading',
      content: '...some content',
    },
  ];

  @ViewChild('tncModal', { static: false }) tncModal!: ModalComponent;
  @ViewChild('infoModal', { static: false }) infoModal!: ModalComponent;

  // kitchenDetails: KitchenDetails = {
  //   1: { name: 'Unit Franchise', subTypes: {} },
  //   2: { name: 'Master Franchise', subTypes: {} }, // currently not showing in html side
  //   3: { name: 'Multi Unit Franchise', subTypes: {} },
  // };

  kitchenDetails: KitchenDetails = {
    1: { name: 'State Franchise', subTypes: {} },
    2: { name: 'Master Franchise', subTypes: {} }, // currently not showing in html side
    3: { name: 'Town Franchise', subTypes: {} },
  };

  favUID: number = 0;
  franchiseModelType = 1;

  selectedAdharFiles?: FileList;
  faFileUpload = faFileUpload;
  fileNameAadhar: any = '';
  modelData: any = [];
  extension: any = [];
  enableSubmitBtn: boolean = false;
  upload_adhrDocFiles: boolean = false;

  constructor(
    private fb: FormBuilder,
    private readonly sharedService: SharedService,
    private readonly fbAuthSvc: FbAuthService,
    private router: Router,
    private authSvc: AuthService,
    private toastSvc: ToastService,
    private sharedDataService: SharedDataService,
    public matDlg: MatDialog,
    private NgxSpinner: NgxSpinnerService
  ) {}

  cities!: string[];
  immediateUnitsChange = () => {
    this.partnerSignUpForm.controls['unitsInNxtYr'].setValidators([
      Validators.min(
        this.partnerSignUpForm.controls['immediateUnits'].value * 12
      ),
      Validators.required,
    ]);
  };
  // billingTypes = [
  //   { label: 'Without Billing', value: false },
  //   { label: 'With Billing', value: true },
  // ];
  entityTypes = [
    { label: 'Unregistered ', value: 'business_unregistered' },
    { label: 'Registered ', value: 'business_registered_regular' },
  ];

  purchaseTypes: any;
  defaultPurchaseTypeIndex = 0;
  modelType: any;

  lst_franchiseMastr: franchiseMaster[] = [
    { id: 1, name: 'Franchise' },
    { id: 2, name: 'Master Franchise' },
  ];

  ngOnInit(): void {
    this.partnerSignUpForm = this.fb.group({
      title: ['', [Validators.required]],
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z\\s]+'),
          Validators.maxLength(15),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z\\s]+'),
          Validators.maxLength(15),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.max(9999999999),
          Validators.min(1000000000),
        ],
      ],
      address: ['', [Validators.required]],
      town: ['', [Validators.required]],
      pincode: [
        '',
        [Validators.required, Validators.max(999999), Validators.min(100000)],
      ],

      shipngAdrsSameAsBilngAdrs: [true],
      shipngAddress: ['', [Validators.required]],
      shipngPincode: [
        '',
        [Validators.required, Validators.max(999999), Validators.min(100000)],
      ],
      aadhar_docs: [''],
      franchiseMastrId: ['1', [Validators.required]],
      // operation_state: ['', [Validators.required]],
      // operation_city: ['', [Validators.required]],

      state: ['', [Validators.required]],
      termsAndConditions: [false, [Validators.requiredTrue]],
      extension: [''],
      price: ['', [Validators.required]],
      //appPrice: ['500/unit/month', [Validators.required]],
      appPrice: ['', [Validators.required]],
      // uid: ['', [Validators.required]],
      // aadhar: ['', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]],

      gst_no: [
        '',
        // [
        //   Validators.required,
        //   Validators.pattern(
        //     /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
        //   ),
        // ],
      ],
      tradeName: [''],
      brand: ['E-Panipurii Kartz', [Validators.required]],

      //franchiseType: [1, [Validators.required]],
      franchiseType: ['', [Validators.required]],

      immediateUnits: [
        1,
        // [
        //   Validators.min(1),
        //   Validators.required,
        //   Validators.pattern(/^[1-9]\d*$/),
        // ],
      ],
      unitsInNxtYr: [12, [Validators.required, Validators.min(12)]],
      // billingRequired: [false],
      //purchaseRequired: [2, [Validators.required]],
      purchaseRequired: ['', [Validators.required]],
      modelName: [''],
      // location: ['', Validators.required],
      gst_treatment: [''],
    });
    // this.partnerSignUpForm.controls.town.disable();
    this.partnerSignUpForm.controls.price.disable();
    this.partnerSignUpForm.controls.appPrice.disable();
    this.statesAndCities$ = this.sharedService.getCitiesAndStates();
    this.partnerSignUpForm.get('brand')?.disable();
    // this.partnerSignUpForm.get('billingRequired')?.disable();
    // this.partnerSignUpForm.get('purchaseRequired')?.disable();
    // this.testPatch(obj);
    if (this.fbAuthSvc.userData) {
      this.partnerSignUpForm.patchValue({
        ...this.fbAuthSvc.userData,
      });
      this.partnerSignUpForm.get('title')?.disable();
      this.partnerSignUpForm.get('firstName')?.disable();
      this.partnerSignUpForm.get('lastName')?.disable();
      this.partnerSignUpForm.get('email')?.disable();
      this.partnerSignUpForm.get('mobile')?.disable();
    } else {
      this.router.navigate(['login']);
    }
    this.partnerSignUpForm
      .get('franchiseType')
      ?.valueChanges.subscribe((change) => {
        if (change === '1' || change === '3') {
          this.notes = '';
          // this.partnerSignUpForm
          //   .get('purchaseRequired')
          //   ?.disable({ emitEvent: false });

          if (change === '1') {
            //cleare validation
            this.partnerSignUpForm.controls['immediateUnits'].clearValidators();
            this.partnerSignUpForm.controls['unitsInNxtYr'].clearValidators();

            var _lastValue = this.partnerSignUpForm.get('town')?.value;
            if (_lastValue != null && _lastValue != undefined) {
              if (!Array.isArray(_lastValue)) {
                //only first time will call this
                this.partnerSignUpForm.get('town')?.setValue(_lastValue);
              } else {
                this.partnerSignUpForm.get('town')?.setValue('');
              }
            }
            // this.partnerSignUpForm.controls['town'].setValidators([
            //   Validators.required,
            // ]);
            this.partnerSignUpForm.controls['town'].clearValidators();
            this.partnerSignUpForm.controls[
              'purchaseRequired'
            ].clearValidators();
            this.partnerSignUpForm.get('location')?.enable();
            // this.partnerSignUpForm.controls['extension'].setValidators([
            //   Validators.required,
            // ]);
            // this.partnerSignUpForm.controls[
            //   'extension'
            // ].updateValueAndValidity();
          } else if (change === '3') {
            this.partnerSignUpForm.controls['immediateUnits'].setValidators([
              Validators.min(1),
              Validators.required,
              Validators.pattern(/^[1-9]\d*$/),
            ]);
            this.partnerSignUpForm.controls['unitsInNxtYr'].setValidators([
              Validators.min(
                this.partnerSignUpForm.controls['immediateUnits'].value * 12
              ),
              Validators.required,
            ]);
            this.partnerSignUpForm.get('location')?.setValue('');
            this.partnerSignUpForm.get('location')?.disable();

            this.partnerSignUpForm.get('town')?.setValue([]);
            this.partnerSignUpForm.controls['town'].setValidators([
              Validators.required,
            ]);
          }

          this.partnerSignUpForm.controls[
            'immediateUnits'
          ].updateValueAndValidity();
          this.partnerSignUpForm.controls[
            'unitsInNxtYr'
          ].updateValueAndValidity();
        } else {
          this.notes = '';
          this.partnerSignUpForm
            .get('purchaseRequired')
            ?.setValue(null, { emitEvent: false });
          // this.partnerSignUpForm
          //   .get('purchaseRequired')
          //   ?.disable({ emitEvent: false });
          // this.extraAmount = 0;
        }
        this.partnerSignUpForm.get('modelName')?.setValue('');
        this.partnerSignUpForm.get('extension')?.setValue('');
      });

    // this.partnerSignUpForm  // rrc commented
    //   .get('purchaseRequired')
    //   ?.valueChanges.subscribe((change) => {
    //     if (change == '1') {
    //       this.notes = 'Sale note...';
    //       this.partnerSignUpForm.get('appPrice')?.setValue('100/unit/month');
    //     } else if (change == '2') {
    //       this.notes = 'Subscription note...';
    //       this.partnerSignUpForm.get('appPrice')?.setValue('500/unit/month');
    //     }
    //     // if (change === 'true') {
    //     //   this.extraAmount = 500;
    //     // } else {
    //     //   this.extraAmount = 0;
    //     // }
    //     if (this.partnerSignUpForm.get('price')?.value) {
    //       const price = this.getPrice(
    //         this.partnerSignUpForm.get('franchiseType')?.value || 0,
    //         this.partnerSignUpForm.get('modelName')?.value || '',
    //         this.partnerSignUpForm.get('extension')?.value || '',
    //         this.partnerSignUpForm.get('purchaseRequired')?.value || 0
    //       );
    //       this.partnerSignUpForm.get('price')?.setValue(price);
    //       //?.setValue(price + this.extraAmount);
    //     }
    //   });

    this.partnerSignUpForm
      .get('modelName')
      ?.valueChanges.subscribe((change) => {
        if (change === 'State Franchise') {
          this.partnerSignUpForm.get('town')?.setValue('');
          this.partnerSignUpForm.get('town')?.disable();
        } else {
          this.partnerSignUpForm.get('town')?.enable();
        }

        const extensions = this.getExtensionTypes(
          this.partnerSignUpForm.get('franchiseType')?.value || 0,
          change
        );
        if (!extensions.length || !extensions[0]) {
          this.partnerSignUpForm.get('extension')?.setValue('');
          // this.partnerSignUpForm.get('extension')?.disable();
        } else {
          this.partnerSignUpForm.get('extension')?.enable();
        }
      });

    // this.partnerSignUpForm.get('extension') // rrc commented
    //   ?.valueChanges.subscribe((change) => {
    //     const price = this.getPrice(
    //       this.partnerSignUpForm.get('franchiseType')?.value || 0,
    //       this.partnerSignUpForm.get('modelName')?.value || '',
    //       change,
    //       this.partnerSignUpForm.get('purchaseRequired')?.value || 0
    //     );
    //     const uid = this.getUID(
    //       this.partnerSignUpForm.get('franchiseType')?.value || 0,
    //       this.partnerSignUpForm.get('modelName')?.value || '',
    //       change
    //     );
    //     if (!price) {
    //       this.partnerSignUpForm.get('price')?.setValue('');
    //       this.partnerSignUpForm.get('uid')?.setValue('');
    //     } else {
    //       //   console.log(this.partnerSignUpForm.get('billingRequired')?.value);
    //       // console.log(this.extraAmount);
    //       this.partnerSignUpForm.get('price')?.setValue(price);
    //       // ?.setValue(price + this.extraAmount);
    //       this.partnerSignUpForm.get('uid')?.setValue(uid);
    //       const payload = {
    //         modelType: this.partnerSignUpForm.get('franchiseType')?.value,
    //         modelName: this.partnerSignUpForm.get('modelName')?.value,
    //         purchaseType: this.partnerSignUpForm.get('purchaseRequired')?.value,
    //         extension: this.partnerSignUpForm.get('extension')?.value,
    //       };
    //       this.authSvc.getAppPrice(payload).subscribe((res) => {
    //         console.log(res);
    //         if (res?.appPrice) {
    //           this.partnerSignUpForm
    //             .get('appPrice')
    //             ?.setValue(`${res?.appPrice}/unit/month`);
    //         }
    //       });
    //     }
    //   });

    this.partnerSignUpForm
      .get('gst_treatment')
      ?.valueChanges.subscribe((change) => {
        console.log(this.entityTypes.map((x) => x.value).includes(change));

        if (this.entityTypes.map((x) => x.value).includes(change)) {
          // this.partnerSignUpForm
          //   .get('purchaseRequired')
          //   ?.enable({ emitEvent: false });

          if (change === this.entityTypes[0].value) {
            //clear validation
            this.partnerSignUpForm.controls['gst_no'].setValue('');
            this.partnerSignUpForm.controls['gst_no'].clearValidators();

            // this.partnerSignUpForm.controls['aadhar_docs'].setValidators([
            //   Validators.required,
            // ]);
          } else if (change === this.entityTypes[1].value) {
            this.partnerSignUpForm.controls['aadhar_docs'].setValue('');
            this.partnerSignUpForm.controls['aadhar_docs'].setValue(
              this.fileNameAadhar
            );
            this.partnerSignUpForm.controls['aadhar_docs'].clearValidators();

            this.selectedAdharFiles = undefined;
            this.fileNameAadhar = '';

            this.partnerSignUpForm.controls['gst_no'].setValidators([
              Validators.required,
              Validators.pattern(
                /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
              ),
            ]);
          }

          this.partnerSignUpForm.controls['gst_no'].updateValueAndValidity();
          this.partnerSignUpForm.controls[
            'aadhar_docs'
          ].updateValueAndValidity();
        }
      });

    // this.partnerSignUpForm.get('purchaseRequired')?.disable();
    this.partnerSignUpForm
      .get('immediateUnits')
      ?.valueChanges.subscribe((change) => {
        if (change && !isNaN(change)) {
          if (change != 0) {
            this.partnerSignUpForm.controls['unitsInNxtYr'].setValue(
              `${change * 12}`
            );
          } else {
            this.partnerSignUpForm.controls['unitsInNxtYr'].setValue(``);
          }
        } else {
          // this.partnerSignUpForm.controls['immediateUnits'].setValue(
          //   `1`
          // );
          this.partnerSignUpForm.controls['unitsInNxtYr'].setValue(``);
        }
        this.partnerSignUpForm.controls[
          'unitsInNxtYr'
        ].updateValueAndValidity();
      });
    this.partnerSignUpForm
      .get('franchiseMastrId')
      ?.valueChanges.subscribe((change) => {
        if (change === '1' || change === '2') {
          if (change === '1') {
            //cleare validation
            this.partnerSignUpForm.controls['immediateUnits'].clearValidators();
            // this.partnerSignUpForm.controls['unitsInNxtYr'].clearValidators();
            this.partnerSignUpForm.controls['franchiseType'].clearValidators();
            this.partnerSignUpForm.controls['purchaseRequired'].setValidators([
              Validators.required,
            ]);
            this.partnerSignUpForm.controls[
              'purchaseRequired'
            ].updateValueAndValidity();

            this.partnerSignUpForm.controls['modelName'].setValidators([
              Validators.required,
            ]);
            this.partnerSignUpForm.controls[
              'modelName'
            ].updateValueAndValidity();

            this.partnerSignUpForm.controls['extension'].setValidators([
              Validators.required,
            ]);
            this.partnerSignUpForm.controls[
              'extension'
            ].updateValueAndValidity();
          } else if (change === '2') {
            this.partnerSignUpForm.controls['immediateUnits'].clearValidators();
            // this.partnerSignUpForm.controls['unitsInNxtYr'].clearValidators();

            this.partnerSignUpForm.controls['immediateUnits'].setValue(1);
            this.partnerSignUpForm.controls['unitsInNxtYr'].setValue(12);

            this.partnerSignUpForm.controls['immediateUnits'].setValidators([
              Validators.min(1),
              Validators.required,
              Validators.pattern(/^[1-9]\d*$/),
            ]);
            this.partnerSignUpForm.controls['unitsInNxtYr'].setValidators([
              Validators.min(
                this.partnerSignUpForm.controls['immediateUnits'].value * 12
              ),
              Validators.required,
            ]);

            this.partnerSignUpForm.controls[
              'immediateUnits'
            ].updateValueAndValidity();
            this.partnerSignUpForm.controls[
              'unitsInNxtYr'
            ].updateValueAndValidity();
            this.partnerSignUpForm.controls[
              'purchaseRequired'
            ].clearValidators();

            this.partnerSignUpForm.controls['franchiseType'].setValidators([
              Validators.required,
            ]);
            this.partnerSignUpForm.controls[
              'franchiseType'
            ].updateValueAndValidity();

            this.partnerSignUpForm.controls['modelName']?.clearValidators();
            this.partnerSignUpForm.controls['extension']?.clearValidators();
          }

          this.partnerSignUpForm.controls[
            'immediateUnits'
          ].updateValueAndValidity();
          this.partnerSignUpForm.controls[
            'unitsInNxtYr'
          ].updateValueAndValidity();
        } else {
          this.notes = '';
          this.partnerSignUpForm
            .get('purchaseRequired')
            ?.setValue(null, { emitEvent: false });
        }
        this.partnerSignUpForm.get('modelName')?.setValue('');
        this.partnerSignUpForm.get('extension')?.setValue('');
      });
    this.partnerSignUpForm
      .get('shipngAdrsSameAsBilngAdrs')
      ?.valueChanges.subscribe((change) => {
        if (change) {
          this.partnerSignUpForm?.controls?.shipngAddress?.setValue('');
          this.partnerSignUpForm?.controls?.shipngPincode?.setValue('');
          this.partnerSignUpForm?.controls?.shipngAddress?.setValue(
            this.partnerSignUpForm?.controls?.address?.value
          );
          this.partnerSignUpForm?.controls?.shipngPincode?.setValue(
            this.partnerSignUpForm?.controls?.pincode?.value
          );
          this.partnerSignUpForm?.controls?.shipngAddress?.clearValidators();
          this.partnerSignUpForm?.controls?.shipngPincode?.clearValidators();
        } else {
          this.partnerSignUpForm?.controls['shipngAddress']?.setValidators([
            Validators.required,
          ]);
          this.partnerSignUpForm?.controls['shipngPincode']?.setValidators([
            Validators.required,
            Validators.max(999999),
            Validators.min(100000),
          ]);
        }
        this.partnerSignUpForm?.controls?.shipngAddress?.updateValueAndValidity();
        this.partnerSignUpForm?.controls?.shipngPincode?.updateValueAndValidity();
      });

    // this.getFormDetails();
    this.getCandidateForms();
    this.getModelDetails();
    this.getModelData();
  }

  updateFormValuesForSelectedModel() {
    console.log(this.sharedDataService.selectedModel);
    this.partnerSignUpForm?.controls?.purchaseRequired.setValue(
      this.purchaseTypes[this.defaultPurchaseTypeIndex].label.toLowerCase()
    );
    this.partnerSignUpForm?.controls?.modelName.setValue(
      this.sharedDataService.selectedModel.item.heading.toLowerCase()
    );
    console.log(
      this.getExtension(this.partnerSignUpForm?.controls?.modelName?.value)
    );
    const selectedExt = this.getExtension(
      this.partnerSignUpForm?.controls?.modelName?.value
    ).find((ext: any) =>
      ext?.name.includes(this.sharedDataService.selectedModel.ele.subHeading)
    );
    console.log(selectedExt);

    this.partnerSignUpForm?.controls?.extension.setValue(selectedExt?.name);
    this.checkApiCall_GetPricing();
  }

  fetchFavouriteInfo() {
    let favouriteData = this.authSvc.getFavourites();
    favouriteData.subscribe((res: { models: number[] }) => {
      this.favUID = res.models.length > 0 ? res.models[0] : 0;
    });
  }

  getCities(selectedState: string) {
    this.statesAndCities$.subscribe((res) => {
      this.cities = res[selectedState];
    });
  }

  async submit(isSave: boolean) {
    if (this.checkBefore_saveSubmit() == false) {
      return;
    }

    this.saveForm(isSave)
      .then(async (res) => {
        console.log('dfsdfsdfdfsdfs', res);
        // this.sharedDataService.modelObj = {
        //   price: this.partnerSignUpForm.controls.price.value,
        //   uid: this.partnerSignUpForm.controls.uid.value,
        // };
        if (res?.message === 'Successfully saved') {
          this.toastSvc.showSuccessToast('Success', 'Details Saved');
          await this.fbAuthSvc.InitApp();
          const formValue = this.partnerSignUpForm.getRawValue();
          // if (
          //   formValue.franchiseType === '3' ||
          //   formValue.purchaseRequired === '2'
          // ) {
          //   this.router.navigate(['/under-review']);
          // } else {
          //   this.router.navigate(['/payment']);
          // }
          this.router.navigate(['/under-review']);
        }
      })
      .catch((err) => {
        this.toastSvc.showErrorToast('Error', 'Failed to save details');
        console.log(err);
      });
  }

  testPatch(obj: any) {
    this.partnerSignUpForm.controls.town.enable();
    this.getCities(obj.state);
    this.partnerSignUpForm.patchValue(obj);
  }

  testPatch1(obj: any) {
    this.partnerSignUpForm.controls.town.enable();
    this.getCities(obj.state);
    setTimeout(() => {
      this.partnerSignUpForm.controls.state.setValue(obj.state);
      this.partnerSignUpForm.controls.town.setValue(obj.town);
    }, 1000);
  }

  // getFormDetails() {
  //   this.authSvc.fetchPartnerForm().subscribe(
  //     (response) => {
  //       //  console.log(response);
  //       response.termsAndConditions =
  //         response?.termsAndConditions === 'False' ? false : true;
  //       response.franchiseType = response?.isMulti ? '3' : '1';
  //       this.franchiseModelType = response?.isMulti ? 3 : 1;
  //       this.partnerSignUpForm.patchValue({
  //         ...response,
  //       });
  //       response?.isMulti
  //         ? this.testPatch1({
  //           state: response.state,
  //           town: response.selectedTowns,
  //         })
  //         : this.testPatch({ state: response.state, town: response.town });
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  private async saveForm(isSave: boolean) {
    const formValue = this.partnerSignUpForm.getRawValue();

    console.log('>>>>>>>>>', this.selectedAdharFiles);

    formValue.franchisee_type = false;
    formValue.subscription_type = false;
    formValue.isSave = isSave;

    if (formValue.franchiseType === '3') {
      formValue.selectedTowns = formValue.town;
      formValue.town = '';
      formValue.franchisee_type = true;
    }

    if (formValue.purchaseRequired === '2') {
      formValue.subscription_type = true;
    }

    // try {
    //   const res = await this.authSvc.savePartnerForm(formValue).toPromise();
    //   this.toastSvc.showSuccessToast('Success', 'Details Saved');
    //   return true;
    // } catch (err) {
    //   console.log(err);
    //   this.toastSvc.showErrorToast('Error', 'Failed to save details');
    //   throw err;
    // }
    const formData: FormData = new FormData();
    formData.append('title', this.partnerSignUpForm?.controls?.title?.value);
    formData.append(
      'firstName',
      this.partnerSignUpForm?.controls?.firstName?.value
    );
    formData.append(
      'lastName',
      this.partnerSignUpForm?.controls?.lastName?.value
    );
    formData.append('mobile', this.partnerSignUpForm?.controls?.mobile?.value);
    formData.append(
      'billing_address',
      this.partnerSignUpForm?.controls?.address?.value
    );
    formData.append(
      'billing_pincode',
      this.partnerSignUpForm?.controls?.pincode?.value
    );
    if (this.partnerSignUpForm?.controls?.shipngAdrsSameAsBilngAdrs?.value) {
      formData.append(
        'shipping_address',
        this.partnerSignUpForm?.controls?.address?.value
      );
      formData.append(
        'shipping_pincode',
        this.partnerSignUpForm?.controls?.pincode?.value
      );
    } else {
      formData.append(
        'shipping_address',
        this.partnerSignUpForm?.controls?.shipngAddress?.value
      );
      formData.append(
        'shipping_pincode',
        this.partnerSignUpForm?.controls?.shipngPincode?.value
      );
    }

    formData.append(
      'purchase_type',
      this.partnerSignUpForm?.controls?.franchiseMastrId.value == '2'
        ? ''
        : this.partnerSignUpForm?.controls?.purchaseRequired.value
    );
    formData.append(
      'gst_treatment',
      this.partnerSignUpForm?.controls?.gst_treatment.value
    );

    if (
      this.partnerSignUpForm?.controls?.gst_treatment.value ===
      'business_registered_regular'
    ) {
      formData.append(
        'trade_name',
        this.partnerSignUpForm?.controls?.tradeName.value
      );
      formData.append('gst_no', this.partnerSignUpForm?.controls?.gst_no.value);
    } else {
      if (this.upload_adhrDocFiles == true) {
        formData.append('file', this.selectedAdharFiles as any);
      }
    }
    if (this.partnerSignUpForm?.controls?.franchiseMastrId.value == '2') {
      formData.append(
        'monthly_target',
        !isNaN(this.partnerSignUpForm?.controls?.immediateUnits.value) &&
          this.partnerSignUpForm?.controls?.immediateUnits.value != 0
          ? this.partnerSignUpForm?.controls?.immediateUnits.value
          : 1
      );
      formData.append(
        'annual_target',
        !isNaN(this.partnerSignUpForm?.controls?.immediateUnits.value) &&
          this.partnerSignUpForm?.controls?.immediateUnits.value != 0
          ? `${this.partnerSignUpForm?.controls?.immediateUnits?.value * 12}`
          : ''
      );
    } else {
      // formData.append('model_name', this.partnerSignUpForm?.controls?.modelName.value);
      // formData.append('model_extension', this.partnerSignUpForm?.controls?.extension.value);
    }
    formData.append(
      'tnc',
      this.partnerSignUpForm?.controls?.termsAndConditions.value
    );
    formData.append('isSubmitted', !formValue.isSave as any);
    formData.append(
      'isShippingAddressSame',
      this.partnerSignUpForm?.controls?.shipngAdrsSameAsBilngAdrs.value
    );

    formData.append(
      'franchise_type',
      this.partnerSignUpForm?.controls?.franchiseMastrId.value == '2'
        ? 'master franchise'
        : 'franchise'
    );
    if (this.partnerSignUpForm?.controls?.franchiseMastrId.value == '2') {
      formData.append(
        'master_franchise_category',
        this.partnerSignUpForm?.controls?.franchiseType.value == '3'
          ? 'town franchise'
          : 'state franchise'
      );
    }

    if (this.partnerSignUpForm?.controls?.franchiseType.value == '3') {
      formData.append('state', this.partnerSignUpForm?.controls?.state.value);
      formData.append('town', this.partnerSignUpForm?.controls?.town.value);
    } else {
      formData.append('state', this.partnerSignUpForm?.controls?.state.value);
    }
    if (this.partnerSignUpForm?.controls?.franchiseMastrId.value == '1') {
      formData.append('state', this.partnerSignUpForm?.controls?.state.value);
      formData.append('town', this.partnerSignUpForm?.controls?.town.value);
    }
    if (this.partnerSignUpForm?.controls?.franchiseMastrId.value == '1') {
      formData.append(
        'model_name',
        this.partnerSignUpForm?.controls?.modelName.value
      );
      formData.append(
        'model_extension',
        this.partnerSignUpForm?.controls?.extension.value
      );
    }

    console.log('.. Before Save -> formData');
    console.log(formData);

    formData.forEach((itm) => {
      console.log(itm);
    });

    return this.authSvc.savePartnerForm(formData).toPromise();
  }

  saveDetails() {
    if (this.checkBefore_saveSubmit()) {
      this.saveForm(true)
        .then((res) => {
          if (res?.message === 'Successfully saved') {
            this.toastSvc.showSuccessToast('Success', 'Details Saved');
          }
        })
        .catch((err) => {
          this.toastSvc.showErrorToast('Error', 'Failed to save details');
          console.log(err);
        });
    }
  }

  showTermsAndConditions() {
    this.tncModal.showModal();
  }

  getFranchiseTypeName(type: any) {
    return this.kitchenDetails[type].name;
  }

  getModelNames(selectedFranchiseType: number): string[] {
    if (selectedFranchiseType) {
      return Object.keys(
        this.kitchenDetails[selectedFranchiseType].subTypes || {}
      )?.filter((e) => {
        return e === 'Table Top' || e === 'Dispenser';
      });
    }
    return [];
  }

  getExtensionTypes(selectedFranchiseType: number, selectedModelName: string) {
    if (selectedFranchiseType && selectedModelName) {
      return Object.keys(
        this.kitchenDetails[selectedFranchiseType].subTypes[
          selectedModelName
        ] || {}
      );
    }
    return [];
  }

  getPrice(
    selectedFranchiseType: number,
    selectedModelName: string,
    selectedExtension: string,
    selectedPurchseType: string
  ): number {
    if (
      selectedFranchiseType &&
      selectedModelName &&
      (selectedExtension || selectedExtension === '')
    ) {
      if (selectedPurchseType == '2') {
        return (
          this.kitchenDetails[selectedFranchiseType].subTypes[
            selectedModelName
          ][selectedExtension]?.subscriptionPrice || 0
        );
      } else {
        return this.kitchenDetails[selectedFranchiseType].subTypes[
          selectedModelName
        ][selectedExtension]?.price;
      }
    }
    return 0;
  }

  getUID(
    selectedFranchiseType: number,
    selectedModelName: string,
    selectedExtension: string
  ): number {
    if (
      selectedFranchiseType &&
      selectedModelName &&
      (selectedExtension || selectedExtension === '')
    ) {
      return this.kitchenDetails[selectedFranchiseType].subTypes[
        selectedModelName
      ][selectedExtension]?.uid;
    }
    return 0;
  }

  getModelDetails() {
    this.authSvc.fetchModelPartnerDetails().subscribe((res) => {
      //  console.log(res);
      res.items?.forEach((costingItem: any) => {
        if (
          this.kitchenDetails[costingItem.modelType].subTypes[costingItem.name]
        ) {
          this.kitchenDetails[costingItem.modelType].subTypes[costingItem.name][
            costingItem.extension
          ] = {
            price: costingItem.price,
            uid: costingItem.uid,
            subscriptionPrice: costingItem.subscriptionPrice,
            appPrice: costingItem.appPrice,
            advance: costingItem.advance,
          };
        } else {
          this.kitchenDetails[costingItem.modelType].subTypes[
            costingItem.name
          ] = {
            [costingItem.extension]: {
              price: costingItem.price,
              uid: costingItem.uid,
              subscriptionPrice: costingItem.subscriptionPrice,
              appPrice: costingItem.appPrice,
              advance: costingItem.advance,
            },
          };
        }
      });

      this.modelDetails = res.items.filter((e: any) => {
        return e.modelType == 1 || e.modelType == 3;
      });
      this.getFavourites();
    });
  }

  setprice() {
    var val = JSON.parse(this.partnerSignUpForm.controls.model.value);
    this.partnerSignUpForm.controls.price.setValue(val.price);
    this.partnerSignUpForm.controls.price.disable();
  }

  showinfo() {
    this.infoModal.showModal();
  }

  getFavourites() {
    this.authSvc.getFavourites().subscribe(
      (res) => {
        this.modelType = res?.models[0];
        let KEY: any;
        let INNERKEY: any;
        if (res?.models[0]) {
          const val = Object.keys(
            this.kitchenDetails[this.franchiseModelType].subTypes || {}
          );
          console.log(val);
          var model = this.kitchenDetails[this.franchiseModelType].subTypes;
          for (let [key, value] of Object.entries(model)) {
            for (let [innerkey, val] of Object.entries(value)) {
              if (val.uid === res?.models[0]) {
                console.log(innerkey);
                console.log(key);
                KEY = key;
                INNERKEY = innerkey;
                break;
              }
            }
          }
          console.log(KEY);
          this.partnerSignUpForm.get('modelName')?.setValue(KEY);
          this.partnerSignUpForm.get('extension')?.setValue(INNERKEY);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //#region If Shipping address is same as Billing
  onChange_shipngAdrsSameAsBilngAdrs() {
    // this.partnerSignUpForm.controls.town.setValue('');
    if (
      this.partnerSignUpForm.controls.shipngAdrsSameAsBilngAdrs.value == true
    ) {
      this.partnerSignUpForm.controls.shipngAddress.setValue('');
      this.partnerSignUpForm.controls.shipngPincode.setValue('');
      this.partnerSignUpForm.controls.shipngAddress.setValue(
        this.partnerSignUpForm.controls.address.value
      );
      this.partnerSignUpForm.controls.shipngPincode.setValue(
        this.partnerSignUpForm.controls.pincode.value
      );
    }
  }

  //#endregion

  //#region Upload Aadhar

  // openComponent_DocUpload() {

  //   const dialogRef = this.matDlg.open(UploadComponent, {
  //     width: '1000px', //'550px',
  //     height: '550px',
  //     data: { action: 'setDocUrl', doc_url: '' },
  //     disableClose: true
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       let aadhrDocUrl = { doc_url: result.doc_url }
  //       console.log("... aadhrDocUrl :- " + aadhrDocUrl);
  //     }
  //     else {
  //       return;
  //     }

  //   });

  // }

  async selectFile_aadhar(e: any, fileType: string) {
    console.log(e);
    if (e.target.files.length) {
      this.setFiles(fileType, e);
    } else {
      this.clearFileUpload_aadhar();
    }
  }

  setFiles(fileType: string, e: any) {
    this.selectedAdharFiles = e.target.files[0];
    this.readURL(e.target.files, 'Adhar');
    this.fileNameAadhar = e.target.files[0].name;
    this.partnerSignUpForm.controls.aadhar_docs.setValue(this.fileNameAadhar);

    console.log(
      '.. setFiles(fileType: string, e: any) -> this.selectedAdharFiles & this.fileNameAadhar'
    );
    console.log(this.selectedAdharFiles);
    console.log(this.fileNameAadhar);

    if (this.selectedAdharFiles) {
      this.confirmDoc();
    }
  }

  readURL(input: any, fileType: string) {
    console.log('.. readURL(input: any, fileType: string) -> input');
    console.log(input);

    if (input[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(input[0]);
      reader.onload = () => {
        $(`#${fileType}`).attr('src', reader.result);
      };
    }
  }

  clearFileUpload_aadhar() {
    this.selectedAdharFiles = undefined;
    this.fileNameAadhar = '';
    this.partnerSignUpForm.controls.aadhar_docs.setValue(this.fileNameAadhar);
  }

  confirmDoc() {
    let fileArray: any[] = [];
    if (this.fileNameAadhar) {
      if (this.selectedAdharFiles) {
        // fileArray.push({
        //   file: this.selectedAdharFiles,
        //   type: 'pan',
        // });
      }
      fileArray = [
        ...fileArray,
        { file: this.selectedAdharFiles, type: 'aadhar' },
      ];
      this.uploadNow(fileArray);
    }
  }

  uploadNow(fileArray: any) {
    this.NgxSpinner.show();

    console.log('... uploadNow(fileArray: any) -> fileArray');
    console.log(fileArray);

    if (fileArray.length) {
      // this.authSvc.upload(fileArray, 0).subscribe(
      //   async (res: any) => {
      //     console.log("... uploadNow(fileArray: any) -> after upload => res");
      //     console.log(res);
      //     if (res && res.message) {
      //       // if (this.pdfFileName != null && this.pdfFileName != "") {
      //       //   this.deleteSamplePdf(this.pdfFileName);
      //       // }
      //       this.NgxSpinner.hide();
      //       this.sharedDataService.output = res.output;
      //       // const updated = await this.fbAuth.InitApp();
      //       // if (updated) {
      //       //   this.router.navigate(['/order-confirm']);
      //       // }
      //     }
      //   },
      //   (err: any) => {
      //     console.log(err);
      //     this.NgxSpinner.hide();
      //   }
      // );
    }
  }

  getModelData() {
    this.sharedService.getModelData().subscribe((res) => {
      this.modelData = res.data;
    });
  }

  getExtension(modelName: string) {
    this.extension = this.modelData.filter((e: any) => {
      return e.modelName === modelName;
    });
    return this.extension?.length ? this.extension[0].extensions : [];
  }

  //#endregion

  //#region

  checkConditions_AssociateMessage(isdisplay: boolean) {
    let frntype: string = '';
    let mstrFrtype: number = 0;
    let mstrFrtype_nm: string = '';
    let stat: string = '';
    let twn: string = '';
    let call1: boolean = false;
    let call2: boolean = false;

    let frtype_fnd = this.lst_franchiseMastr.filter(
      (f) => f.id == this.partnerSignUpForm.get('franchiseMastrId')?.value
    );
    let mstrFrtype_fnd = this.partnerSignUpForm?.controls?.franchiseType?.value;
    let twn_fnd = this.partnerSignUpForm?.controls?.town?.value;

    if (
      frtype_fnd != null &&
      frtype_fnd != undefined &&
      frtype_fnd.length > 0
    ) {
      frntype = frtype_fnd[0].name?.toLowerCase();
    }

    if (
      mstrFrtype_fnd != null &&
      mstrFrtype_fnd != undefined &&
      mstrFrtype_fnd > 0
    ) {
      mstrFrtype = mstrFrtype_fnd;
    }

    stat = this.partnerSignUpForm?.controls?.state?.value;

    if (twn_fnd != null && twn_fnd != undefined) {
      twn = twn_fnd;
    }

    if (
      this.kitchenDetails[mstrFrtype] != null &&
      this.kitchenDetails[mstrFrtype] != undefined
    ) {
      mstrFrtype_nm = this.kitchenDetails[mstrFrtype].name?.toLowerCase();
    }

    if (
      this.partnerSignUpForm?.controls?.franchiseMastrId?.value == 2 &&
      this.partnerSignUpForm?.controls?.franchiseType?.value == 1 &&
      stat?.trim().length > 0
    ) {
      const api_prms = {
        franchiseType: frntype,
        state: stat,
        town: '',
        franchiseCategory: mstrFrtype_nm,
      };

      this.callApiNow_AssociateMessage(api_prms, isdisplay);
    }

    if (
      this.partnerSignUpForm?.controls?.franchiseMastrId?.value == 2 &&
      this.partnerSignUpForm?.controls?.franchiseType?.value == 3 &&
      stat?.trim()?.length > 0 &&
      twn?.trim()?.length > 0
    ) {
      const api_prms = {
        franchiseType: frntype,
        state: stat,
        town: twn,
        franchiseCategory: mstrFrtype_nm,
      };

      this.callApiNow_AssociateMessage(api_prms, isdisplay);
    }

    if (
      this.partnerSignUpForm?.controls?.franchiseMastrId?.value == 1 &&
      stat?.trim()?.length > 0 &&
      twn?.trim()?.length > 0
    ) {
      const api_prms = {
        franchiseType: frntype,
        state: stat,
        town: twn,
        franchiseCategory: '',
      };

      this.callApiNow_AssociateMessage(api_prms, isdisplay);
    }
  }

  callApiNow_AssociateMessage(api_prms: any, isdisplay: boolean) {
    // console.log("... callApiNow_AssociateMessage() -> api_prms");
    // console.log(api_prms);

    this.enableSubmitBtn = false;

    this.authSvc.getAssociatedMessage(api_prms).subscribe((res) => {
      // console.log("... getAssociateMessage response");
      // console.log(res);

      if (res?.isSuccess) {
        //this.toastSvc.showSuccessToast('Success', res?.message);
        //Swal.fire(res?.message);

        this.enableSubmitBtn = true;

        if (isdisplay) {
          Swal.fire({
            title: 'Success',
            icon: 'success',
            text: res?.message,
            showConfirmButton: false,
            allowOutsideClick: true,
            allowEscapeKey: false,
            timer: 5000,
            timerProgressBar: true,
            backdrop: true,
            showCloseButton: true,
            closeButtonHtml: '<span style="color: #ed4545">&times;</span>',
          });
        }

        // Swal.fire({
        //   title: 'Success',
        //   text: res?.message,
        //   icon: 'success',
        //   confirmButtonText: 'OK'
        // })
      } else {
        this.enableSubmitBtn = false;
        if (isdisplay) {
          Swal.fire({
            title: '',
            icon: 'error',
            text: res?.message,
            showConfirmButton: false,
            allowOutsideClick: true,
            timer: 5000,
            timerProgressBar: true,
            allowEscapeKey: false,
            showCloseButton: true,
            backdrop: true,
            closeButtonHtml: '<span style="color: #ed4545">&times;</span>',
          });
        }
      }
    });
  }

  checkApiCall_GetPricing() {
    let _callApi_1: boolean = false;
    let _callApi_2: boolean = false;

    if (
      this.partnerSignUpForm?.controls?.franchiseMastrId?.value === '1' &&
      this.partnerSignUpForm?.controls?.extension?.value?.length > 0
    ) {
      _callApi_1 = true;
    }

    if (
      this.partnerSignUpForm?.controls?.franchiseMastrId?.value === '2' &&
      (this.partnerSignUpForm?.controls?.franchiseType?.value === '1' ||
        this.partnerSignUpForm?.controls?.franchiseType?.value === '3')
    ) {
      _callApi_2 = true;
    }

    if (_callApi_1 == true) {
      this.callApi_GetPricing_condition1();
    }

    if (_callApi_2 == true) {
      this.callApi_GetPricing_condition2();
    }
  }

  callApi_GetPricing_condition1() {
    let frntype: string = '';
    let mstrFrtype: number = 0;
    let perchs_typ: string = '';
    let modlNm: string = '';
    let ext: string = '';

    let frtype_fnd = this.lst_franchiseMastr?.filter(
      (f) => f.id == this.partnerSignUpForm?.get('franchiseMastrId')?.value
    );
    let mstrFrtype_fnd = this.partnerSignUpForm?.controls?.franchiseType?.value;

    if (
      frtype_fnd != null &&
      frtype_fnd != undefined &&
      frtype_fnd.length > 0
    ) {
      frntype = frtype_fnd[0].name.toLowerCase();
    }

    if (
      mstrFrtype_fnd != null &&
      mstrFrtype_fnd != undefined &&
      mstrFrtype_fnd > 0
    ) {
      mstrFrtype = mstrFrtype_fnd;
    }

    modlNm = this.partnerSignUpForm?.controls?.modelName?.value;
    ext = this.partnerSignUpForm?.controls?.extension?.value;
    perchs_typ = this.partnerSignUpForm?.controls?.purchaseRequired?.value;

    //let perchs_typ_fnd = this.purchaseTypes.filter(f => f.value == this.partnerSignUpForm.controls.purchaseRequired.value);
    // if (perchs_typ_fnd != null && perchs_typ_fnd != undefined && perchs_typ_fnd.length > 0)
    //   perchs_typ = perchs_typ_fnd[0].label.toLowerCase();

    if (modlNm?.trim()?.length > 0) {
      modlNm = modlNm?.toLowerCase();
    }
    if (ext?.trim()?.length > 0) {
      ext = ext?.toLowerCase();
    }
    if (perchs_typ?.trim()?.length > 0) {
      perchs_typ = perchs_typ?.toLowerCase();
    }

    const api_prms = {
      franchiseType: frntype,
      modelName: modlNm,
      extension: ext,
      purchaseType: perchs_typ,
    };

    if (
      !(
        frntype?.trim()?.length > 0 &&
        modlNm?.trim()?.length > 0 &&
        ext?.trim()?.length > 0 &&
        perchs_typ?.trim()?.length > 0
      )
    ) {
      return;
    }

    console.log('... callApi_GetPricing_condition1() -> api_prms');
    console.log(api_prms);

    this.authSvc.getPricing_condition1(api_prms).subscribe((res) => {
      // console.log("... getPricing_condition1 response");
      // console.log(res);

      if (res) {
        this.partnerSignUpForm?.controls?.price?.setValue('');
        this.partnerSignUpForm?.controls?.appPrice?.setValue('');

        this.partnerSignUpForm?.controls?.price?.setValue(res?.price);
        this.partnerSignUpForm?.controls?.appPrice?.setValue(res?.appPrice);
      }

      this.check();
    });
  }

  callApi_GetPricing_condition2() {
    let frntype: string = '';
    let mstrFrtype: number = 0;
    let mstrFrtype_nm: string = '';

    let frtype_fnd = this.lst_franchiseMastr?.filter(
      (f) => f.id == this.partnerSignUpForm.get('franchiseMastrId')?.value
    );
    let mstrFrtype_fnd = this.partnerSignUpForm?.controls?.franchiseType.value;

    if (
      frtype_fnd != null &&
      frtype_fnd != undefined &&
      frtype_fnd?.length > 0
    ) {
      frntype = frtype_fnd[0]?.name?.toLowerCase();
    }

    if (
      mstrFrtype_fnd != null &&
      mstrFrtype_fnd != undefined &&
      mstrFrtype_fnd > 0
    ) {
      mstrFrtype = mstrFrtype_fnd;
    }

    if (
      this.kitchenDetails[mstrFrtype] != null &&
      this.kitchenDetails[mstrFrtype] != undefined
    ) {
      mstrFrtype_nm = this.kitchenDetails[mstrFrtype]?.name?.toLowerCase();
    }

    const api_prms = {
      franchiseType: frntype,
      franchiseCategory: mstrFrtype_nm,
      // modelName: "table top",
      // extension: "3 nozzels",
      // purchaseType: "sale"
    };

    if (!(frntype?.trim()?.length > 0 && mstrFrtype_nm?.trim()?.length > 0)) {
      return;
    }

    console.log('... callApi_GetPricing_condition2() -> api_prms');
    console.log(api_prms);

    this.authSvc.getPricing_condition2(api_prms).subscribe((res) => {
      // console.log("... getPricing_condition2 response");
      // console.log(res);

      if (res) {
        this.partnerSignUpForm?.controls?.price?.setValue('');
        this.partnerSignUpForm?.controls?.appPrice?.setValue('');

        this.partnerSignUpForm?.controls?.price?.setValue(res?.price);
        this.partnerSignUpForm?.controls?.appPrice?.setValue(res?.appPrice);
      }
      this.check();
    });
  }

  //#endregion
  getCandidateForms() {
    this.authSvc.getCandidateForms().subscribe((res) => {
      console.log(res);
      // billing address
      this.partnerSignUpForm?.controls?.address.setValue(res?.billing_address);
      this.partnerSignUpForm?.controls?.address?.updateValueAndValidity();

      this.partnerSignUpForm?.controls?.pincode.setValue(res?.billing_pincode);
      this.partnerSignUpForm?.controls?.pincode?.updateValueAndValidity();

      // is same checkbox
      this.partnerSignUpForm?.controls?.shipngAdrsSameAsBilngAdrs.setValue(
        res?.isShippingAddressSame == undefined
          ? true
          : res?.isShippingAddressSame
      );
      this.partnerSignUpForm?.controls?.shipngAdrsSameAsBilngAdrs?.updateValueAndValidity();

      // shipping address
      this.partnerSignUpForm?.controls?.shipngAddress.setValue(
        res?.shipping_address
      );
      this.partnerSignUpForm?.controls?.shipngAddress?.updateValueAndValidity();

      this.partnerSignUpForm?.controls?.shipngPincode.setValue(
        res?.shipping_pincode
      );
      this.partnerSignUpForm?.controls?.shipngPincode?.updateValueAndValidity();

      //Entity type
      this.partnerSignUpForm?.controls?.gst_treatment.setValue(
        res?.gst_treatment
      );
      this.partnerSignUpForm?.controls?.gst_treatment?.updateValueAndValidity();

      // aadhar
      this.fileNameAadhar = res?.aadhar;

      //Franchise Type
      this.partnerSignUpForm?.controls?.franchiseMastrId.setValue(
        res?.franchise_type == 'master franchise' ? '2' : '1'
      );
      this.partnerSignUpForm?.controls?.franchiseMastrId?.updateValueAndValidity();

      //Franchise Category
      this.partnerSignUpForm?.controls?.franchiseType.setValue(
        res?.master_franchise_category == 'town' ? '3' : '1'
      );
      this.partnerSignUpForm?.controls?.franchiseType?.updateValueAndValidity();

      // state
      this.partnerSignUpForm?.controls?.state.setValue(res?.state);
      this.partnerSignUpForm?.controls?.state?.updateValueAndValidity();

      // town
      this.partnerSignUpForm?.controls?.town.setValue(res?.town);
      this.partnerSignUpForm?.controls?.town?.updateValueAndValidity();

      // Monthly Target
      this.partnerSignUpForm?.controls?.immediateUnits.setValue(
        res?.monthly_target
      );
      this.partnerSignUpForm?.controls?.immediateUnits?.updateValueAndValidity();

      // Annual Target
      this.partnerSignUpForm?.controls?.unitsInNxtYr.setValue(
        res?.annual_target
      );
      this.partnerSignUpForm?.controls?.unitsInNxtYr?.updateValueAndValidity();

      //tnc
      this.partnerSignUpForm?.controls?.termsAndConditions.setValue(res?.tnc);
      this.partnerSignUpForm?.controls?.termsAndConditions?.updateValueAndValidity();

      // Trade Name
      this.partnerSignUpForm?.controls?.tradeName.setValue(res?.trade_name);
      this.partnerSignUpForm?.controls?.tradeName?.updateValueAndValidity();

      //GSTIN
      this.partnerSignUpForm?.controls?.gst_no.setValue(res?.gst_no);
      this.partnerSignUpForm?.controls?.gst_no?.updateValueAndValidity();

      // modelName
      this.partnerSignUpForm?.controls?.modelName.setValue(res?.model_name);
      this.partnerSignUpForm?.controls?.modelName?.updateValueAndValidity();

      // model_extension
      this.partnerSignUpForm?.controls?.extension.setValue(
        res?.model_extension
      );
      this.partnerSignUpForm?.controls?.extension?.updateValueAndValidity();

      // Purchase Type
      this.partnerSignUpForm?.controls?.purchaseRequired.setValue(
        res?.purchase_type
      );
      this.partnerSignUpForm?.controls?.purchaseRequired?.updateValueAndValidity();

      this.checkApiCall_GetPricing();
      this.checkConditions_AssociateMessage(false);
      this.authSvc.getModelNames().subscribe((data) => {
        const purchase_type = data.purchaseType.map(
          (ext: any, index: number) => {
            if (data.default && ext === data.default) {
              this.defaultPurchaseTypeIndex = index;
            }
            return {
              label: ext?.charAt(0)?.toUpperCase() + ext?.slice(1),
              value: index + 1,
            };
          }
        );
        this.purchaseTypes = purchase_type;
        if (this.sharedDataService.selectedModel) {
          this.updateFormValuesForSelectedModel();
        }
      });
    });
  }

  check() {
    console.log('????????????', this.partnerSignUpForm.controls);
    Object.keys(this.partnerSignUpForm.controls).forEach((key) => {
      if (key != null) {
        // console.log(this.partnerSignUpForm.get(key))
        // console.log(this.partnerSignUpForm.get(key)?.value)
        if (
          this.partnerSignUpForm.get(key)?.status?.trim().toLowerCase() ==
          'INVALID'.trim().toLowerCase()
        ) {
          console.log(key + ' & ' + this.partnerSignUpForm.get(key)?.status);
        }
      }
    });
  }

  checkBefore_saveSubmit(): boolean {
    let ret: boolean = false;

    console.log(
      '.. setFiles(fileType: string, e: any) -> this.selectedAdharFiles & this.fileNameAadhar'
    );
    console.log(this.selectedAdharFiles);
    console.log(this.fileNameAadhar);

    this.upload_adhrDocFiles = false;

    if (
      this.partnerSignUpForm.controls.gst_treatment.value ===
      'business_registered_regular'
    ) {
      ret = true;
    }

    if (
      this.partnerSignUpForm.controls.gst_treatment.value ===
      'business_unregistered'
    ) {
      if (
        this.selectedAdharFiles == null ||
        this.selectedAdharFiles == undefined
      ) {
        if (
          this.fileNameAadhar != null &&
          this.fileNameAadhar != undefined &&
          this.fileNameAadhar.length > 0
        ) {
          this.upload_adhrDocFiles = false;
          ret = true;
        } else {
          if (this.upload_adhrDocFiles == false) {
            Swal.fire({
              title: '',
              icon: 'error',
              text: 'Please upload Aadhar !!',
              showConfirmButton: false,
              allowOutsideClick: true,
              allowEscapeKey: false,
              timerProgressBar: true,
              timer: 5000,
              showCloseButton: true,
              backdrop: true,
              closeButtonHtml: '<span style="color: #ed4545">&times;</span>',
            });
          }
        }
      } else if (
        this.selectedAdharFiles != null &&
        this.selectedAdharFiles != undefined
      ) {
        if (
          this.fileNameAadhar != null &&
          this.fileNameAadhar != undefined &&
          this.fileNameAadhar.length > 0
        ) {
          this.upload_adhrDocFiles = true;
          ret = true;
        }
      } else {
        if (this.upload_adhrDocFiles == false) {
          Swal.fire({
            title: '',
            icon: 'error',
            text: 'Please upload Aadhar !!',
            showConfirmButton: false,
            allowOutsideClick: true,
            allowEscapeKey: false,
            timerProgressBar: true,
            timer: 5000,
            showCloseButton: true,
            backdrop: true,
            closeButtonHtml: '<span style="color: #ed4545">&times;</span>',
          });
        }
      }
    }

    return ret;
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.partnerSignUpForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
}
