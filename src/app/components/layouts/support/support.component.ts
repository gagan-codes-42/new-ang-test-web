import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  animations: [
    trigger('activeSlide', [
      state('active', style({
        transform: 'scale(1.1)',
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
export class SupportComponent implements OnInit { 
  supportedbyObj: any;
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
  constructor() {}

  ngOnInit(): void {
    this.supportedbyObj = [
      {
        url: 'https://www.smvdutbic.org/',
        imgSrc: 'assets/img/smvdu.png',
        title: 'Shri Mata Vaishno Devi University, Katra Jammu',
      },
      {
        url: 'http://ntibif.com/ ',
        imgSrc: 'assets/img/ntibif.png',
        title:
          'National Institute of Food Technology, Sonipat',
      },
      {
        url: 'http://icentre.iiitkottayam.ac.in/',
        imgSrc: 'assets/img/icentre.png',
        title: 'Indian Institute Of Information Technology, Kottayam',
      },
      {
        url: 'https://ihmranchi.in/',
        imgSrc: 'assets/img/ihm.png',
        title: 'Institute Of Hotel Management, Ranchi',
      },
    ];
  }
}
