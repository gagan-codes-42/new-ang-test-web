import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {
  @ViewChild('orderNowModal', { static: false }) orderNowModal!: ModalComponent;
  title = 'Details';
  messages!: string[];
  isContentOpen = false;
  accordionItem: any;
  constructor(private router: Router) {}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
    },
    autoplay: true,
    autoplaySpeed: 1000,
  };

  ngOnInit(): void {}
  openRegistrationPage() {
    this.router.navigate(['/register']);
  }
  orderNow(productName: any) {
    this.title = productName;
    if (this.title.toLowerCase() === 'panipuri shots') {
      this.accordionItem = [
        {
          heading: 'Coriander',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Pudina',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Tikha Pani',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Nimbu Pani',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Lahsun',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Ajwain',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Aadrak',
          content: 'Ingredients shall be uploaded soon',
        },
      ];
      this.orderNowModal.showModal();
    } else if (this.title.toLowerCase() === 'panipuri fills') {
      this.accordionItem = [
        {
          heading: 'Khatta-Mittha',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Imli Pani',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Spicy Mint Coriander',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Punjabi Masala',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Cummin',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Hingoli',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Hajmola',
          content: 'Ingredients shall be uploaded soon',
        },
      ];
      this.orderNowModal.showModal();
    } else if (this.title.toLowerCase() === 'panipuri gups') {
      this.accordionItem = [
        {
          heading: 'Dahi',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Lemon',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Garlic',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Imli',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Schezwan',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Spicy Cheese',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Spicy Pizza',
          content: 'Ingredients shall be uploaded soon',
        },
      ];
      this.orderNowModal.showModal();
    } else if (this.title.toLowerCase() === 'panipuri mix') {
      this.accordionItem = [
        {
          heading: 'Dahi Bhalla',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Aloo Kabli Chaat',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Bhelpuri',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Jhalmuri ',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Batata Puri',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Papri Chaat',
          content: 'Ingredients shall be uploaded soon',
        },
        {
          heading: 'Golgappa Chaat',
          content: 'Ingredients shall be uploaded soon',
        },
      ];
      this.orderNowModal.showModal();
    }
  }
}
