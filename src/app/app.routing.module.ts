import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalistaGuard } from './view/analista/analista.guard';
import { AprovacaoGuard } from './view/aprovacao/aprovacao.guard';
import { CadastroGuard } from './view/cadastro-usuario/cadastro.guard';
import { FinalizacaoGuard } from './view/finalizacao/finalizacao.guard';
import { GestorGuard } from './view/gestor/gestor.guard';
import { AuthGuard } from './view/login/auth.guard';
import { LoginComponent } from './view/login/login.component';
import { CardsComponent } from './view/shared/cards/cards.component';
import { HomeComponent } from './view/shared/home/home.component';

/*  Rotas da Aplicação */
const rotas: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'card', component: CardsComponent },
      { path: 'aprovacao', loadChildren: './view/aprovacao/aprovacao.module#AprovacaoModule', canActivate: [AprovacaoGuard] },
      { path: 'gestor', loadChildren: './view/gestor/gestor.module#GestorModule', canActivate: [GestorGuard] },
      { path: 'analista', loadChildren: './view/analista/analista.module#AnalistaModule', canActivate: [AnalistaGuard] },
      { path: 'cadastro', loadChildren: './view/cadastro-usuario/cadastro.module#CadastroModule', canActivate: [CadastroGuard] },
      { path: 'finalizacao', loadChildren: './view/finalizacao/finalizacao.module#FinalizacaoModule', canActivate: [FinalizacaoGuard] },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(rotas, { useHash: true, relativeLinkResolution: 'legacy' })
  ],
  exports: [
    RouterModule
  ],
})

export class AppRoutingModule { }
