import { Component, inject } from '@angular/core';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-contact-table',
  standalone: true,
  imports: [],
  templateUrl: './contact-table.component.html',
  styleUrl: './contact-table.component.scss',
})
export class ContactTableComponent {
  userService = inject(UserService);
  users = this.userService.users;
}
