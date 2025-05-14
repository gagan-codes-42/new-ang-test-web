import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface iBlogsWidgetService {
  blogId: string;
  content: string;
  date: number;
  formatted_uri: string;
  photo: string;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class BlogsWidgetService {
  constructor(private httpClient: HttpClient) {}

  getFactsAndFigures(): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.serverURL}/getAllBlogs`
    );
  }
}
