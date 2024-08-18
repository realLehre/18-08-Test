import { Injectable, signal } from '@angular/core';
import { UserData } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users = signal<UserData[]>([]);
  constructor() {
    const users = JSON.parse(localStorage.getItem('users')!);
    if (users) {
      this.users.set(users);
    }
  }
}
