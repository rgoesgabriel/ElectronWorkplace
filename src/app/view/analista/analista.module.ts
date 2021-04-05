import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonServices } from 'src/app/controller/services/common.service';
import { TranslocoRootModule } from 'src/app/transloco/transloco-root.module';
import { FinalizacaoModule } from "../finalizacao/finalizacao.module";
import { PrimeNgModule } from '../shared/components/PrimeNg.module';
import { SharedCommonModule } from '../shared/sharedCommon.module';
import { AnalistaDetalheInfoComponent } from "./analista-detalhe-info/analista-detalhe-info.component";
import { AnalistaDetalheComponent } from './analista-detalhe/analista-detalhe.component';
import { AnalistaComponent } from './analista.component';
import { AnalistaRoutingModule } from './analista.routing.module';
import { EquipamentoComponent } from "./equipamento/equipamento.component";
import { TabelaComponent } from "./tabela/tabela.component";

registerLocaleData(localePt);

@NgModule({
    declarations: [
        AnalistaComponent,
        AnalistaDetalheComponent,
        AnalistaDetalheInfoComponent,
        TabelaComponent,
        EquipamentoComponent
    ],
    imports: [
        AnalistaRoutingModule,
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
        AnalistaComponent,
        AnalistaDetalheComponent,
        AnalistaDetalheInfoComponent,
        TabelaComponent,
        EquipamentoComponent
    ],
    providers: [
        CommonServices
    ],
})

export class AnalistaModule { }
