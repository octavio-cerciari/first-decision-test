import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserInterface } from 'src/core/models/user.interface';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})

export class UserModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: UserInterface,
    ) {}
  tags = [] as string[];
  selectedLanguage = '';
  userForm = new FormGroup( {
    name: new FormControl( '', [Validators.required] ),
    lastName: new FormControl( '', [Validators.required] ),
    phone: new FormControl( '', [Validators.required] ),
    email: new FormControl( '', [Validators.email, Validators.required] ),
    profile: new FormControl( '', [Validators.required] ),
    language: new FormControl( '', [Validators.required] ),
  } );

  ngOnInit(): void {
    if(this.data) {this.loadForm(this.data)}
  }

  loadForm(user: UserInterface) {
    this.userForm.controls.name.setValue(user.name);
    this.userForm.controls.lastName.setValue(user.lastName);
    this.userForm.controls.phone.setValue(user.phone);
    this.userForm.controls.email.setValue(user.email);
    this.userForm.controls.language.setValue(user.language);    
  }

  closeModal() {
    this.dialogRef.close();
  }

  sendInvite(newInvite: boolean) {
    // if(this.userForm.invalid) return
    this.dialogRef.close( { user: this.userForm.value, newInvite } );
  }
}
