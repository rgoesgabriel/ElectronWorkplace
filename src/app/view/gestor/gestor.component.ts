import { LocationStrategy } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-gestor",
  templateUrl: "./gestor.component.html",
  styleUrls: ["./gestor.component.css"],
})
export class GestorComponent implements OnInit {
  constructor(
    private location: LocationStrategy
  ) {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

  //função que inicia o componente
  ngOnInit() {
  }
}
