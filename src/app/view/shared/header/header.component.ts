import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/controller/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];
  language: string;
  sideBar: boolean;

  constructor(
    private router: Router,
    private loginService: LoginService,
    public translateService: TranslocoService,
  ) { }

  ngOnInit() {
  }

  //função que apresenta as opções de seleção de idioma
  setectLanguage() {
    this.sideBar = true;
  }

  //função que retorna o idioma ativo
  getActiveLanguage() {
    this.language = this.translateService.getActiveLang();
  }

  //função que realiza o logout da plataforma
  logout() {
    this.loginService.logout();
    this.router.navigate(['']);
  }

  //define o idioma para pt-br
  setLanguageBr() {
    this.translateService.setActiveLang('pt-br');
    this.getActiveLanguage();
  }

  //define o idioma para Es
  setLanguageEs() {
    this.translateService.setActiveLang('es-es');
    this.getActiveLanguage();
  }

  //define o idioma para En
  setLanguageEn() {
    this.translateService.setActiveLang('en-us');
    this.getActiveLanguage();
  }

}
