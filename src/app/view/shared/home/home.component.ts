import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        // navegação inicial
        if (val.url === '/home') {
          this.ngOnInit();
        }
      }

      if (val instanceof NavigationEnd) {
        // navegação final
        if (val.url === '/home') {
          this.ngOnInit();
        }
      }
    });
  }

  ngOnInit() {
    this.router.navigate(['home/card']);
  }

}
