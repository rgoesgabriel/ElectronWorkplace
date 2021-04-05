import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { GenericService } from 'src/app/controller/services/generic.service';
import { SelectItemGroup } from "primeng/api";

@Component({
  selector: "app-equipamento",
  templateUrl: "./equipamento.component.html",
  styleUrls: ["./equipamento.component.css"],
})
export class EquipamentoComponent implements OnInit {
  //Itens da alteração de equipamento
  cellphone: any;
  selectedCellphones: string[] = [];
  plan: any;
  selectedPlans: string[] = [];
  licenses: any;
  selectedLicenses: string[] = [];
  notebook: any;
  selectedNotebooks: string[] = [];
  keyboard: any;
  selectedkeyboards: string[] = [];
  mouse: any;
  selectedMouses: string[] = [];
  headphone: any;
  selectedHeadphones: string[] = [];
  selectedEquips: string[] = [];
  groupedEquips: SelectItemGroup[];
  reference: any;
  selectedReference: any;
  quantidades: any[];

  celularesList: any[];
  planosList: any[];
  licencasList: any[];
  equipamentosList: any[];

  //Formulários para alteração de equipamento
  celularForm = new FormGroup({
    celular: new FormControl(),
  });
  planoForm = new FormGroup({
    plano: new FormControl(),
  });
  licencaForm = new FormGroup({
    licenca: new FormControl(),
  });
  equipamentoForm = new FormGroup({
    equipamento: new FormControl(),
  });

  //
  modelo: string = "modelo"

  //booleans
  showEquip: boolean = false

  celularLista: Array<{ celular: string }> = [{ celular: "" }];
  planoLista: Array<{ plano: string }> = [{ plano: "" }];
  licencaLista: Array<{ licenca: string }> = [{ licenca: "" }];
  equipamentoLista: Array<{ equipamento: string }> = [];

  //Inputs para a comunicação com o componente pai
  @Input() item: Array<any>;
  @Output() eventOutput = new EventEmitter;
  
  //Itens
  colaborador: any;

  constructor( private genericService: GenericService) {
    this.cellphone = [
      { modelo: "Iphone 11" },
      { modelo: "Iphone XS" },
      { modelo: "Samsung Note 20 plus" },
      { modelo: "Samsung Note 20 Ultra" },
    ];
    this.plan = [
      { tipoPlano: "Plano A" },
      { tipoPlano: "Plano B" },
      { tipoPlano: "Plano C" },
    ];
    this.licenses = [
      { tipoLicenca: "Pacote Office 360" },
      { tipoLicenca: "Windows Professional Edition" },
    ];
    this.notebook = [
      { model: 'Intel Core i3, Memória de 4Gb, Tela 13"' },
      { model: 'Intel Core i3, Memória de 8Gb, Tela 15"' },
      { model: 'Intel Core i5, Memória de 8Gb, Tela 15"' },
      { model: 'Intel Core i5, Memória de 16Gb, Tela 15"' },
      { model: 'Intel Core i7, Memória de 8Gb, Tela 13"' },
      { model: 'Intel Core i7, Memória de 16Gb, Tela 13"' },
      { model: 'Intel Core i7, Memória de 16Gb, Tela 15"' },
    ];
    this.mouse = [
      { model: "Mouse Logitech bluetooth" },
      { model: "Mouse Hyperx bluetooth" },
      { model: "Mouse Microsoft bluetooth" },
      { model: "Mouse Microsoft com fio" },
    ];
    this.headphone = [
      { model: "Headset Pro – UC150 Skype for Business" },
      { model: "Headset Evolve 20 MS Duo USB Jabra" },
      { model: "Headset stereo Bluetooth USB Evolve 65 Duo UC Jabra" },
    ];
    this.groupedEquips = [
      {
        label: "Notebook",
        value: "de",
        items: [
          {
            label: 'Intel Core i3, Memória de 4Gb, Tela 13"',
            value: 'Intel Core i3, Memória de 4Gb, Tela 13"',
          },
          {
            label: 'Intel Core i3, Memória de 8Gb, Tela 15"',
            value: 'Intel Core i3, Memória de 8Gb, Tela 15"',
          },
          {
            label: 'Intel Core i5, Memória de 8Gb, Tela 15"',
            value: 'Intel Core i5, Memória de 8Gb, Tela 15"',
          },
          {
            label: 'Intel Core i5, Memória de 16Gb, Tela 15"',
            value: 'Intel Core i5, Memória de 16Gb, Tela 15"',
          },
          {
            label: 'Intel Core i7, Memória de 8Gb, Tela 13"',
            value: 'Intel Core i7, Memória de 8Gb, Tela 13"',
          },
          {
            label: 'Intel Core i7, Memória de 16Gb, Tela 13"',
            value: 'Intel Core i7, Memória de 16Gb, Tela 13"',
          },
          {
            label: 'Intel Core i7, Memória de 16Gb, Tela 15"',
            value: 'Intel Core i7, Memória de 16Gb, Tela 15"',
          },
        ],
      },
      {
        label: "Headphone",
        value: "de",
        items: [
          {
            label: "Headset Pro – UC150 Skype for Business",
            value: "Headset Pro – UC150 Skype for Business",
          },
          {
            label: "Headset Evolve 20 MS Duo USB Jabra",
            value: "Headset Evolve 20 MS Duo USB Jabra",
          },
          {
            label: "Headset stereo Bluetooth USB Evolve 65 Duo UC Jabra",
            value: "Headset stereo Bluetooth USB Evolve 65 Duo UC Jabra",
          },
        ],
      },
      {
        label: "Mouse",
        value: "de",
        items: [
          {
            label: "Mouse Logitech bluetooth",
            value: "Mouse Logitech bluetooth",
          },
          { label: "Mouse Hyperx bluetooth", value: "Mouse Hyperx bluetooth" },
          {
            label: "Mouse Microsoft bluetooth",
            value: "Mouse Microsoft bluetooth",
          },
          {
            label: "Mouse Microsoft com fio",
            value: "Mouse Microsoft com fio",
          },
        ],
      },
    ];
    this.reference = [
      { modelo: "Referência W" },
      { modelo: "Referência Z" }
    ];
    this.quantidades = [];
    for (let i = 1; i <= 10; i++) {
        this.quantidades.push({label: i, value: i});
    }
  }

  //função que inicia o componente
  ngOnInit(): void {
    this.setUrl();
  }

  //função que seta os parâmetros para edição
  setFormDetail(item, aba) {
    this.colaborador = item;
    aba == 0 ? this.showEquip = true : this.showEquip = false;
  }

  //Função que define o tipo de endpoint
  setUrl() {
    this.genericService.tipoUrl('pessoa');
  }

  enviar() {
    this.showEquip = false;
    this.eventOutput.emit()
  }
  
  voltarSelecao() {
    this.showEquip = false;
    this.eventOutput.emit()
  }
}
