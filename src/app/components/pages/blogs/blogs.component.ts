import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  constructor(private router: Router) {}

  serverURL = environment.serverURL;

  ngOnInit(): void {}

  changeBlogPage(event: any) {
    this.router.navigateByUrl(`/blog/${event.detail}`);
  }
}
