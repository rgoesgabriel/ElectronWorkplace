import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/controller/services/login.service';
import { Mensagens } from '../shared/components/mensagens-ptbr';

@Injectable({ providedIn: 'root' })
export class CadastroGuard implements CanActivate {

  constructor(private router: Router,
    private loginService: LoginService,
    private messageService: MessageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.loginService.isLoggedIn()) {
      if (localStorage.getItem('perfil') === 'administrador') {
        return true;
      }
    } else {
      this.messageService.clear();
      this.messageService.add({
        severity: 'warn',
        summary: Mensagens.UnauthorizedSummary,
        detail: Mensagens.UnauthorizedDetail
      });

      this.router.navigate(['/login']);
      return false;
    }

  }
}
