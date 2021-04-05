import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalistaDetalheComponent } from './analista-detalhe/analista-detalhe.component';
import { AnalistaComponent } from './analista.component';

const AnalistaRoutes: Routes = [
    {
        path: '',
        component: AnalistaComponent,
        children: [
            {
                path: 'detalhe',
                component: AnalistaDetalheComponent,
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(AnalistaRoutes),
    ],
    exports: [
        RouterModule
    ],
})

export class AnalistaRoutingModule { }
