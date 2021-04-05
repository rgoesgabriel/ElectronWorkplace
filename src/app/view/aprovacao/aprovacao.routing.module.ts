import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AprovacaoDetalheComponent } from './aprovacao-detalhe/aprovacao-detalhe.component';
import { AprovacaoComponent } from './aprovacao.component';

const AprovacaoRoutes: Routes = [
    {
        path: '',
        component: AprovacaoComponent,
        children: [
            {
                path: 'aprovacao',
                component: AprovacaoDetalheComponent,
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(AprovacaoRoutes),
    ],
    exports: [
        RouterModule
    ],
})

export class AprovacaoRoutingModule { }
