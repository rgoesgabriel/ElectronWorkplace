import { LocationStrategy } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-analista",
  templateUrl: "./analista.component.html",
  styleUrls: ["./analista.component.css"],
})
export class AnalistaComponent implements OnInit {

  abaAtiva: number = 0;

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

  getAbaAtiva() {
    return this.abaAtiva;
  }

  handleTabChange(e) {
    this.abaAtiva = e.index
    console.log(e.index);

  }
}
