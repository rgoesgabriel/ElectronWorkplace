import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { MessageService, SelectItem } from 'primeng/api';
import { CommonServices } from 'src/app/controller/services/common.service';
import { GenericService } from 'src/app/controller/services/generic.service';
import { Mensagens } from '../../shared/components/mensagens-ptbr';

@Component({
  selector: 'app-cadastro-detalhe',
  templateUrl: './cadastro-detalhe.component.html',
  styleUrls: ['./cadastro-detalhe.component.css']
})
export class CadastroDetalheComponent implements OnInit {

  //comunicação entre componetes
  @Input() item: Array<any>;
  @Output() eventOutput = new EventEmitter;

  //formulário e elementos
  cadastroForm: FormGroup;
  itemId: string;
  itemNome: string;
  language: string;
  email: string;

  //booleans
  displayAdicionar: boolean;
  displayExcluir: boolean;
  isEditar: boolean;
  showDiretor: boolean;

  //usuario
  isLoadingButton: boolean;

  //selects
  perfis: SelectItem[];
  diretores: SelectItem[];

  constructor(
    public translateService: TranslocoService,
    private genericService: GenericService,
    private messageService: MessageService,
    private commonServices: CommonServices,
  ) { }

  //função que inicia o componente
  ngOnInit() {
    this.setUrl();
    this.formComponent();
    this.getActiveLanguage();
    this.getDiretores();
  }

  //função que define o formulário 
  formComponent() {
    this.cadastroForm = new FormGroup({
      usuarioRede: new FormControl((''), [Validators.required]),
      cargo: new FormControl((''), [Validators.required]),
      diretor: new FormControl((''), [Validators.required]),
      nome: new FormControl((''), [Validators.required]),
      celula: new FormControl((''), [Validators.required]),
      matricula: new FormControl((''), [Validators.required]),
      perfil: new FormControl((''), [Validators.required]),
    });
  }

  //função que define o tipo de endpoint 
  setUrl() {
    this.genericService.tipoUrl('gestao_acesso');
  }

  //função que retorna o idioma ativo
  getActiveLanguage() {
    this.language = this.translateService.getActiveLang();
    this.setParamsSelect();
  }

  //função que define o perfil dos usuários cadastrados
  setParamsSelect() {
    if (this.language === 'en-us') {
      this.perfis = [
        { label: 'Administrator', value: 'administrador' },
        { label: 'Analyst', value: 'analista' },
        { label: 'Director', value: 'diretor' },
        { label: 'Manager', value: 'gestor' },
      ];

    } else if (this.language === 'es-es') {
      this.perfis = [
        { label: 'Administrador', value: 'administrador' },
        { label: 'Analista', value: 'analista' },
        { label: 'Director', value: 'diretor' },
        { label: 'Gerente', value: 'gestor' },
      ];

    } else if (this.language === 'pt-br') {
      this.perfis = [
        { label: 'Administrador', value: 'administrador' },
        { label: 'Analista', value: 'analista' },
        { label: 'Diretor', value: 'diretor' },
        { label: 'Gestor', value: 'gestor' },
      ];
    }
  }

  //função que seta os parâmetros para adição
  setFormAdd() {
    this.displayAdicionar = true;
    this.cadastroForm.reset();
    this.isEditar = false;
  }

  //função que seta os parâmetros para edição
  setFormEdit(item) {
    this.cadastroForm.controls.usuarioRede.setValue(item.usuarioRede);
    this.cadastroForm.controls.perfil.setValue(item.perfil);
    this.onChangePerfil(item.perfil);
    this.cadastroForm.controls.diretor.setValue(item.gestor_associado);
    this.cadastroForm.controls.cargo.setValue(item.cargo);
    this.cadastroForm.controls.nome.setValue(item.nome);
    this.cadastroForm.controls.celula.setValue(item.celula);
    this.cadastroForm.controls.matricula.setValue(item.matricula);

    this.displayAdicionar = true;
    this.isEditar = true;
  }

  //função que seta os parâmetros para remoção
  setFormRemove(item) {
    this.itemId = item.usuarioRede;
    this.itemNome = item.nome;
    this.isEditar = false;
    this.displayExcluir = true;
  }

  //função que cancela a interação e limpa o furmulário
  cancelar() {
    this.displayAdicionar = false;
    this.cadastroForm.reset();
  }

  //função para adicionar o elemento selecionado
  salvar() {
    this.isLoadingButton = true;
    this.genericService.tipoUrl('gestao_acesso/usuario/cadastrar');

    let idEncode = this.commonServices.convertToBase64({
      usuarioRede: this.cadastroForm.controls.usuarioRede.value,
      email: this.email,
    });

    var addUsuario = {
      id: idEncode,
      formulario: this.cadastroForm.value
    }

    this.genericService.post(addUsuario)
      .subscribe(
        (resp) => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'success',
            summary: Mensagens.CadastroSummary,
            detail: Mensagens.CadastroDetail
          });
          this.eventOutput.emit();
          this.cadastroForm.reset();
          this.displayAdicionar = false;

          this.isLoadingButton = false;
        }, error => {
          this.isLoadingButton = false;
          this.messageService.clear();
          this.messageService.add({
            severity: 'warn',
            summary: error.error.msg.summary,
            detail: error.error.msg.detail
          });
          this.cadastroForm.reset();
        }
      );
  }

  //função para alterar o elemento selecionado
  editar() {
    this.isLoadingButton = true;
    this.genericService.urlService = 'gestao_acesso/usuario/atualizar';

    let isEmail;

    if (this.email !== undefined || this.email !== '') {
      isEmail = this.cadastroForm.controls.usuarioRede.value + "@stefanini.com";
    } else {
      isEmail = this.email;
    }

    let idEncode = this.commonServices.convertToBase64({
      usuarioRede: this.cadastroForm.controls.usuarioRede.value,
      email: isEmail
    });

    var addUsuario = {
      id: idEncode,
      formulario: this.cadastroForm.value
    }

    this.genericService.put(addUsuario)
      .subscribe(
        (resp) => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'success',
            summary: Mensagens.AtualizarSummary,
            detail: Mensagens.AtualizarDetail
          });
          this.eventOutput.emit();
          this.cadastroForm.reset();
          this.displayAdicionar = false;

          this.isLoadingButton = false;
        }, error => {
          this.isLoadingButton = false;
          this.messageService.clear();
          this.messageService.add({
            severity: 'error',
            summary: error.error.msg.summary,
            detail: error.error.msg.detail
          });
        }
      );
  }

  //função para remover o elemento selecionado
  excluir() {
    this.genericService.urlService = 'gestao_acesso/usuario/deletar';
    this.genericService.delete(this.itemId)
      .subscribe(
        (resp) => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'success',
            summary: Mensagens.ExcluirSummary,
            detail: Mensagens.ExcluirDetail
          });
          this.eventOutput.emit();
          this.displayExcluir = false;
        }, error => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'error',
            summary: error.error.msg.summary,
            detail: error.error.msg.detail
          });
        }
      );
  }

  //função que consulta o usuário direto no ad
  getUsuarioAd() {
    this.genericService.urlService = 'gestao_acesso/usuario';
    const usuario = this.cadastroForm.controls.usuarioRede.value;
    this.genericService.getById(usuario)
      .subscribe(
        (resp) => {
          this.email = resp.body[0].e_mail;
          this.cadastroForm.controls.nome.setValue(resp.body[0].nome);
          this.cadastroForm.controls.cargo.setValue(resp.body[0].cargo);
          this.cadastroForm.controls.celula.setValue((resp.body[0].cod_ccusto).toString());
          this.cadastroForm.controls.matricula.setValue((resp.body[0].matricula).toString());
        }, error => {
          this.cadastroForm.reset();
          this.messageService.clear();
          this.messageService.add({
            severity: 'warn',
            summary: error.error.msg.summary,
            detail: error.error.msg.detail
          });
        }
      );
  }

  //função que consulta os diretores
  getDiretores() {
    this.genericService.urlService = 'gestao_acesso/diretor';
    this.genericService.get()
      .subscribe(
        (resp) => {
          this.diretores = [];
          resp.body.forEach((item) => { this.diretores.push({ label: this.commonServices.titleCase(item.nome), value: item.usuario }) });
        }, error => {
          this.cadastroForm.reset();
          this.messageService.clear();
          this.messageService.add({
            severity: 'warn',
            summary: error.error.msg.summary,
            detail: error.error.msg.detail
          });
        }
      );
  }

  //função que retorna o perfil selecionado
  onChangePerfil(item) {
    this.cadastroForm.controls.perfil.setValue(item);
    if (item === 'gestor' || item === 'analista') {
      this.cadastroForm.controls.diretor.setValidators([Validators.required]);
      this.cadastroForm.controls.diretor.updateValueAndValidity();
      this.showDiretor = true;
    } else {
      this.showDiretor = false;
      this.cadastroForm.controls.diretor.reset();
      this.cadastroForm.controls.diretor.clearValidators();
      this.cadastroForm.controls.diretor.updateValueAndValidity();
    }
  }

  //função que retorna o diretor selecionado
  onChangeDiretor(item) {
    this.cadastroForm.controls.diretor.setValue(item);
  }

  //função que cancela a interação
  cancelarExcluir() {
    this.displayExcluir = false;
  }

}