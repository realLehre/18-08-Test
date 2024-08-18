import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { UserService } from '../../core/services/user.service';
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit, AfterViewInit {
  userService = inject(UserService);
  users = this.userService.users;
  private map!: L.Map;
  defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initializeMap();
    this.addMarkers();
  }

  initializeMap() {
    if (this.users().length > 0) {
      const initialUser = this.users()[0];
      const initialLatitude = +initialUser.latitude;
      const initialLongitude = +initialUser.longitude;

      this.map = L.map('map').setView([initialLatitude, initialLongitude], 10);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);
    }
  }

  addMarkers() {
    this.users().forEach((user, index) => {
      const marker = L.marker([+user.latitude, +user.longitude], {
        icon: this.defaultIcon,
      }).addTo(this.map);
      marker
        .bindPopup(
          `<b>${index + 1}. ${user.name}</b><br>Phone: ${user.phone}<br>Email: ${user.email}`,
        )
        .openPopup();
    });
  }
}
