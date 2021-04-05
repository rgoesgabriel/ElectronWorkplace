import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonServices } from 'src/app/controller/services/common.service';
import { TranslocoRootModule } from 'src/app/transloco/transloco-root.module';
import { FinalizacaoModule } from '../finalizacao/finalizacao.module';
import { PrimeNgModule } from '../shared/components/PrimeNg.module';
import { SharedCommonModule } from '../shared/sharedCommon.module';
import { AprovacaoDetalheComponent } from './aprovacao-detalhe/aprovacao-detalhe.component';
import { AprovacaoComponent } from './aprovacao.component';
import { AprovacaoRoutingModule } from './aprovacao.routing.module';

registerLocaleData(localePt);

@NgModule({
    declarations: [
        AprovacaoComponent,
        AprovacaoDetalheComponent,
    ],
    imports: [
        AprovacaoRoutingModule,
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
        AprovacaoComponent,
        AprovacaoDetalheComponent
    ],
    providers: [
        CommonServices
    ],
})

export class AprovacaoModule { }
