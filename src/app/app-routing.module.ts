// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

// Components
import { HomeComponent } from "./views/home/home.component";
import { SaveContactComponent } from "./views/contact/save-contact/save-contact.component";
import { BaseComponent } from './components/base/base.component';

// Auth
import { AuthGuard } from './core/auth/guards/auth.guard';

const routes: Routes = [
    {
        path: 'auth', loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '',
        component: BaseComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: HomeComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'contatos/salvar',
                component: SaveContactComponent,
                canActivate: [AuthGuard],
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
