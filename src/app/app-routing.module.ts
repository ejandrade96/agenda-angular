// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

// Components
import { HomeComponent } from "./views/home/home.component";
import { SaveContactComponent } from "./views/contact/save-contact/save-contact.component";

// Auth
import { AuthGuard } from './core/auth/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'contatos/salvar',
        component: SaveContactComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'auth', loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
