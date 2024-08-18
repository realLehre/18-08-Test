import { Component, inject } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { ContactTableComponent } from './contact-table/contact-table.component';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ContactTableComponent, MapComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  userService = inject(UserService);
  users = this.userService.users;

  ngOnInit() {
    console.log(this.users());
  }
}
