// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserModalComponent } from './user/user-modal/user-modal.component';

// Prividers
import { provideAnimations } from '@angular/platform-browser/animations';


// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import {MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule} from '@angular/material/radio';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NavbarComponent,
    SidebarComponent,
    UserModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatRadioModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    FormsModule,
    CommonModule,
  ],
  providers: [provideAnimations(), provideEnvironmentNgxMask(),{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'blue' },
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
