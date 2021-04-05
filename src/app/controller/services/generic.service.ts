import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HandleErrosService } from './handleErros.service';

@Injectable({
    providedIn: 'root'
})

export class GenericService {

    urlService: string = undefined;
    api_ref: string = environment.API_URL;
    subject = new Subject<any>();

    constructor(
        public httpClient: HttpClient,
        public handleErrosService: HandleErrosService
    ) {
    }

    //define a url
    public tipoUrl(url) {
        this.urlService = url;
    }

    //consultar todos os itens
    public get() {
        return this.httpClient.get<any[]>(`${this.api_ref}/${this.urlService}`, { observe: 'response' })
            .pipe(
                catchError(this.handleErrosService.handleError)
            );
    }

    //consultar o item por id
    public getById(id) {
        return this.httpClient.get<any>(`${this.api_ref}/${this.urlService}/${id}`, { observe: 'response' })
            .pipe(
                catchError(this.handleErrosService.handleError)
            );
    }

    //cadastrar o item
    public post(item: any) {
        return this.httpClient.post<any>(`${this.api_ref}/${this.urlService}`, item, { observe: 'response' })
            .pipe(
                catchError(this.handleErrosService.handleError)
            );
    }

    //alterar o item
    public put(item: any) {
        return this.httpClient.put<any>(`${this.api_ref}/${this.urlService}/${item.id}`, item, { observe: 'response' })
            .pipe(
                catchError(this.handleErrosService.handleError)
            );
    }

    //remover o item
    public delete(id) {
        return this.httpClient.delete(`${this.api_ref}/${this.urlService}/${id}`, { observe: 'response' })
            .pipe(
                catchError(this.handleErrosService.handleError)
            );
    }

}
