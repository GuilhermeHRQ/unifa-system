import { Routes } from '@angular/router';
import { MainComponent } from "./main.component";
import { AuthGuard } from "../auth/guard/auth.guard";
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioListComponent } from './usuario/list/usuario-list.component';
import { UsuarioInfoComponent } from './usuario/info/usuario-info.component';

export const MAIN_ROUTES: Routes = [{
    path: '',
    component: MainComponent,
    children: [
        { path: '', component: HomeComponent },
        {
            path: 'usuario',
            component: UsuarioComponent,
            children: [
                { path: '', component: UsuarioListComponent },
                { path: 'novo', component: UsuarioInfoComponent },
                { path: ':id', component: UsuarioInfoComponent }
            ]
        }
    ]
}];
