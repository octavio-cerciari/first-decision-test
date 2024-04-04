import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  theme = 'light-theme';
  darkMode() {
    console.log(this.theme)
    if (this.theme === 'light-theme') {
      this.theme = 'dark-theme'
      document.body.classList.toggle('dark-theme')
    }
    else {
      this.theme = 'light-theme'
      document.body.classList.remove('dark-theme')
    }
  }

}
