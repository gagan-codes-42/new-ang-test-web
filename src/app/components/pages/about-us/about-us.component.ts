import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  teamList :any;

  teamData = [
    {
      img: '../../../../assets/img/team/Harish.png',
      name: 'Harish Neotia',
      position: '- Founder & CEO',
      linkedIn: 'https://www.linkedin.com/in/epanipuricart',
      intro: 'As a B.Com Dropout from Vanijya Mahavidyalaya, Patna University worked around 18 years in Telecom Industry, have done Mobile Handset Distribution , Manufacturing Mobile Accessories turned into Food Entrepreneur. His journey was never easy but the desire to bring something new to plate , kept him going ! And , as such , he founded "E-panipurii kartz" with Manisha Neotia his Work-Life partner.',
      quote: 'Our Products & offering are the perfect opportunity for those who have an Entrepreneurial appetite and propensity to progress at a good pace. With a proven business model, High returns on Investment, Competitive Price, Quality Ingredients, Best Service, and Enriched Customer Experience, we are seekingPartners Pan India to become a part of our vision to serve panipuri with a smile at the doorstep of all Indians.'
    },
    {
      img: '../../../../assets/img/team/Manisha.png',
      name: 'Manisha Neotia',
      position: '- Promoter & Director',
      linkedIn: 'https://www.linkedin.com/in/manisha-neotia',
      intro: 'A Commerce Background , Home maker , after tying the knot in 2005 could never shake her spirit to learn and do better each day. I.com from Marwari college gave her a basic knowledge about the business world and then, in partnership with her husband, she started her entrepreneur journey.',
      quote: 'That hustle of having mouthful panipuri while being ready for another shot shouldn’t stop. With E-Panipurii Kartz, we are enabling and changing the traditional way of running the business of panipuri. We introduce the new era and face of the Panipuri business, keeping taste, health, and hygiene intact.'
    },
    {
      img: '../../../../assets/img/team/Jyoti.png',
      name: 'Jyoti Prakash Sahoo',
      position: '- Co-Founder & CTO',
      linkedIn: 'https://www.linkedin.com/in/jps-16',
      intro: 'An Enthusiastic Entrepreneur who aims at providing technogical solutions. Interested in IoT , AI , AR.He belongs to Bhubneshwar , Capital of Odisha. He have done B.Tech in Electrical Engineering from College of Engineering and Technology, Bhubneshwar.He has total work experience of 6 years and has founded previously EupepTechnologies. He will be heading our IT department.',
      quote: 'We are providing IoT solutions for Remote access of our Food cart operated by Mobile App. Featuring Advanced safety features using sensor based Technolgy.'
    },
    {
      img: '../../../../assets/img/team/Dibya.png',
      name: 'Dibya Sundar Rath',
      position: '- Co-Founder & Chief Product Officer',
      linkedIn: 'https://www.linkedin.com/in/dibya-sundar-003b6887',
      intro: 'An Enthusiastic Entrepreneur who aims to provide Mechanical & Electrical solutions.&nbsp;He belongs to Bhubaneswar , the Capital of Odisha. He has done a Master In Science from IIT, Kharagpur. He has a total work experience of 6 years in Electrical Engineering and has founded Prime Technologies . He will be C0-heading our workshop in Bhubaneswar for the entire production.',
      quote: 'We are providing a Robust system designed for hassle-free interface with the Hardware and remote server to ensure smooth operation of our Machines.'
    }
  ]
  
  constructor() { }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    center: true,
    nav: false,
    
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    autoplay: true,
    autoplaySpeed: 1000,
  }
  ngOnInit(): void {
    /*
    this.teamList = [
      {
        url: 'https://www.linkedin.com/in/epanipuricart?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BIkhzJiVSTQOcV%2FQF8ErCqg%3D%3D',
        imgSrc: 'assets/img/harishNew.jpg',
        title: 'Harish Neotia',
        designation:"CEO"
      },
      {
        url: 'https://www.linkedin.com/in/epanipuricart?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BIkhzJiVSTQOcV%2FQF8ErCqg%3D%3D ',
        imgSrc: 'assets/img/cool_avatar.png',
        title:
          'Tanya Raj',
          designation:"CTO"
      },
      {
        url: 'https://www.linkedin.com/in/epanipuricart?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BIkhzJiVSTQOcV%2FQF8ErCqg%3D%3D',
        imgSrc: 'assets/img/cool_avatar.png',
        title: 'Pradeep Shukla',
        designation:"CFO"
      },
      {
        url: 'https://www.linkedin.com/in/jps-16',
        imgSrc: 'assets/img/cool_avatar.png',
        title: 'Jyoti Prakash Sahoo',
        designation:"CPO"
      },
    ];
    */

    

    this.teamList = [
      {
        url: 'https://www.linkedin.com/in/epanipuricart?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BIkhzJiVSTQOcV%2FQF8ErCqg%3D%3D',
        imgSrc: 'assets/img/harishNew.jpg',
        title: 'Harish Neotia',
        designation:"Founding Director",
        discription: "",
      },
      {
        url: 'https://www.linkedin.com/in/epanipuricart?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BIkhzJiVSTQOcV%2FQF8ErCqg%3D%3D ',
        imgSrc: 'assets/img/cool_avatar.png',
        title: 'Manisha Neotia',
        designation:"Founding Director",
        discription: "",
      },
      {
        url: 'https://www.linkedin.com/in/epanipuricart?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BIkhzJiVSTQOcV%2FQF8ErCqg%3D%3D',
        imgSrc: 'assets/img/cool_avatar.png',
        title: 'Jyoti Prakash Sahoo',
        designation:"CTO",
        discription: "",
      },
      {
        url: 'https://www.linkedin.com/in/jps-16',
        imgSrc: 'assets/img/cool_avatar.png',
        title: 'Dibya Sundar Rath',
        designation:"Chief Product Officer",
        discription: "",
      },
    ];
  

  }

}
