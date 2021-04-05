import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { GenericService } from 'src/app/controller/services/generic.service';
import { AnalistaDetalheComponent } from '../analista-detalhe/analista-detalhe.component';
import { Message, PrimeNGConfig } from "primeng/api";

@Component({
  selector: 'app-analista-detalhe-info',
  templateUrl: './analista-detalhe-info.component.html',
  styleUrls: ['./analista-detalhe-info.component.css']
})
export class AnalistaDetalheInfoComponent implements OnInit {

  @ViewChild(AnalistaDetalheComponent) componetChild;

  //Comunicação entre componentes
  @Input() item: Array<any>;
  @Output() eventOutput = new EventEmitter;

  //Formulário e elementos
  detailForm: FormGroup = new FormGroup({});

  //Itens
  colaborador: any;

  //boleanos
  showWarning: boolean = true;
  showInfo: boolean = false;

  //Mensagem de aviso
  msg: Message[];

  constructor(
    private genericService: GenericService,
    private primengConfig: PrimeNGConfig
  ) { }

  //Inicia o componente
  ngOnInit(): void {
    this.setUrl();
    this.msg = [
      {severity:'warn', detail:'Separe os materiais requisitados dentro do estoque para aguardar o anexo de um profissional a vaga. Avance após realizar a ação.'}
    ],
    this.primengConfig.ripple = true;
  }

  //função responsável por dispensar o alerta 
  fecharAviso(){
    this.showWarning = false;
  }

  //Função que define o tipo de endpoint
  setUrl() {
    this.genericService.tipoUrl('pessoa');
  }

  //função que seta os parâmetros para edição
  setFormDetail(item, aba) {
    this.colaborador = item;
    aba == 1 ? this.showInfo = true : this.showInfo = false;
  }

  //Função que retorna para a listagem da tabela
  voltarListagem() {
    this.showInfo = false;
    this.detailForm.reset();
    this.eventOutput.emit();
  }

  //Função que abre a listagem de equipamentos
  alterar(event, pessoa) {
    this.showInfo = false;
    this.eventOutput.emit();
  }

  //função que retorna a visão principal
  visaoDetalheInfo() {
    this.showInfo = false;  
    this.eventOutput.emit();
  }
}
