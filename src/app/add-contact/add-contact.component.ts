import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { UserData } from '../core/model/user.model';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss',
})
export class AddContactComponent implements OnInit {
  userService = inject(UserService);
  userForm!: FormGroup;
  userDetails: UserData[] = this.userService.users();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = new FormGroup<any>({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]{10}'),
      ]),

      email: new FormControl(null, [Validators.required, Validators.email]),
      address: new FormArray([
        new FormGroup({
          addressLocation: new FormControl(null, Validators.required),
        }),
      ]),
      longitude: new FormControl(null, Validators.required),
      latitude: new FormControl(null, Validators.required),
    });

    this.setCurrentLocation();
  }

  get address() {
    return <FormArray>this.userForm.get('address');
  }

  onAddNewAddress() {
    this.address.push(
      new FormGroup({
        addressLocation: new FormControl(null, Validators.required),
      }),
    );
  }

  onRemoveAddress(index: number) {
    this.address.removeAt(index);
  }

  setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userForm.patchValue({
            longitude: position.coords.longitude.toString(),
            latitude: position.coords.latitude.toString(),
          });
        },
        (error) => {},
      );
    } else {
    }
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.userDetails.push(this.userForm.value);
    this.userService.users.set(this.userDetails);
    localStorage.setItem('users', JSON.stringify(this.userDetails));
    this.userForm.reset();
  }
}
