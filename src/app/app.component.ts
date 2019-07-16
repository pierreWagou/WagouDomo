import { Component, OnInit, OnDestroy } from '@angular/core';

import {Observable, Subscription, interval} from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  secondes: number = 0
  counterSubscription: Subscription

  ngOnInit() {
    const counter = interval(1000)
    this.counterSubscription = counter.subscribe(
      (value) => {this.secondes=value},
      (error) => {console.log("error")},
      () => {console.log("Observable complete")}
    )
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe()
  }
}
