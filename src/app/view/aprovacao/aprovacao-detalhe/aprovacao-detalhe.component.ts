import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonServices } from 'src/app/controller/services/common.service';
import { GenericService } from 'src/app/controller/services/generic.service';
import { Mensagens } from '../../shared/components/mensagens-ptbr';

@Component({
  selector: 'app-aprovacao-detalhe',
  templateUrl: './aprovacao-detalhe.component.html',
  styleUrls: ['./aprovacao-detalhe.component.css']
})
export class AprovacaoDetalheComponent implements OnInit {

  //comunicação entre componetes
  @Input() item: Array<any>;
  @Output() eventOutput = new EventEmitter;

  equips: any;

  //formulário e elementos
  detailForm: FormGroup;

  //itens
  colaborador: any;
  radioOpstions: any[];

  //opções de revisão dos equipamentos
  reviewCelular: any;
  reviewPlano: any;
  reviewEquipamento: any;
  reviewLicensa: any;

  //booleans
  isDetail: boolean;
  isReview: boolean;
  isValid: boolean;
  isAdvanced: boolean;
  isFinalizar: boolean;

  isCelular: boolean = false;
  isPlano: boolean = false;
  isEquipamento: boolean = false;
  isLicensa: boolean = false;

  constructor(
    private genericService: GenericService,
    private messageService: MessageService,
    private commonServices: CommonServices,
    private router: Router
  ) { }

  //função que inicia o componente
  ngOnInit() {
    this.formComponent();
    this.initOptions(localStorage.getItem('language'));
  }

  //função que retorna as informações da vaga selecionada
  getInfo() {
    this.genericService.tipoUrl('equip/' + this.colaborador.code)
    this.genericService.get()
      .subscribe(
        (resp) => {
          if (resp.body === undefined) {
            this.equips = [];
          } else {
            this.equips = resp.body;
            console.log('equipamento da vaga ' + this.colaborador.code, this.equips);
            this.getInvestimentoTotal();
            this.setTiposEquipamentos();
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

  //Função que submete as revisões do diretor
  submit(){
    this.genericService.tipoUrl('diretor/review/equi/' + this.colaborador.code);
    
    let vagaDiretor = this.isReview ? this.setObjetoRevisao(this.equips): this.setObjetoSemRevisao(this.equips);
    
    this.genericService.post(vagaDiretor)
      .subscribe(
        (resp) => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'success',
            summary: Mensagens.DiretorReviewSummary,
            detail: Mensagens.DiretorReviewDetail
          });
          this.eventOutput.emit();
          this.detailForm.reset();
          this.isAdvanced = false;
          this.isReview = false;
          this.isDetail = false;
        }, error => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'warn',
            summary: error.error.msg.summary,
            detail: error.error.msg.detail
          });
          this.detailForm.reset();
        }
      )
  }

  //função que define o formulário 
  formComponent() {
    this.detailForm = new FormGroup({
      celular: new FormControl(),
      celularItem: new FormControl(),
      celularOpt: new FormControl(),
      celularObservacao: new FormControl(),

      plano: new FormControl(),
      planoItem: new FormControl(),
      planoOpt: new FormControl(),
      planoObservacao: new FormControl(),

      equipamentos: new FormControl(),
      equipamentoItem: new FormControl(),
      equipamentoOpt: new FormControl(),
      equipamentoObservacao: new FormControl(),

      licensa: new FormControl(),
      licencaItem: new FormControl(),
      licencaOpt: new FormControl(),
      licencaObservacao: new FormControl(),
    });
  }

  //Função que define os tipos de equipamentos relacionados à vaga selecionada.
  setTiposEquipamentos(){
    this.isCelular = false;
    this.isPlano = false;
    this.isEquipamento = false;
    this.isLicensa = false;
    
    this.equips.map(equip => {
      if (equip.nome === "CELULAR") {
        console.log(equip.nome)
        this.isCelular = true;
      }
      if (equip.nome === "EQUIPAMENTOS") {
        console.log(equip.nome)
        this.isEquipamento = true;
      }
      if (equip.nome === "PLANO MÓVEL") {
        console.log(equip.nome)
        this.isPlano = true;
      }
      if (equip.nome === "LICENÇAS E SOFTWARES") {
        console.log(equip.nome)
        this.isLicensa = true;
      }
    })
  }

  //função que seta os parâmetros para edição
  setFormDetail(item) {
    this.colaborador = item;
    this.getInfo();
  }

  //função que retorna o valor total do investimento
  getInvestimentoTotal() {
    if (this.equips) {
      const valor = this.equips.map((equip, valor) => valor + equip.custo);
      return valor[0];
    }
    return 0;
    
  }

  //função que habilita a opção de revisar os itens
  revisar() {
    this.isReview = true;
  }

  //função que aprova as informações retornadas
  aprovar() {
    this.isDetail = false;
    this.isFinalizar = true;
  }

  //função que finaliza o fluxo de revisão do itens
  enviar() {
    this.isDetail = false;
    this.isFinalizar = true;
  }

  //função que inicializa as opções do radioButton
  initOptions(element) {
    if (element) {
      if (element === 'pt-br') {
        this.radioOpstions = [
          { name: 'Custos', key: 'custos' },
          { name: 'Adequação ao cargo', key: 'adequacao' },
          { name: 'Estoque', key: 'estoque' },
          { name: 'Outros motivos', key: 'outro' },
        ];
      } else if (element === 'en-us') {
        this.radioOpstions = [
          { name: 'Costs', key: 'custos' },
          { name: 'Suitability for the position', key: 'adequacao' },
          { name: 'Stock', key: 'estoque' },
          { name: 'Other reasons', key: 'outro' },
        ];
      } else if (element === 'es-es') {
        this.radioOpstions = [
          { name: 'Costos', key: 'custos' },
          { name: 'Idoneidad para el puesto', key: 'adequacao' },
          { name: 'Stock', key: 'estoque' },
          { name: 'Otras razones', key: 'outro' },
        ];
      }
    } else {
      this.radioOpstions = [
        { name: 'Custos', key: 'custos' },
        { name: 'Adequação ao cargo', key: 'adequacao' },
        { name: 'Estoque', key: 'estoque' },
        { name: 'Outros motivos', key: 'outro' },
      ];
    }
  }

  //função que verifica se existem itens selecionados
  getSelectItem(element) {
    if (
      this.detailForm.controls.celular.value === true ||
      this.detailForm.controls.plano.value === true ||
      this.detailForm.controls.equipamentos.value === true ||
      this.detailForm.controls.licensa.value === true
    ) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }

  // Função que valida a entrada de dados do campo de observação
  validaObservacao(observacao: String){
    if (observacao) {
      return observacao.trim().length > 0
    }
  }


  setObjetoSemRevisao(equipamentoSemReview) {
    let equipsNaoRevisados = [];

    //Monta o objeto de retorno para os equipamentos do tipo  CELULAR
    if (this.isCelular) {
      let equip = equipamentoSemReview.reduce(element => element.nome === "CELULAR");

      equip.observacao = null;
      equip.option = null;

      delete equip.custo;
      delete equip.descricao;

      equipsNaoRevisados.push(equip)
    }

    //Monta o objeto de retorno para os equipamentos do tipo  EQUIPAMENTOS
    if (this.isEquipamento) {
      let equip = equipamentoSemReview.reduce(element => element.nome === "EQUIPAMENTOS");

      equip.observacao = null;
      equip.option = null;

      delete equip.custo;
      delete equip.descricao;

      equipsNaoRevisados.push(equip)
    }

    //Monta o objeto de retorno para os equipamentos do tipo  PLANO MÓVEL
    if (this.isPlano) {
      let equip = equipamentoSemReview.reduce(element => element.nome === "PLANO MÓVEL");

      equip.observacao = null;
      equip.option = null;

      delete equip.custo;
      delete equip.descricao;

      equipsNaoRevisados.push(equip)
    }

    //Monta o objeto de retorno para os equipamentos do tipo  LICENÇAS E SOFTWARES
    if (this.isLicensa) {
      let equip = equipamentoSemReview.reduce(element => element.nome === "LICENÇAS E SOFTWARES");

      equip.observacao = null;
      equip.option = null;

      delete equip.custo;
      delete equip.descricao;

      equipsNaoRevisados.push(equip)
    }

    return equipsNaoRevisados;
  }

  //Função que insere em cada objeto as informações relativas à revisão
  setObjetoRevisao(equipamentoReview){
    let equipsRevisados = []
    
    //Adiciona a observação e a opção para os equipamentos do tipo CELULAR
    if (this.isCelular) {
      let equip = equipamentoReview.reduce(element=> element.nome === "CELULAR");
      
      this.validaObservacao(this.detailForm.controls.celularObservacao.value) ?
        equip.observacao = this.detailForm.controls.celularObservacao.value.trim() :
        equip.observacao = null
      equip.option = this.detailForm.controls.celularOpt.value.name;

      delete equip.custo;
      delete equip.descricao;

      equipsRevisados.push(equip)
    }

    //Adiciona a observação e a opção para os equipamentos do tipo EQUIPAMENTOS
    if (this.isEquipamento) {
      let equip = equipamentoReview.reduce(element=> element.nome === "EQUIPAMENTOS");

      this.validaObservacao(this.detailForm.controls.equipamentoObservacao.value) ?
        equip.observacao = this.detailForm.controls.equipamentoObservacao.value :
        equip.observacao = null
      equip.option = this.detailForm.controls.equipamentoOpt.value.name;

      delete equip.custo;
      delete equip.descricao;

      equipsRevisados.push(equip)
    }

    //Adiciona a observação e a opção para os equipamentos do tipo PLANO MÓVEL
    if (this.isPlano) {
      let equip = equipamentoReview.reduce(element=> element.nome === "PLANO MÓVEL");
      
      this.validaObservacao(this.detailForm.controls.planoObservacao.value) ?
        equip.observacao = this.detailForm.controls.planoObservacao.value :
        equip.observacao = null
      equip.option = this.detailForm.controls.planoOpt.value.name;

      delete equip.custo;
      delete equip.descricao;

      equipsRevisados.push(equip)
    }

    //Adiciona a observação e a opção para os equipamentos do tipo LICENÇAS E SOFTWARES
    if (this.isLicensa) {
      let equip = equipamentoReview.reduce(element=> element.nome === "LICENÇAS E SOFTWARES");

      this.validaObservacao(this.detailForm.controls.licencaObservacao.value) ?
        equip.observacao = this.detailForm.controls.licencaObservacao.value :
        equip.observacao = null
      equip.option = this.detailForm.controls.licencaOpt.value.name;

      delete equip.custo;
      delete equip.descricao;

      equipsRevisados.push(equip)
    }

    return equipsRevisados;
  }

  //função que define os itens selecionados
  avancar() {
    this.isAdvanced = true;
    this.isReview = false;

    this.isCelular = this.detailForm.controls.celular.value;
    this.isPlano = this.detailForm.controls.plano.value;
    this.isEquipamento = this.detailForm.controls.equipamentos.value;
    this.isLicensa = this.detailForm.controls.licensa.value;
  }

  //função que retorna para listagem da tabela
  voltarListagem() {
    this.isDetail = false;
    this.isAdvanced = false;
    this.isFinalizar = false;

    this.detailForm.reset();
    this.eventOutput.emit();
  }

  //função que cancela para a seleção dos itens
  voltarSelecao() {
    this.isDetail = true;
    this.isReview = true;
    this.isValid = false;

    this.detailForm.reset();

    this.isAdvanced = false;
  }

  //função que cancela para a seleção dos itens
  cancelar() {
    this.isDetail = true;
    this.isReview = false;
    this.isAdvanced = false;

    this.detailForm.reset();
  }

  //função que volta para visão de detalhe dos itens
  voltarDetail() {
    this.isReview = false;
    this.isValid = false;
    this.detailForm.reset();
  }

  //Função que valida a habilitação do botão de submissão
  isValidToSubmit() {
    if (this.isCelular) {
     return this.reviewCelular ? true: false;
    }

    if (this.isPlano) {
     return this.reviewPlano ? true: false;
    }

    if (this.isEquipamento) {
     return this.reviewEquipamento ? true: false;
    }

    return this.reviewLicensa ? true : false
  }

}
