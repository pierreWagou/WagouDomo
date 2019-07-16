import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs'

import {User} from '../models/user.model'
import {UserService} from '../services/user.service'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  userSubscription : Subscription
  users: User[]

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userSubscription = this.userService.userSubject.subscribe(
      (users: User[]) => {this.users = users}
    )
    this.userService.emitUserSubject()
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe()
  }

}
