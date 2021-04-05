import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonServices } from 'src/app/controller/services/common.service';
import { TranslocoRootModule } from 'src/app/transloco/transloco-root.module';
import { FinalizacaoModule } from '../finalizacao/finalizacao.module';
import { PrimeNgModule } from '../shared/components/PrimeNg.module';
import { SharedCommonModule } from '../shared/sharedCommon.module';
import { CadastroDetalheComponent } from './cadastro-detalhe/cadastro-detalhe.component';
import { CadastroComponent } from './cadastro.component';
import { CadastroRoutingModule } from './cadastro.routing.module';

registerLocaleData(localePt);

@NgModule({
    declarations: [
        CadastroComponent,
        CadastroDetalheComponent,
    ],
    imports: [
        CadastroRoutingModule,
        SharedCommonModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        FinalizacaoModule,
        /* ----interface---- */
        PrimeNgModule,
        /* tradução */
        TranslocoRootModule
    ],
    exports: [
        CadastroComponent,
        CadastroDetalheComponent
    ],
    providers: [
        CommonServices
    ],
})

export class CadastroModule { }
