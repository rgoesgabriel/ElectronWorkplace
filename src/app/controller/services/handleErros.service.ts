import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrosService {

  constructor(private messageService: MessageService) { }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  check500Error(error) {
    switch (error.status) {
      case 500:
        this.messageService.clear();
        this.messageService.add({
          severity: 'error',
          summary: error.error.msg.summary,
          detail: error.error.msg.detail
        });
        break;
    }
  }

}
