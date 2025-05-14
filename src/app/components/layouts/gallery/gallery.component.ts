import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
interface Image {
  src: string;
  title?: string;
  alt?: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [
    trigger('activeSlide', [
      state('active', style({
        transform: 'scale(1.4)',
        opacity: 1,
      })),
      state('inActive', style({
        transform: 'scale(0.7)',
        opacity: 0.8,
      })),
      transition('active => inActive', [
        animate('0.5s')
      ]),
      transition('inActive => active', [
        animate('0.5s')
      ])
    ])
  ]
})
export class GalleryComponent implements OnInit {

  imagesData: Image[] = [
    {
      src: 'assets/img/panipuriFills.jpg',
      alt: '',
      title: ''
    },
    {
      src: 'assets/img/panipuriGups.jpg',
      alt: 'image',
      title: 'image'
    },
    {
      src: 'assets/img/ppStock.png',
      alt: 'image',
      title: 'image'
    },
    {
      src: 'assets/img/panipuriShots2.png',
      alt: 'image',
      title: 'image'
    },
    {
      src: 'assets/img/Pani-Puri-4.jpeg',
      alt: 'image',
      title: 'image'
    },
    {
      src: 'assets/img/panipuriTop.jpg',
      alt: 'image',
      title: 'image'
    }
  ];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    center: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 1
      }
    },
    autoplay: true,
    autoplaySpeed: 1000,
  }
  constructor() { }
 

  ngOnInit(): void {
  }

}
