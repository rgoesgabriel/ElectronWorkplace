import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HandleErrosService } from './handleErros.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlService: string = undefined;
  api_ref: string = environment.API_URL;
  subject = new Subject<any>();

  tokenDecode: any;

  constructor(
    public httpClient: HttpClient,
    public handleErrosService: HandleErrosService
  ) {
  }

  //define a url
  public tipoUrl(url) {
    this.urlService = url;
  }

  // responsável por fazer o login, por meio de requisição HTPP
  public post(item: any) {
    return this.httpClient.post<any>(`${this.api_ref}/${this.urlService}`, item, { observe: 'response' })
      .pipe(
        catchError(this.handleErrosService.handleError)
      );
  }

  // responsável por setar a sessão
  setSession(authResult) {
    const tokenInfo = authResult;
    this.tokenDecode = jwt_decode(tokenInfo);

    localStorage.setItem('token', tokenInfo);
    localStorage.setItem('user', this.tokenDecode.givenName);
    localStorage.setItem('perfil', this.tokenDecode.perfil);
    localStorage.setItem('language', this.tokenDecode.language);
  }

  // responsável por realizar logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('perfil');
    localStorage.removeItem('language');
  }

  // responsável por verificar se o token é diferente de null
  isLoggedIn() {
    return (localStorage.getItem('token') !== null);
  }

  // responsável por verificar se entraram na ferramente sem realizar o login
  isLoggedOut() {
    return !this.isLoggedIn();
  }

}
