import {User} from '../models/user.model'
import {Subject} from 'rxjs'

export class UserService {

  userSubject = new Subject<User[]>()

  private users: User[] = [
    new User("Pierre", "Wagou", "pierre.wagou@wagou.com", "biere", ["coder", "boire"])
  ]


  emitUserSubject() {
    this.userSubject.next(this.users.slice())
  }

  addUser(user: User) {
    this.users.push(user)
    this.emitUserSubject()
  }
}
