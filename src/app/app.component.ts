import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'first-decision-tet';
  toogled = false;

  toogleSidebar(toogled: boolean) {
    console.log(toogled)
    this.toogled = toogled;
  }
}
