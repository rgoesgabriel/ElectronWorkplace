import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonServices } from 'src/app/controller/services/common.service';
import { GenericService } from 'src/app/controller/services/generic.service';
import { GestorDetalheComponent } from '../gestor-detalhe/gestor-detalhe.component';

@Component({
  selector: 'app-gestor-detalhe-info',
  templateUrl: './gestor-detalhe-info.component.html',
  styleUrls: ['./gestor-detalhe-info.component.css']
})
export class GestorDetalheInfoComponent implements OnInit {

  @ViewChild(GestorDetalheComponent) componetChild;

  //Comunicação entre componentes
  @Input() item: Array<any>;
  @Output() eventOutput = new EventEmitter;

  //Formulário e elementos
  detailForm: FormGroup = new FormGroup({});

  //Itens
  colaborador: any;
  
  //Booleans
  isInfo: boolean;

  constructor(
    private genericService: GenericService,
  ) { }

  //Inicia o componente
  ngOnInit(): void {
    this.setUrl();
  }

  //Função que define o tipo de endpoint
  setUrl(){
    this.genericService.tipoUrl('pessoa');
  }

  //função que seta os parâmetros para edição
  setFormDetail(item) {
    this.colaborador = item;
  }

  //Função que retorna para a listagem da tabela
  voltarListagem() {
    this.isInfo = false;

    this.detailForm.reset();
    this.eventOutput.emit();
  }

  //Função que abre a listagem de equipamentos
  alterar(event, pessoa){
    this.isInfo = false;
    this.componetChild.isDetail = true;
    this.componetChild.setFormDetail(pessoa)
  }

  //função que retorna a visão principal
  visaoDetalheInfo() {
    this.isInfo = false;
    this.eventOutput.emit();
  }
}
