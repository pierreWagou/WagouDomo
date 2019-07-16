import { Component, OnInit, OnDestroy } from '@angular/core';
import {AppareilService} from '../services/appareil.service'
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {

  isAuth = false
  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date()
    setTimeout(() => {resolve(date)}, 2000)
  })

  appareils: any[]
  appareilsSubscription: Subscription

  constructor(private appareilService: AppareilService) {
    setTimeout(() => {
      this.isAuth = true
    }, 4000)
  }

  ngOnInit() {
    this.appareilsSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareils: any[]) => {this.appareils = appareils}
    )
    this.appareilService.emitAppareilsSubject()
  }

  onAllumer() {
    this.appareilService.switchOnAll()
  }

  onEteindre() {
    if(confirm("Etes-vous sûr de vouloir tout éteindre ?")) {
      this.appareilService.switchOffAll()
    }
  }

  onSave() {
    this.appareilService.saveAppareilToServer()
  }

  onFetch() {
    this.appareilService.getAppareilFromServer()
  }

  ngOnDestroy() {
    this.appareilsSubscription.unsubscribe()
  }
}
