import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss',
})
export class AddContactComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = new FormGroup<any>({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]{10}'), // Validates 10-digit phone number
      ]),

      email: new FormControl(null, [Validators.required, Validators.email]),
      address: new FormArray([
        new FormGroup({
          addressLocation: new FormControl(null, Validators.required),
        }),
      ]),
      longitude: new FormControl(
        { value: '', disabled: true },
        Validators.required,
      ),
      latitude: new FormControl(
        { value: '', disabled: true },
        Validators.required,
      ),
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

  // Function to set current location
  setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userForm.patchValue({
            longitude: position.coords.longitude.toString(),
            latitude: position.coords.latitude.toString(),
          });
        },
        (error) => {
          console.error('Error fetching location', error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Submitted', this.userForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
