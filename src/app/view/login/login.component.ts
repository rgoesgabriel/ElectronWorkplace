import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { MessageService } from 'primeng/api';
import { GenericService } from 'src/app/controller/services/generic.service';
import { LoginService } from 'src/app/controller/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  //formulário e elementos
  loginForm: FormGroup;
  ano: number;
  hasToken: boolean;
  language: string;

  constructor(
    public translateService: TranslocoService,
    private loginService: LoginService,
    private messageService: MessageService,
    private genericService: GenericService,
    private router: Router
  ) { }

  //função que inicia o componente
  ngOnInit() {
    this.loginService.logout();
    this.setUrl();
    this.formComponent();
    let data = new Date();
    this.ano = data.getFullYear();
    this.getSelectLanguage();
  }

  //função que retorna o idioma definido no localStorage
  getSelectLanguage() {
    if (localStorage.getItem('language') === null) {
      this.translateService.setActiveLang('pt-br');
      localStorage.setItem('language', 'pt-br')
    } else {
      this.translateService.setActiveLang(localStorage.getItem('language'));
    }
  }

  //função que define o tipo de endpoint
  setUrl() {
    this.loginService.tipoUrl('login');
  }

  //função que retorna o idioma ativo
  getActiveLanguage() {
    this.language = this.translateService.getActiveLang();
  }

  //função que define o formulário 
  formComponent() {
    this.loginForm = new FormGroup({
      username: new FormControl((''), [Validators.required]),
      password: new FormControl((''), [Validators.required]),
      language: new FormControl(('')),
    })
  }

  //função que chama a rota para home
  fazerLogin() {
    this.hasToken = true;
    var login = this.loginForm.value;
    this.loginService.post(login)
      .subscribe(
        (resp) => {
          if (resp.body.access_token) {
            this.loginService.setSession(resp.body.access_token);
            this.hasToken = false;
            this.router.navigate(['home']);
            this.loginForm.reset();
          }
        }, error => {
          this.hasToken = false;
          if (error.status === 400) {
            this.messageService.clear();
            this.messageService.add({
              severity: 'warn',
              summary: error.error.msg.summary,
              detail: error.error.msg.detail
            });
          }
          else if (error.status === 404) {
            this.messageService.clear();
            this.messageService.add({
              severity: 'warn',
              summary: error.error.msg.summary,
              detail: error.error.msg.detail
            });
          }
          else if (error.status === 500) {
            this.messageService.clear();
            this.messageService.add({
              severity: 'warn',
              summary: error.error.msg.summary,
              detail: error.error.msg.detail
            });
          }
          else {
            this.messageService.clear();
            this.messageService.add({
              severity: 'warn',
              summary: error.error.msg.summary,
              detail: error.error.msg.detail
            });
          }
          this.loginForm.reset();
        }
      );
  }

  //define o idioma para pt-br
  setLanguageBr() {
    this.translateService.setActiveLang('pt-br');
    this.setLanguageSelected('pt-br');
    this.getActiveLanguage();
  }

  //define o idioma para Es
  setLanguageEs() {
    this.translateService.setActiveLang('es-es');
    this.setLanguageSelected('es-es');
    this.getActiveLanguage();
  }

  //define o idioma para En
  setLanguageEn() {
    this.translateService.setActiveLang('en-us');
    this.setLanguageSelected('en-us');
    this.getActiveLanguage();
  }

  //função que define o serviço padrão selecionado
  setLanguageSelected(element) {
    localStorage.setItem('language', element);
    this.loginForm.controls.language.setValue(element);
  }

}