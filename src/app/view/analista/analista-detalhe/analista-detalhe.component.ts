import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { CommonServices } from "src/app/controller/services/common.service";
import { GenericService } from "src/app/controller/services/generic.service";

@Component({
  selector: "app-analista-detalhe",
  templateUrl: "./analista-detalhe.component.html",
  styleUrls: ["./analista-detalhe.component.css"],
})
export class AnalistaDetalheComponent implements OnInit {


  //comunicação entre componetes
  @Input() item: Array<any>;
  @Output() eventOutput = new EventEmitter();

  //formulário e elementos
  detailForm: FormGroup;

  //itens
  colaborador: any;
  radioOpstions: any[];

  //booleans
  isDetail: boolean;
  isReview: boolean = true;
  isValid: boolean;
  isAdvanced: boolean;
  isFinalizar: boolean;
  isEquip: boolean;

  isCelular: boolean = true;
  isPlano: boolean = true;
  isEquipamento: boolean = true;
  isLicensa: boolean = true;

  constructor(
    private genericService: GenericService,
    private messageService: MessageService,
    private commonServices: CommonServices,
    private router: Router
  ) { }


  //função que inicia o componente
  ngOnInit() {
    this.setUrl();
    this.formComponent();
    this.initOptions(localStorage.getItem("language"));
  }

  //função que define o formulário
  formComponent() {
    this.detailForm = new FormGroup({
      celular: new FormControl(),
      celularItem: new FormControl(),
      celularObs: new FormControl(),

      planoItem: new FormControl(),
      planoObs: new FormControl(),
      plano: new FormControl(),

      equipamentos: new FormControl(),
      equipamentoItem: new FormControl(),
      equipamentoObs: new FormControl(),

      licensa: new FormControl(),
      licencaItem: new FormControl(),
      licencaObs: new FormControl(),
    });
  }

  //função que define o tipo de endpoint
  setUrl() {
    this.genericService.tipoUrl("pessoa");
  }

  //função que seta os parâmetros para edição
  setFormDetail(item) {
    this.colaborador = item;
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
      if (element === "pt-br") {
        this.radioOpstions = [
          { name: "Custos", key: "custos" },
          { name: "Adequação ao cargo", key: "adequacao" },
          { name: "Estoque", key: "estoque" },
          { name: "Outros motivos", key: "outro" },
        ];
      } else if (element === "en-us") {
        this.radioOpstions = [
          { name: "Costs", key: "custos" },
          { name: "Suitability for the position", key: "adequacao" },
          { name: "Stock", key: "estoque" },
          { name: "Other reasons", key: "outro" },
        ];
      } else if (element === "es-es") {
        this.radioOpstions = [
          { name: "Costos", key: "custos" },
          { name: "Idoneidad para el puesto", key: "adequacao" },
          { name: "Stock", key: "estoque" },
          { name: "Otras razones", key: "outro" },
        ];
      }
    } else {
      this.radioOpstions = [
        { name: "Custos", key: "custos" },
        { name: "Adequação ao cargo", key: "adequacao" },
        { name: "Estoque", key: "estoque" },
        { name: "Outros motivos", key: "outro" },
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

    this.isCelular = true;
    this.isPlano = true;
    this.isEquipamento = true;
    this.isLicensa = true;

    this.detailForm.reset();
    this.eventOutput.emit();
  }

  //função que cancela para a seleção dos itens
  voltarSelecao() {
    this.isDetail = true;
    this.isReview = true;

    this.isCelular = true;
    this.isPlano = true;
    this.isEquipamento = true;
    this.isLicensa = true;

    this.isAdvanced = false;
  }

  //função que cancela para a seleção dos itens
  cancelar() {
    this.isDetail = true;
    this.isReview = true;
    this.isAdvanced = false;

    this.isCelular = true;
    this.isPlano = true;
    this.isEquipamento = true;
    this.isLicensa = true;

    this.detailForm.reset();
  }

  //função que volta para visão de detalhe dos itens
  voltarDetail() {
    this.isReview = false;
    this.isValid = false;
    this.detailForm.reset();
  }
}
