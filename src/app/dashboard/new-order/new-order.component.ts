import { Component, OnInit, ViewChild } from '@angular/core';
import {
  faPlus,
  faMinus,
  faShoppingCart,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../../components/modal/modal.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
})
export class NewOrderComponent implements OnInit {
  @ViewChild('AggModal', { static: false }) AggModal!: ModalComponent;
  faPlus = faPlus;
  faMinus = faMinus;
  faShoppingCart = faShoppingCart;
  faSearch = faSearch;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  allCategoryIds!: any;
  categoryitems: any = [];
  tempCategoryItems:any = [];
  tempCategoryids!:any;
  defaultImage = 'assets/img/no-image-available.png';
  filtertext:string= "";
  backupfilterResult:any = [];
  cartCount = 0;
  existingCartItem = [];

  constructor(private authService: AuthService , private router:Router) {}

  ngOnInit(): void {
    this.getAllCategories();
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Category',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      primaryKey: 'categoryId',
      labelKey: 'category',
    };
    this.getShoppingCart();
  }
  addToCart(item: any) {
    console.log(item.itemId);
    const payload = {
      "items": [item.itemId]
    }
    this.authService.addToCartShoppingCart(payload).subscribe((res)=>{
      console.log(res);
      this.getShoppingCart();
    })
  }
  openCart() {
    this.router.navigate(['/dashboard/checkout']);
  }
  getAllCategories() {
    this.authService.getAllCategories().subscribe(
      (res) => {
        console.log(res.categories);
        this.dropdownList = res.categories.filter((e: any)=> {
             return  e.category !=='Franchise Models'
        });
        this.allCategoryIds = this.dropdownList.map((e: any) => {
          return e.categoryId;
        });
        let ids = this.allCategoryIds.join();
        this.authService.getItemByCategory(ids).subscribe((res) => {
          console.log(res);
          this.categoryitems = res.items;
          this.tempCategoryItems = JSON.parse(JSON.stringify(this.categoryitems));
          this.getResultCount();
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  updateItem(e: any) {
    console.log(e);
    if(this.selectedItems.length) {
    this.tempCategoryids = this.selectedItems.map((e: any) => {
      return e.categoryId;
    });
    let ids = this.tempCategoryids.join();
        this.authService.getItemByCategory(ids).subscribe((res) => {
          console.log(res);
          this.tempCategoryItems = res.items;
          this.backupfilterResult = JSON.parse(JSON.stringify(this.tempCategoryItems));
        });
      } else {
        this.tempCategoryItems = JSON.parse(JSON.stringify(this.categoryitems));
      }

  }
  filterResult(){
    console.log(this.filtertext);
    if(this.selectedItems.length){
      this.tempCategoryItems = JSON.parse(JSON.stringify(this.backupfilterResult));
    }else {
      this.tempCategoryItems = JSON.parse(JSON.stringify(this.categoryitems));
    }
    if(this.filtertext){
      this.tempCategoryItems = this.tempCategoryItems.filter((item:any) => item.items.some((e:any) => e.name.toLowerCase().includes(this.filtertext.toLowerCase().trim())));
      console.log(this.tempCategoryItems);
     for(let val of this.tempCategoryItems){
       let innerObj = val.items.filter((e:any) => e.name.toLowerCase().includes(this.filtertext.toLowerCase().trim()))
       val.items = innerObj;
     }

    }

  }
  getResultCount(){
    let totalProducts = 0 ; 
    return totalProducts = this.tempCategoryItems.reduce((count:any, current:any) => count + current.items.length, 0);
  }
  getShoppingCart(){
    this.authService.getShoppingCart().subscribe((res)=>{
      console.log(res);
      this.existingCartItem = res.items
      this.cartCount = res.items.length;
    })
  }
  getCartCount(){
    return this.cartCount;
  }
}
