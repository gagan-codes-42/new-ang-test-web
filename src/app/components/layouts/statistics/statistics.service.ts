import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface FactsAndFigures {
  customer: number;
  ePanipuriKartz: number;
  masterKitchen: number;
  panipuriShots: number;
  town: number;
  state: number;
}

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private httpClient: HttpClient) {}

  getFactsAndFigures(): Observable<FactsAndFigures> {
    return this.httpClient.get<FactsAndFigures>(
      `${environment.serverURL}/getFigures`
    );
  }
}
