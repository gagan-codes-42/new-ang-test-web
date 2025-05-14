import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService, StateAndCities } from 'src/app/shared.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { OrderService, Location } from '../order.service';

@Component({
  selector: 'app-store-locator',
  templateUrl: './store-locator.component.html',
  styleUrls: ['./store-locator.component.scss'],
})
export class StoreLocatorComponent implements OnInit {
  statesAndCities$!: Observable<StateAndCities>;
  locationForm: FormGroup;
  states: StateAndCities = {};
  loading = false;
  loaded = false;
  locations: Location[] = [];

  cityarray: any = [];

  constructor(
    private readonly sharedService: SharedService,
    private fb: FormBuilder,
    private orderSvc: OrderService,
    private router: Router,
    private toastSvc: ToastService
  ) {
    this.locationForm = this.fb.group({
      state: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.sharedService.getCitiesAndStates().subscribe((states) => {
      this.states = states;
    });
    this.locationForm.get('city')?.valueChanges.subscribe((change) => {
      if (change) {
        this.loading = true;
        this.orderSvc
          .getLocationsForStateAndCity(this.locationForm.value.state, change)
          .subscribe(
            (response) => {
              this.locations = response.locations;
            },
            (err) => {
              console.log(err);
              this.locations = [];
              this.toastSvc.showErrorToast(
                'Error while Fetching stores',
                'Please try again'
              );
            }
          )
          .add(() => {
            this.loaded = true;
            this.loading = false;
          });
      }
    });
    this.locationForm.get('state')?.valueChanges.subscribe((selectedState)=>{
      this.getCities(selectedState);
    });
  }

   getCities(state:any) {
    this.orderSvc.getCitiesByState(state).subscribe((res)=>{
      this.cityarray =res.cities;
    });
  }

  onLocationSelected(deviceId: string ,location:string) {
    sessionStorage.setItem('deviceid', btoa(JSON.stringify({ deviceId })));
    sessionStorage.setItem('location', btoa(JSON.stringify({ location })));
    sessionStorage.setItem('city', this.locationForm.get('city')?.value);
    this.router.navigate(['ordernow', 'menu-card']);
  }

  
}
