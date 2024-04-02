import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  toogled = false;
  @Output() toggleEvent = new EventEmitter<boolean>();
  toogleSidebar() {
    this.toogled = !this.toogled
    this.toggleEvent.emit(this.toogled);
  }
}
