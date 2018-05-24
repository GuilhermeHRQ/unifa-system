import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UsuarioComponent } from './usuario.component';
import { UsuarioListComponent } from './list/usuario-list.component';
import { SharedModule } from '../../../shared.module';
import { UsuarioInfoComponent } from './info/usuario-info.component';


@NgModule({
    imports: [
        SharedModule
    ],
    exports: [],
    declarations: [UsuarioComponent, UsuarioListComponent, UsuarioInfoComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsuarioModule { }
