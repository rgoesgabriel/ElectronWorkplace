import { LocationStrategy } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GenericService } from 'src/app/controller/services/generic.service';
import { CadastroDetalheComponent } from './cadastro-detalhe/cadastro-detalhe.component';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  //comunicação entre componetes
  @ViewChild(CadastroDetalheComponent) componetChild;

  //modelo
  itens: any[];

  //tabela
  cols: any[];

  //booleans
  showDetail: boolean = true;
  isError: boolean;

  constructor(
    private genericService: GenericService,
    private messageService: MessageService,
    private router: Router,
    private location: LocationStrategy
  ) {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

  //função que inicia o componente
  ngOnInit() {
    this.getTableInfo();
    this.setParamsTable();
  }

  //função que define os parâmetros para a criação da tabela
  setParamsTable() {
    this.cols = [
      { field: 'usuarioRede', header: 'Usuário', width: '10%', align: 'left' },
      { field: 'nome', header: 'Nome', width: '30%', align: 'left' },
      { field: 'celula', header: 'Célula', width: '10%', align: 'left' },
      { field: 'matricula', header: 'Matrícula', width: '10%', align: 'left' },
      { field: 'perfil', header: 'Perfil', width: '15%', align: 'left' },
    ];
  }

  //função que consulta as informações cadastradas
  getTableInfo() {
    this.genericService.tipoUrl('gestao_acesso/init');
    this.genericService.get()
      .subscribe(
        (resp) => {
          if (resp.body === undefined) {
            this.itens = [];
          } else {
            this.itens = resp.body;
            this.isError = false;
          }
        }, error => {
          this.isError = true;
          this.messageService.clear();
          this.messageService.add({
            severity: 'warn',
            summary: error.error.msg.summary,
            detail: error.error.msg.detail
          });
        }
      );
  }

  //função que define os parametros de adição para o elemento filho
  getAdicionar() {
    this.componetChild.setFormAdd();
  }

  //função que define os parametros de edição para o elemento filho
  getEditar(event, item) {
    this.componetChild.setFormEdit(item);
  }

  //função que define os parametros de exclusão para o elemento filho
  getExcluir(event, item) {
    this.componetChild.setFormRemove(item);
  }

  //função que retorna a tela de card
  voltar() {
    this.router.navigate(['home/card']);
  }

  //função que retorna a visão principal
  visaoInicial() {
    /* this.showDetail = true; */
  }

}