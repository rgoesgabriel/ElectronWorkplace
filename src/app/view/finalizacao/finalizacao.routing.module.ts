import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinalizacaoComponent } from './finalizacao.component';

const FinalizacaoRoutes: Routes = [
    {
        path: '',
        component: FinalizacaoComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(FinalizacaoRoutes),
    ],
    exports: [
        RouterModule
    ],
})

export class FinalizacaoRoutingModule { }
