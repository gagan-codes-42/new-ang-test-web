import { Component, OnInit ,ViewChild , OnChanges,SimpleChanges} from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { CartService } from '../../services/cartService.service'
import { ModalComponent } from '../../components/modal/modal.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CategorySheetComponent } from '../shared/category-sheet/category-sheet.component';
import { MatDialog } from '@angular/material/dialog';
import { ItemMenuComponent } from '../shared/item-menu/item-menu.component';
import { ReplicateOrderComponent } from '../shared/replicate-order/replicate-order.component';
import {  OrderService }  from '../order.service';
import { faStoreAlt , faArrowLeft}  from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent implements OnInit, OnChanges{
  data: any = [];
  tempData: any = [];
  categories:any = [];
  allItems: any = [];
  tempAllItems: any = [];
  buttons = [];
  fabTogglerState = 'inactive';
  restaurantName = '';
  slogan = '';
  price = '';
  loading = false;
  searchActive: boolean = false;
  open: boolean = false;
  restaurantData: any;
   cartId='epanipuricart.dummy.1';
   cartitem!:any;
   location!:string;
   faStoreAlt = faStoreAlt;
   quantity: number = 1;
   defaultImage = 'assets/img/no-image-available.png';
   cartBadgeNumber = 0
   oldCartData: any = [];
   cartData:any = [];
   faArrowLeft= faArrowLeft;
   userProfileData!:any;
   @ViewChild('AddToCart', { static: false }) AddToCart!: ModalComponent;
  constructor(private authService : AuthService , public cartService: CartService ,  private _bottomSheet: MatBottomSheet,
    public dialog: MatDialog, private orderService :OrderService , private router:Router) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  
  }
  ngOnInit(): void { 
   let id = sessionStorage.getItem('deviceid');
   let location = sessionStorage.getItem('location');

   if(id) {
     const deviceIdObj= JSON.parse(atob(id));
     this.cartId = deviceIdObj?.deviceId || '';
   }
   if(location){
    const locationObj= JSON.parse(atob(location));
    this.location = locationObj?.location || '';
   }

   this.getMenuCard();
   this.getUserProfileData();

   
  }
  
  getMenuCard(){
    this.orderService.getMenuCard(this.cartId).subscribe((res :any)=>{
      console.log(res)
      this.data = res.menu;
      this.cartData = res.menu;
      this.open = res.isActive;

      this.tempData = JSON.parse(JSON.stringify(this.data));
      this.data.forEach((element:any) => {
        this.categories.push({ "name": element.category });
        element.items.forEach((item:any) => {
          this.allItems.push(item);
        });
      });
      this.cartService.menuItems = this.allItems;
      this.cartService.discount = res.flatDiscount;
      this.getCartNumber(); 
    },(err :any)=>{
      console.log(err)
    })
  }
  searchItem(search : any) {
    this.searchActive = true;
    if (search === '') {
      this.searchActive = false;
      this.tempData = JSON.parse(JSON.stringify(this.data));
    } else {
      this.tempAllItems = [];
      this.allItems.forEach((item :any) => {
        if (item.name.toLowerCase().includes(search.toLowerCase()))
          this.tempAllItems.push(item);
      });
    }
  }
  openItem = (item:any) => {
    // console.log(item);
    // this.showAddTocart(item);
    console.log(item);
    if (this.cartService.itemInCart(item.itemId) && item.availableQuantity?.length) {
      const bottomSheetRef = this._bottomSheet.open(ReplicateOrderComponent, {
        data: {
          item,
          price: this.price,
        },
      });
      bottomSheetRef.afterDismissed().subscribe(() => {});
    } else if (!item.outOfStock) {
      const dialogRef = this.dialog.open(ItemMenuComponent, {
        data: { item: item, price: this.price },
        panelClass: 'open-item',
      });

      dialogRef.afterClosed().subscribe((result:any) => {
        console.log(result);
        this.cartService.getCartItems();
      });
    }
  };
  showAddTocart(item:any) {
    console.log(item);
    this.cartitem =item;
    this.AddToCart.showModal();
    
    
  }
  addtoCart(){
    console.log();
  }
  cancelCart(){
    this.AddToCart.hideModal();
  }
  scroll = (category:any) => {
    let element = document.getElementById(category);
    element!.scrollIntoView();
  };
  openBottomSheet(): void {
    const bottomSheetRef = this._bottomSheet.open(CategorySheetComponent, {
      data: this.categories,
    });
    bottomSheetRef.afterDismissed().subscribe((category:any) => {
      this.scroll(category);
    });
  }
 getCartNumber(){
    this.orderService.getOrderCart(this.cartId).subscribe((res)=>{
        if(res && res.items && res.items.length){
           this.oldCartData = res.items
           var count =  res.items.reduce((acc:any,item: any)=>{
              return acc + item.qty;
           },0)
            this.cartService.setCartNumber(count);
            this.buildCartServiceData();
        }else {
            this.oldCartData = []
            this.cartService.setCartNumber(0);
        }
    })
  }

 async buildCartServiceData(){
    let len = this.oldCartData.length || 0 ;
    for(let i=0; i < len ; i++){
        let item = this.allItems.filter((e:any)=>{
          return e.itemId === this.oldCartData[i].itemId;
        })
        if(item.length){
          this.cartService.cart_items[item[0].itemId] = {
            item: item[0],
            quantity: this.oldCartData[i].qty,
            type: "",
            price: item[0].price,
          };
          this.cartService.prev_items[item[0].itemId] = {
            cartItemId: item[0].itemId,
            customization :'',
            value: {
              item:item[0],
              quantity: this.oldCartData[i].qty,
              type: "",
              price: item[0].price,
            },
          };
        }
    }
  }
  backtoOrderType(){
    this.router.navigate(['/ordernow/store-locator']);
  }
  getProfileImageURL() {
    return this.userProfileData?.profile
      ? `${environment.serverURL}/getProfileImage/${this.userProfileData?.profile}`
      : 'assets/img/avatar.png';
  }
  getUserProfileData() {
    this.authService.getUserProfile(this.cartId).subscribe((res) => {
      this.userProfileData = res;
    });
  }
  

}
