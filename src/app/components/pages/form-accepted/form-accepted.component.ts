import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { AuthService, PForm } from 'src/app/services/auth.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-form-accepted',
  templateUrl: './form-accepted.component.html',
  styleUrls: ['./form-accepted.component.scss'],
})
export class FormAcceptedComponent implements OnInit {
  constructor(
    private router: Router,
    private authSvc: AuthService,
    private fb: FormBuilder,
    private sharedDataService: SharedDataService
  ) {
    this.prePaymentForm = this.fb.group({
      price: ['', Validators.required],
      uid: ['', Validators.required],
    });
  }

  faUserCheck = faUserCheck;
  faArrowLeft = faArrowLeft;
  orderDetails: any = {};

  latestForm: PForm | null = null;

  prePaymentForm: FormGroup;

  ngOnInit(): void {
    this.getFormDetails();
    this.authSvc.getCandidateForms().subscribe(res =>{
      this.orderDetails = res;
    })
  }

  getFormDetails() {
    this.authSvc.fetchCandidateDetails().subscribe(
      (response) => {
        response.forms.sort(
          (a, b) =>
            new Date(a.createdDate).getTime() -
            new Date(b.createdDate).getTime()
        );
        this.latestForm = response.forms[response.forms.length - 1];
        this.prePaymentForm.patchValue({
          price: this.latestForm.price,
          uid: this.latestForm.uid,
        });
        this.prePaymentForm.get('price')?.disable();
        this.getFranchiseCosting();
      },
      (err) => {
        console.log(err);
      }
    );
    this.authSvc.getFranchiseCosting();
  }

  proceedToPayment() {
    this.sharedDataService.modelObj = {
      ...this.sharedDataService.modelObj,
      ...this.prePaymentForm.getRawValue(),
    };
    this.router.navigate(['/payment-multi']);
  }

  showLanding() {
    this.router.navigate(['/landing']);
  }
  getFranchiseCosting() {
    this.authSvc.getFranchiseCosting().subscribe((res) => {
      console.log(res);
      let Price = 0;
      let getData = res?.items?.filter((e: any) => {
        return e.uid === this.latestForm?.uid;
      });
      Price = getData[0]?.subscriptionPrice;
      this.prePaymentForm.patchValue({
        price: Price,
      });
      this.prePaymentForm.get('price')?.disable();
    });
  }
}
