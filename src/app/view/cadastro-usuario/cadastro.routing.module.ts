import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroDetalheComponent } from './cadastro-detalhe/cadastro-detalhe.component';
import { CadastroComponent } from './cadastro.component';

const CadastroRoutes: Routes = [
    {
        path: '',
        component: CadastroComponent,
        children: [
            {
                path: 'detalhe',
                component: CadastroDetalheComponent,
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(CadastroRoutes),
    ],
    exports: [
        RouterModule
    ],
})

export class CadastroRoutingModule { }
