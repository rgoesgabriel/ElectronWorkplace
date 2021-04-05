import { LocationStrategy } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GenericService } from 'src/app/controller/services/generic.service';
import { LoginService } from 'src/app/controller/services/login.service';
import { AprovacaoDetalheComponent } from './aprovacao-detalhe/aprovacao-detalhe.component';

@Component({
  selector: 'app-aprovacao',
  templateUrl: './aprovacao.component.html',
  styleUrls: ['./aprovacao.component.css']
})
export class AprovacaoComponent implements OnInit {

  //comunicação entre componetes
  @ViewChild(AprovacaoDetalheComponent) componetChild;

  //modelo
  vagas: any[];

  //tabela
  cols: any[];

  //booleans
  showDetail: boolean = true;

  constructor(
    private genericService: GenericService,
    private messageService: MessageService,
    private router: Router,
    private location: LocationStrategy,
    private loginService: LoginService
  ) {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

  //função que inicia o componente
  ngOnInit() {
    this.setUrl();
    this.getTableInfo();
    this.setParamsTable();
  }

  //função que define o tipo de endpoint 
  setUrl() {
    this.genericService.tipoUrl('init');
  }

  //função que define os parâmetros para a criação da tabela
  setParamsTable() {
    this.cols = [
      { field: 'name', header: 'Cargo', width: '40%', align: 'left' },
      { field: 'localidade', header: 'Localidade', width: '40%', align: 'left' },
      { field: 'cell_code', header: 'Célula', width: '40%', align: 'left' },
      { field: 'client_name', header: 'Cliente', width: '40%', align: 'left' },
      { field: 'investimento', header: 'Investimento', width: '40%', align: 'left' },
    ];
  }

  //função que consulta as informações cadastradas
  getTableInfo() {
    this.genericService.get()
      .subscribe(
        (resp) => {
          if (resp.body === undefined) {
            this.vagas = [];
          } else {
            this.vagas = resp.body;
            console.log("vagas", this.vagas);
          }
        })
      , error => {
        this.messageService.clear();
        this.messageService.add({
          severity: 'warn',
          summary: error.error.msg.summary,
          detail: error.error.msg.detail
        });
      }
  }

  //função que define os parametros de edição para o elemento filho
  getRevisar(event, vaga) {
    this.showDetail = false;
    this.componetChild.isDetail = true;
    this.componetChild.setFormDetail(vaga);
  }

  //função que retorna a tela de card
  voltar() {
    if (localStorage.getItem('perfil') === 'diretor') {
      this.loginService.logout();
      this.router.navigate(['']);
    } else if (localStorage.getItem('perfil') === 'administrador') {
      this.router.navigate(['home/card']);
    }
  }

  //função que retorna a visão principal
  visaoInicial() {
    this.showDetail = true;
  }

}