import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UiToolbarService } from 'ng-smn-ui';

@Component({
    selector: 'usuario-component',
    templateUrl: 'usuario.component.html',
    styleUrls: []
})

export class UsuarioComponent implements OnInit {

    constructor(
        private titleService: Title,
        private toolbarService: UiToolbarService
    ) { }

    ngOnInit() {
        this.titleService.setTitle('Usuarios');
        this.toolbarService.set('Usuario');
    }
}