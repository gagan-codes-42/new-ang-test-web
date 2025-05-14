import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastSvc: ToastrService) {}

  showSuccessToast(title: string, message: string) {
    this.toastSvc.success(message, title);
  }

  showErrorToast(title: string, message: string) {
    this.toastSvc.error(message, title);
  }
}
