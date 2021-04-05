import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  perfil: string;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.tokenInfo();
    this.setNavigate();
  }

  //função que define a rota da aplicação de acordo com o perfil
  setNavigate() {
    if (localStorage.getItem('perfil') === 'diretor') {
      this.eventAprovacao();
    }

    else if (localStorage.getItem('perfil') === 'gestor') {
      this.eventGestor();
    }

    else if (localStorage.getItem('perfil') === 'analista') {
      this.eventAnalista();
    }

    else if (localStorage.getItem('perfil') === 'administrador') {
      this.router.navigate(['home/card']);
    }
  }

  // função que retorna os valores de acesso do usuário
  tokenInfo() {
    this.perfil = localStorage.getItem('perfil');
  }

  //função que chama a rota para listagem de aprovacao
  eventAprovacao() {
    if (this.perfil === 'diretor' || this.perfil === 'administrador') {
      this.router.navigate(['home/aprovacao']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  //função que chama a rota para listagem de gestor
  eventGestor() {
    if (this.perfil === 'gestor' || this.perfil === 'administrador') {
      this.router.navigate(['home/gestor']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  //função que chama a rota para listagem de analista
  eventAnalista() {
    if (this.perfil === 'analista' || this.perfil === 'administrador') {
      this.router.navigate(['home/analista']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  //função que chama a rota para listagem de usuário
  eventCadastro() {
    if (this.perfil === 'administrador') {
      this.router.navigate(['home/cadastro']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  /**
   * Função que retorna true caso o usuário seja Administrador
   * Feita para ajustar entrega V0, onde queremos desabilitar as rotas permitindo apenas a
   * rota de criação de novos usuários. Vai se tornar inútil para a V1
   */
  isAdmin() {
    return (this.perfil === 'administrador');
  }

}
