import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, FormControl } from "@angular/forms";
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
  

  celularLista: Array<{ celular: string }> = [{ celular: "" }];
  planoLista: Array<{ plano: string }> = [{ plano: "" }];
  licencaLista: Array<{ licenca: string }> = [{ licenca: "" }];
  equipamentoLista: Array<{ equipamento:string }> = [];

  //Booleanos que regulam a visualização dos campos a serem alterados no form
  isCelular: boolean;
  isLicense: boolean;
  isPlan: boolean;
  isEquip: boolean;

  //Booleanos que regulam a visualização dos itens inicias no campo de equipamento
  showNotebook: boolean = true;
  showMouse: boolean = true;
  showHeadphone: boolean = true;

  //Inputs para a comunicação com o componente pai
  @Input()
  set cel(cel: boolean) {
    this.isCelular = cel;
  }
  @Input()
  set plano(plano: boolean) {
    this.isPlan = plano;
  }
  @Input()
  set license(license: boolean) {
    this.isLicense = license;
  }
  @Input()
  set equip(equip: boolean) {
    this.isEquip = equip;
  }

  constructor() {
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
  }

  //função que inicia o componente
  ngOnInit() {}

  //celular
  celularesArray(group: FormGroup): FormArray {
    return group.get("celularesList") as FormArray;
  }

  addPhone() {
    this.celularLista.push({
      celular: this.celularForm.value.celular,
    });
  }

  removePhone(item) {
    this.celularLista = this.celularLista.filter((i) => {
      return i !== item;
    });
    return this.celularLista;
  }

  //plano
  planosArray(group: FormGroup): FormArray {
    return group.get("planosList") as FormArray;
  }

  addPlano() {
    this.planoLista.push({
      plano: this.planoForm.value.plano,
    });
  }

  removePlano(item) {
    this.planoLista = this.planoLista.filter((i) => {
      return i !== item;
    });
    return this.planoLista;
  }

  //licença
  licencasArray(group: FormGroup): FormArray {
    return group.get("licencasList") as FormArray;
  }

  addLicenca() {
    this.licencaLista.push({
      licenca: this.licencaForm.value.licenca,
    });
  }

  removeLicenca(item) {
    this.licencaLista = this.licencaLista.filter((i) => {
      return i !== item;
    });
    return this.licencaLista;
  }

  //equipamento
  equipamentosArray(group: FormGroup): FormArray {
    return group.get("equipamentosList") as FormArray;
  }

  addEquipamento() {
    this.equipamentoLista.push({
      equipamento: this.equipamentoForm.value.equipamento,
    });
  }

  removeEquipamento(item) {
    this.equipamentoLista = this.equipamentoLista.filter((i) => {
      return i !== item;
    });
    return this.equipamentoLista;
  }

  //Função que gerencia a remoção do notebook como inicial do form de alteração
  hideNotebook() {
    this.showNotebook = !this.showNotebook;
  }

  //Função que gerencia a remoção do mouse como inicial do form de alteração
  hideMouse() {
    this.showMouse = !this.showMouse;
  }

  //Função que gerencia a remoção do headphone como inicial do form de alteração
  hideHeadphone() {
    this.showHeadphone = !this.showHeadphone;
  }
}
