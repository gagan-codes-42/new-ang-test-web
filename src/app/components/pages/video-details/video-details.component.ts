import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SharedService } from 'src/app/shared.service';
import { FbAuthService } from 'src/app/shared/services/auth.service';
export interface MessageModel {
  title: string;
  message: string;
}

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss'],
})
export class VideoDetailsComponent
  extends SimpleModalComponent<MessageModel, boolean>
  implements MessageModel, OnInit
{
  title: string = '';
  message: string = '';
  videoForm!: FormGroup;
  loading = false;
  constructor(
    private fb: FormBuilder,
    public sharedSvc: SharedService,
    private toastSvc: ToastService,
    private fbAuthService: FbAuthService
  ) {
    super();
  }
  ngOnInit() {
    const userData = this.fbAuthService.userData;
    this.videoForm = this.fb.group({
      email: [userData?.email || '', [Validators.required, Validators.email]],
      phone: [
        userData?.mobile || '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
  }

  confirm() {
    if (this.videoForm.valid) {
      this.toastSvc.showSuccessToast(
        'Creating Video Room',
        `You will be redirected once it's ready`
      );

      this.sharedSvc
        .getVideoRoomCreated({
          mobile: this.videoForm.controls.phone.value,
          email: this.videoForm.controls.email.value,
        })
        .subscribe(
          (response) => {
            if (response.room_url) {
              this.close();
              window.open(response.room_url, '_blank');
            } else {
              this.close();
              this.toastSvc.showErrorToast(
                'Error in creating Video Room',
                'Please try again'
              );
            }
          },
          (err) => {
            console.log(err);
            this.close();
            this.toastSvc.showErrorToast(
              'Error in creating Video Room',
              'Please try again'
            );
          }
        );
    }
  }
  validateNumber(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
