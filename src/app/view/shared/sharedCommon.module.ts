import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslocoRootModule } from 'src/app/transloco/transloco-root.module';
import { AuthInterceptor } from '../login/auth.interceptor';
import { LoginComponent } from '../login/login.component';
import { CardsComponent } from './cards/cards.component';
import { PrimeNgModule } from './components/PrimeNg.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent,
        /* FooterComponent, */
        CardsComponent,
        LoginComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        /* ---interface--- */
        PrimeNgModule,
        /* tradução */
        TranslocoRootModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    exports: [
        HomeComponent,
        HeaderComponent,
        /*  FooterComponent, */
        LoginComponent,
    ]
})
export class SharedCommonModule { }
