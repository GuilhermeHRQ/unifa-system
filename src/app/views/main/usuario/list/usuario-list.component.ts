import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ListService } from '../../../../core/utils/list.service';
import { Title } from '@angular/platform-browser';
import { UiToolbarService } from 'ng-smn-ui';
import { ObjectService } from '../../../../core/utils/object.service';
import { StorageService } from '../../../../core/utils/storage.service';
@Component({
    selector: 'usuario-list-component',
    templateUrl: 'usuario-list.component.html',
    styleUrls: ['usuario-list.component.scss']
})

export class UsuarioListComponent implements OnInit {
    listaUsuarios: ListService;
    @ViewChild('elementInsert') elementInsert;
    constructor(
        private titleService: Title,
        private toolbarService: UiToolbarService,
        private element: ElementRef,
        private objectService: ObjectService,
        private storageService: StorageService
    ) { }

    ngOnInit() {
        this.titleService.setTitle('UnfaSystem - Home');
        this.toolbarService.set('Usuário');
        this.toolbarService.activateExtendedToolbar(480);
        this.listaUsuarios = new ListService();
        this.listaUsuarios.append({ id: 1, nome: 'José' });
        this.listaUsuarios.append({ id: 2, nome: 'Adre' });
        this.listaUsuarios.append({ id: 3, nome: 'Maria' });
        console.log(this.listaUsuarios.size());
        console.log(this.listaUsuarios);

        this.forEachFunction(this.listaUsuarios);
        console.log(this.elementInsert);
    }

    forEachFunction(param) {
        const length = param.size();
        let itemList = param.getHead();

        for (let i = 0; i < length; i++) {

            const node = `<tr>
            <td data-title="Nome" class="no-wrap">${itemList.element.id}</td>
            <td data-title="Nome" class="no-wrap">${itemList.element.nome}</td>
            </tr>`
            this.elementInsert.nativeElement.innerHTML += node;


            itemList = itemList.next;
        }
    }
}