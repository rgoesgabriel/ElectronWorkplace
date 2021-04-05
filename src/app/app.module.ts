import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { CommonServices } from './controller/services/common.service';
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { AnalistaModule } from './view/analista/analista.module';
import { AprovacaoModule } from './view/aprovacao/aprovacao.module';
import { CadastroModule } from './view/cadastro-usuario/cadastro.module';
import { FinalizacaoModule } from './view/finalizacao/finalizacao.module';
import { GestorModule } from './view/gestor/gestor.module';
import { AuthInterceptor } from './view/login/auth.interceptor';
import { ErrorInterceptor } from './view/login/error.interceptor';
import { PrimeNgModule } from './view/shared/components/PrimeNg.module';
import { SharedCommonModule } from './view/shared/sharedCommon.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedCommonModule,
    AprovacaoModule,
    FinalizacaoModule,
    GestorModule,
    AnalistaModule,
    CadastroModule,
    /* ---INTERFACE--- */
    PrimeNgModule,
    TranslocoRootModule
  ],
  providers: [CommonServices, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
