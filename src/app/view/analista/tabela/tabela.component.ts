import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { Message, MessageService, PrimeNGConfig } from "primeng/api";
import { GenericService } from "src/app/controller/services/generic.service";
import { LoginService } from 'src/app/controller/services/login.service';
import { AnalistaDetalheInfoComponent } from '../analista-detalhe-info/analista-detalhe-info.component';
import { EquipamentoComponent } from '../equipamento/equipamento.component';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {

  /*
   abaAtiva define o redirecionamento dos itens da tabela
  */
  @Input() abaAtiva: number;

  @ViewChild(AnalistaDetalheInfoComponent) componetChild;
  @ViewChild(EquipamentoComponent) equipChild;

  //modelo
  pessoas: any[];

  //tabela
  cols: any[];

  //booleans
  isTable: boolean = true;
  separacao: boolean = false;
  aberto: boolean = false;

  //mensagem de aviso
  msg: Message[];

  constructor(
    private genericService: GenericService,
    private messageService: MessageService,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.setUrl();
    this.getTableInfo();
    this.setParamsTable();
    this.msg = [
      { severity: 'warn', detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consequat efficitur odio non malesuada. Quisque sed placerat nibh. In vitae nisl eu urna suscipit.' }
    ],
      this.primengConfig.ripple = true;
  }

  //função que define o tipo de endpoint
  setUrl() {
    this.genericService.tipoUrl("pessoa");
  }

  setParamsTable() {
    this.cols = [
      { field: "cargo", header: "Cargo", width: '40%', align: 'left' },
      { field: "localidade", header: "Localidade", width: '40%', align: 'left' },
      { field: "celula", header: "Célula", width: '40%', align: 'left' },
      { field: "cliente", header: "Cliente", width: '40%', align: 'left' },
      { field: "kit", header: "Kit Solicitado", width: '40%', align: 'left' },
    ];
  }

  //função que consulta as informações cadastradas
  getTableInfo() {
    this.genericService.get()
      .subscribe(
        (resp) => {
          if (resp.body === undefined) {
            this.pessoas = [];
          } else {
            this.pessoas = resp.body;
          }
        })
      , error => {
        this.messageService.clear();
        this.messageService.add({
          severity: "warn",
          summary: error.error.msg.summary,
          detail: error.error.msg.detail,
        });
      };
  }

  //função que define os parametros de edição para o elemento filho
  getRevisar(event, pessoa) {
    this.isTable = false;
    this.equipChild.setFormDetail(pessoa, this.abaAtiva);
    this.componetChild.setFormDetail(pessoa, this.abaAtiva);

  }

  //função que retorna a tela de card
  voltar() {
    if (localStorage.getItem('perfil') === 'analista') {
      this.loginService.logout();
      this.router.navigate(['']);
    } else if (localStorage.getItem('perfil') === 'administrador') {
      this.router.navigate(['home/card']);
    }
  }

  //função que retorna a visão principal
  visaoInicial() {
    this.isTable = true;
  }

}
