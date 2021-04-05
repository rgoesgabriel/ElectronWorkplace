import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonServices } from 'src/app/controller/services/common.service';
import { TranslocoRootModule } from 'src/app/transloco/transloco-root.module';
import { PrimeNgModule } from '../shared/components/PrimeNg.module';
import { SharedCommonModule } from '../shared/sharedCommon.module';
import { FinalizacaoComponent } from './finalizacao.component';
import { FinalizacaoRoutingModule } from './finalizacao.routing.module';

registerLocaleData(localePt);

@NgModule({
    declarations: [
        FinalizacaoComponent,
    ],
    imports: [
        FinalizacaoRoutingModule,
        SharedCommonModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        /* ----interface---- */
        PrimeNgModule,
        /* tradução */
        TranslocoRootModule
    ],
    exports: [
        FinalizacaoComponent,
    ],
    providers: [
        CommonServices
    ],
})

export class FinalizacaoModule { }
