import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { environment } from 'src/environments/environment';
import { ComingSoonComponent } from '../coming-soon/coming-soon.component';
import { Router } from '@angular/router';
import { Slick } from 'ngx-slickjs';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, AfterViewInit {
  @ViewChild('modalTemplate') modalTemplate!: ElementRef;

  images = [
    { src: '../../../../assets/img/Stall_1.svg', alt: 'Image 1' },
    { src: '../../../../assets/img/stall_2.png', alt: 'Image 2' },
    { src: '../../../../assets/img/main_c.png', alt: 'Image 3' },
    { src: '../../../../assets/img/last_img.png', alt: 'Image 4' }
  ];

  dynamicSlides = [
    {
      id: 1,
      src:'../../../../assets/img/menu/fills.jpg',
      alt:'Fills',
      title:'Fills'
    },
    {
      id: 2,
      src:'../../../../assets/img/menu/Aloo chat (2).png',
      alt:'Aloo chat',
      title:'Aloo chat'
    },
    {
      id: 3,
      src:'../../../../assets/img/menu/Batata puri (3).png',
      alt:'Batata puri',
      title:'Batata puri'
    },
    {
      id: 4,
      src:'../../../../assets/img/menu/Bhelmuri (4).png',
      alt:'Bhelmuri',
      title:'Bhelmuri'
    },
    {
      id: 5,
      src:'../../../../assets/img/menu/Dahi puri (1).png',
      alt:'Dahi puri',
      title:'Dahi puri'
    },
    {
      id: 6,
      src:'../../../../assets/img/menu/greenchilligarlicpuri.png',
      alt:'Green chilli garlic puri',
      title:'Green chilli garlic puri'
    },
    {
      id: 7,
      src:'../../../../assets/img/menu/Imli puri(2).png',
      alt:'Imli puri',
      title:'Imli puri'
    },
    {
      id: 8,
      src:'../../../../assets/img/menu/jhalmuri (6).png',
      alt:'Jhalmuri',
      title:'Jhalmuri'
    },
    {
      id: 9,
      src:'../../../../assets/img/menu/nibu puri (3).png',
      alt:'Nibu puri',
      title:'Nibu puri'
    },
    {
      id: 10,
      src:'../../../../assets/img/menu/Panipuri shots(1).png',
      alt:'Panipuri shots',
      title:'Panipuri shots'
    },
    {
      id: 11,
      src:'../../../../assets/img/menu/papdi chat (5).png',
      alt:'Papdi chat',
      title:'Papdi chat'
    },
    {
      id: 12,
      src:'../../../../assets/img/menu/RedChilliGarlicpuri.png',
      alt:'Red chilli garlic puri',
      title:'Red chilli garlic puri'
    },
    {
      id: 13,
      src:'../../../../assets/img/menu/sev puri (4).png',
      alt:'Sev puri',
      title:'Sev puri'
    },
  ]

  
  ComplianceeSlides = [
    {
      id: 1,
      // src:'../../../../assets/img/price/image 5.png',
      src:'../../../../assets/img/compliancee/aidea.png',
      alt:'aidea',
      title:'aidea'
    },
    {
      id: 2,
      src:'../../../../assets/img/compliancee/birac.png',
      alt:'birac',
      title:'birac'
    },
    {
      id: 3,
      src:'../../../../assets/img/compliancee/dst.png',
      alt:'dst',
      title:'dst'
    },
    {
      id: 4,
      src:'../../../../assets/img/compliancee/iit.png',
      alt:'iit',
      title:'iit'
    },
    {
      id: 5,
      src:'../../../../assets/img/compliancee/kiit.png',
      alt:'kiit',
      title:'kiit'
    },
    {
      id: 6,
      src:'../../../../assets/img/compliancee/meity.png',
      alt:'meity',
      title:'meity'
    },
    {
      id: 7,
      src:'../../../../assets/img/compliancee/msme.png',
      alt:'msme',
      title:'msme'
    },
    {
      id: 8,
      src:'../../../../assets/img/compliancee/so.png',
      alt:'so',
      title:'so'
    },
    {
      id: 9,
      src:'../../../../assets/img/compliancee/stpi.png',
      alt:'stpi',
      title:'stpi'
    },
    {
      id: 10,
      src:'../../../../assets/img/compliancee/tbic.png',
      alt:'tbic',
      title:'tbic'
    }

  ]

  ComplianceeOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    // navText: ['<i class="fas fa-angle-left fa-2x"></i>', '<i class="fas fa-angle-right fa-2x"></i>'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      }
    },
    nav: true
  }

  arrayLength = 10;

  config: Slick.Config = {
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: false,
      autoplay: false,
      speed: 500,
      centerMode: true,
      focusOnSelect: false,
      draggable: false,
      mouseWheelMove: false,
      prevArrow: '<button class="prev-arrow">Back</button>',
      nextArrow: '<button class="next-arrow">Next</button>',
      responsive: [
        {
          breakpoint: 600,
          settings: {
            arrows: false,
            slidesToShow: 1,
            infinite: true,
            centerPadding: '40px',
            centerMode: false,
            dots: true,
          }
        },
      ],
      
    }

  showModal = false;
  selectedImage: { src: string, alt: string } | undefined;


  constructor(private modalSvc: SimpleModalService ,private router: Router, private elementRef: ElementRef, private renderer: Renderer2) {}


  ngOnInit(): void {
   
   
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const script = this.renderer.createElement('script');
      script.src = '/assets/js/curator.js';
      this.renderer.appendChild(this.elementRef.nativeElement, script);
    }, 2000);
  }

  openModal(image: { src: string, alt: string }): void {
    this.selectedImage = image;
    this.showModal = true;
    document.body.style.overflow = 'hidden';

  }

  closeModal(): void {
    this.showModal = false;
    this.selectedImage = undefined;
    document.body.style.overflow = 'auto';

  }

  openSimpleModal() {
    this.modalSvc.addModal(
      ComingSoonComponent,
      {
        title: 'Alert',
        message: 'Coming Soon !!!',
      },
      {
        closeOnEscape: true,
        closeOnClickOutside: true,
      }
    );
  }

  getAboutVideoURL() {
    return environment.serverURL + '/getAboutVideo';
  }
  navigateToReadMore(){
    this.router.navigate(['/aboutus']);
  }

  recommendationExpand = false;
  expandRecommendation(value:boolean) {
   this.recommendationExpand = value;
  }
  galleryExpand = false;
  expandGallery(value:boolean) {
    this.galleryExpand = value;
   }

   blogExpand = false;
  expandBlog(value:boolean) {
    this.blogExpand = value;
   }
   socialExpand = false;
   expandSocial(value:boolean) {
    this.socialExpand = value;
   }

   patnetExpand = false;
   expandPatent(value:boolean) {
    this.patnetExpand = value;
   }

   googleReviewExpand = false;
   expandGoogleReview(value:boolean) {
    this.googleReviewExpand = value;
   }
}
