import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finalizacao',
  templateUrl: './finalizacao.component.html',
  styleUrls: ['./finalizacao.component.css']
})
export class FinalizacaoComponent implements OnInit {

  //itens
  colaborador: any;

  constructor(
    private location: LocationStrategy
  ) {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

  ngOnInit() {
  }

  //função que seta os parâmetros para edição
  getFormFinalizar() {
    this.colaborador;
  }

}
