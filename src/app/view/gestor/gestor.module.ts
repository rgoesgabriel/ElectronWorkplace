import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonServices } from 'src/app/controller/services/common.service';
import { TranslocoRootModule } from 'src/app/transloco/transloco-root.module';
import { PrimeNgModule } from '../shared/components/PrimeNg.module';
import { SharedCommonModule } from '../shared/sharedCommon.module';

import { GestorRoutingModule } from './gestor.routing.module';
import { FinalizacaoModule } from "../finalizacao/finalizacao.module";
import { GestorComponent } from './gestor.component';
import { GestorDetalheComponent } from './gestor-detalhe/gestor-detalhe.component';
import { GestorDetalheInfoComponent } from "./gestor-detalhe-info/gestor-detalhe-info.component";
import { TabelaComponent } from "./tabela/tabela.component";
import { EquipamentoComponent } from "./equipamento/equipamento.component";

registerLocaleData(localePt);

@NgModule({
    declarations: [
        GestorComponent,
        GestorDetalheComponent,
        GestorDetalheInfoComponent,
        TabelaComponent,
        EquipamentoComponent
    ],
    imports: [
        GestorRoutingModule,
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
        GestorComponent,
        GestorDetalheComponent,
        GestorDetalheInfoComponent,
        TabelaComponent,
        EquipamentoComponent
    ],
    providers: [
        CommonServices
    ],
})

export class GestorModule { }
