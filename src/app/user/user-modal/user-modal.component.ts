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
  selectedProfile = '';
  selectedPreferredContact = '';

  userForm = new FormGroup( {
    name: new FormControl( '', [Validators.required, Validators.min(3), Validators.min(20)] ),
    lastName: new FormControl( '', [Validators.required, Validators.min(3), Validators.min(20)] ),
    phone: new FormControl( '', [Validators.required]),
    email: new FormControl( '', [Validators.email, Validators.required, Validators.min(3), Validators.min(20)] ),
    profile: new FormControl( '', [Validators.required] ),
    language: new FormControl( '', [Validators.required] ),
    preferredContact: new FormControl( '', [Validators.required] ),
  } );

  ngOnInit(): void {
    if(this.data) {this.loadForm(this.data)}
  }

  loadForm(user: UserInterface) {
    this.userForm.controls.name.setValue(user.name);
    this.userForm.controls.lastName.setValue(user.lastName);
    this.userForm.controls.phone.setValue(user.phone);
    this.userForm.controls.email.setValue(user.email);
    this.selectedLanguage = user.language;
    this.selectedProfile = user.profile;
    this.selectedPreferredContact = user.preferredContact;
  }

  closeModal() {
    this.dialogRef.close();
  }

  changeContact(value: string) {
    this.selectedPreferredContact = value;
  }

  sendInvite(newInvite: boolean) {
    if(this.userForm.invalid || !this.selectedPreferredContact) return

    let user = {
      name: this.userForm.controls.name.value,
      lastName: this.userForm.controls.lastName.value,
      email: this.userForm.controls.email.value,
      phone: this.userForm.controls.phone.value,
      preferredContact: this.selectedPreferredContact,
      status: 'Pendente',
      profile: this.selectedProfile,
      language: this.selectedLanguage,
      createdDate: new Date().toLocaleDateString(),
      lastAccess: new Date().toLocaleDateString() + ' às ' + new Date().getHours() + ':' + new Date().getMinutes() + 'h',
    } as UserInterface;
    this.dialogRef.close( { user, newInvite } );
  }
}
