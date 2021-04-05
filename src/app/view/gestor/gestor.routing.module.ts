import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestorDetalheComponent } from './gestor-detalhe/gestor-detalhe.component';
import { GestorComponent } from './gestor.component';

const GestorRoutes: Routes = [
    {
        path: '',
        component: GestorComponent,
        children: [
            {
                path: 'detalhe',
                component: GestorDetalheComponent,
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(GestorRoutes),
    ],
    exports: [
        RouterModule
    ],
})

export class GestorRoutingModule { }
