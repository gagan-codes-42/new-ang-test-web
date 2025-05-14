import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { FbAuthService } from 'src/app/shared/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';
declare const $: any;
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  price = 0;
  advtobePaid = '5000';
  payableAmount = 0;
  uid: any;
  faArrowLeft = faArrowLeft;
  obj = {
    country: '',
    firstname: '',
    curl: '',
    city: '',
    udf10: '',
    hashString: '',
    udf9: '',
    udf7: '',
    udf8: '',
    action: 'abc.com',
    state: '',
    key: '',
    email: '',
    txnid: '',
    amount: '',
    address2: '',
    address1: '',
    udf5: '',
    udf6: '',
    udf3: '',
    surl: '',
    udf4: '',
    udf1: '',
    udf2: '',
    lastname: '',
    zipcode: '',
    phone: '',
    pg: '',
    furl: '',
    productinfo: '',
    hash: '',
    payment_uid: '',
  };
  @ViewChild('form')
  form!: ElementRef;
  flag = 0; // 0-pending 1- success -1 - failure
  winConfig = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
  width=1024,height=720,left=250,top=100`;
  constructor(
    private sharedDataService: SharedDataService,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
    private spinner: NgxSpinnerService,
    private fbAuth: FbAuthService
  ) {}

  ngOnInit(): void {
    if (
      !this.sharedDataService.modelObj ||
      !this.sharedDataService.modelObj.price ||
      !this.sharedDataService.modelObj.uid
    ) {
      this.router.navigate(['/landing']);
      return;
    }
    this.price = this.sharedDataService.modelObj.price;
    this.uid = this.sharedDataService.modelObj.uid;
    this.getAdvance();
    //this.payableAmount = this.price - 5000; //this.price / 2;
  }
  cancelPayment() {
    this.router.navigate(['/register-partner']);
  }
  makePayment() {
    this.spinner.show();
    let param = {
      uid: this.uid,
    };
    this.authService.makePayment(param).subscribe(
      (res) => {
        if (res) {
          console.log(res);
          this.obj = res;
          setTimeout(() => {
            let paymentWindow = window.open('', 'myWindow', this.winConfig);
            this.form.nativeElement.submit();
            setTimeout(() => {
              var clrInterval = setInterval(() => {
                let param = {
                  payment_uid: this.obj.payment_uid,
                };

                // stop the execution when window close
                if (paymentWindow?.closed) {
                  this.spinner.hide();
                  return;
                }
                this.authService.checkPaymentStatus(param).subscribe(
                  async (res) => {
                    console.log(res.payment_status);
                    this.flag = res.payment_status || 0;
                    if (this.flag === 1 || this.flag === -1) {
                      clearInterval(clrInterval);
                      this.spinner.hide();
                      // paymentWindow?.close();
                      if (this.flag === 1) {
                        this.toastService.showSuccessToast(
                          'Success',
                          'Payment Succesful'
                        );
                        setTimeout(() => {
                          paymentWindow?.close();
                        }, 2000);
                        const updated = await this.fbAuth.InitApp();
                        if (updated) {
                          this.router.navigate(['/upload']);
                        }
                      } else if (this.flag === -1) {
                        this.toastService.showErrorToast(
                          'Error',
                          'Payment Failed'
                        );

                        setTimeout(() => {
                          paymentWindow?.close();
                        }, 2000);
                      }
                    }
                  },
                  (err) => {
                    console.log(err);
                    this.toastService.showErrorToast('Error', 'Payment Failed');
                    setTimeout(() => {
                      paymentWindow?.close();
                    }, 2000);
                  }
                );
              }, 5000);
            }, 5000);
          }, 3000);
        }
      },
      (err) => {
        setTimeout(() => {
          this.spinner.hide();
          this.toastService.showErrorToast(
            'Payment Failed',
            'Please try again'
          );
        }, 5000);
      }
    );
  }
  backtoLanding() {
    this.router.navigate(['/landing']);
  }
  getAdvance() {
    this.authService.getAdvanceValue(this.uid).subscribe((res: any) => {
      console.log(res);
      if (res?.advance) {
        this.advtobePaid = res?.advance;
        this.payableAmount = this.price - res?.advance;
      }
    });
  }
}
