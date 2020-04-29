import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

import {Subject} from 'rxjs'

@Injectable()
export class AppareilService {

  appareilsSubject = new Subject<any[]>()

  private appareils = [
   //  {
   //    id: 1,
   //    name: 'Machine à laver',
   //    status: 'éteint'
   // },
   // {
   //    id: 2,
   //    name: 'Frigo',
   //    status: 'allumé'
   // },
   // {
   //    id: 3,
   //    name: 'Ordinateur',
   //    status: 'éteint'
   // }
 ]

 constructor(private httpClient: HttpClient) {}

 getAppareilById(id: number) {
  const appareil = this.appareils.find(
    (s) => {return s.id===id}
  )
  return appareil
 }

 emitAppareilsSubject() {
   this.appareilsSubject.next(this.appareils.slice())
 }

 switchOnAll() {
   for (let appareil of this.appareils) {
     appareil.status = "allumé"
   }
   this.emitAppareilsSubject()
 }

 switchOffAll() {
   for (let appareil of this.appareils) {
     appareil.status = "éteint"
     this.emitAppareilsSubject()
   }
 }

 switchOn(i: number) {
   this.appareils[i].status = "allumé"
   this.emitAppareilsSubject()
 }

 switchOff(i: number) {
   this.appareils[i].status = "éteint"
   this.emitAppareilsSubject()
 }

 addAppareil(name: string, status: string) {
   const appareil = {
     id: 0,
     name: "",
     status: ""
   }
   appareil.name = name
   appareil.status = status
   appareil.id = this.appareils[this.appareils.length-1].id + 1
   this.appareils.push(appareil)
   this.emitAppareilsSubject()
 }

 saveAppareilToServer() {
  this.httpClient
    .put("https://wagoudomo.firebaseio.com/appareils.json", this.appareils)
    .subscribe(
      () => {console.log("save")},
      (error) => {console.log("error")}
    )
 }

 getAppareilFromServer() {
  this.httpClient
    .get<any[]>("https://wagoudomo.firebaseio.com/appareils/-LjqlccivbUWHGELjGyU.json")
    .subscribe(
      (response) => {
        this.appareils = response
        console.log(this.appareils)
        this.emitAppareilsSubject()
      },
      (error) => {console.log("error")}
    )
 }

}
