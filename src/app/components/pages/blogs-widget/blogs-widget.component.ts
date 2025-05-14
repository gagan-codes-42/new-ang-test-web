import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BlogsWidgetService, iBlogsWidgetService } from './blogs-widget.service';
import { finalize, retry, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-blogs-widget',
  templateUrl: './blogs-widget.component.html',
  styleUrls: ['./blogs-widget.component.scss'],
})
export class BlogsWidgetComponent implements OnInit {
  private _unsubscribeAll: Subject<void> = new Subject<void>();
  constructor(private router: Router,  private blogService: BlogsWidgetService) {
    this._unsubscribeAll = new Subject();
  }
  isLoading = true;
  blogsData:iBlogsWidgetService[]= [];
  serverURL = environment.serverURL;

  ngOnInit(): void {
    this.getDataFromApi();
  }

  getDataFromApi(): void {
 
    this.blogService.getFactsAndFigures()
    .pipe(
        retry(3),
        takeUntil(this._unsubscribeAll.asObservable()),
        finalize(() => {
           this.isLoading = false
        })
    )
    .subscribe(
        (responses) => {
          console.log(responses);
            if (responses && responses.blogs) {
              this.blogsData = responses.blogs.slice(0, 3);
            }
        },
        (error) => {
          this.isLoading = false
        }
    );
  }



  changeBlogPage(event: any) {
    this.router.navigateByUrl(`/blog/${event.detail}`);
  }

}
