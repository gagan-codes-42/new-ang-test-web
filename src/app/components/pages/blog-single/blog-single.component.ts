import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-single',
  templateUrl: './blog-single.component.html',
  styleUrls: ['./blog-single.component.scss'],
})
export class BlogSingleComponent implements OnInit {
  constructor(private routerActive: ActivatedRoute, private router: Router) {}

  serverURL = environment.serverURL;
  blogTitle = '';

  ngOnInit(): void {
    this.blogTitle = this.routerActive.snapshot.params.blogTitle;
  }

  showHomePage() {
    this.router.navigateByUrl(`/blogs`);
  }
}
