import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { share } from 'rxjs/operators';
import { FbAuthService } from 'src/app/shared/services/auth.service';
import { FactsAndFigures, StatisticsService } from './statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  figures$: Observable<FactsAndFigures> = of({
    customer: 0,
    ePanipuriKartz: 0,
    masterKitchen: 0,
    panipuriShots: 0,
    town: 0,
    state: 0,
  });
  constructor(
    private statsSvc: StatisticsService,
  ) {}

  ngOnInit(): void {
    this.getFactsAndFigures();
  }

  getFactsAndFigures(): void {
    this.figures$ = this.statsSvc.getFactsAndFigures().pipe(share());
  }
}
