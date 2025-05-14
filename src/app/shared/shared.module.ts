import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ModalComponent } from '../components/modal/modal.component';
import { AuthHeaderComponent } from '../components/pages/auth-header/auth-header.component';
import { CustomHeaderComponent } from '../components/pages/custom-header/custom-header.component';
import { UnderReviewComponent } from '../components/pages/under-review/under-review.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    ModalComponent,
    CustomHeaderComponent,
    AuthHeaderComponent,
    UnderReviewComponent,
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false,
    }),
    UiSwitchModule,
    FontAwesomeModule,
    AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    NgSelectModule,
    MatSidenavModule,
    RouterModule,
  ],
  exports: [
    ModalComponent,
    NgxSpinnerModule,
    AccordionModule,
    PopoverModule,
    ProgressbarModule,
    TooltipModule,
    TranslateModule,
    UiSwitchModule,
    FontAwesomeModule,
    AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    NgSelectModule,
    CustomHeaderComponent,
    AuthHeaderComponent,
    UnderReviewComponent,
  ],
})
export class SharedModule {}
