import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ListService } from '../../../../core/utils/list.service';
import { Title } from '@angular/platform-browser';
import { UiToolbarService, UiElement } from 'ng-smn-ui';
import { ObjectService } from '../../../../core/utils/object.service';
import { StorageService } from '../../../../core/utils/storage.service';
import { element } from 'protractor';
import { Router } from '@angular/router';

@Component({
    selector: 'disciplina-list-component',
    templateUrl: 'disciplina-list.component.html',
    styleUrls: ['disciplina-list.component.scss']
})

export class DisciplinaListComponent implements OnInit {
    listaDisciplinas: ListService;
    elementList: any;
    @ViewChild('elementInsert') elementInsert;
    constructor(
        private titleService: Title,
        private toolbarService: UiToolbarService,
        private element: ElementRef,
        private objectService: ObjectService,
        private storageService: StorageService,
        private router: Router
    ) { }

    ngOnInit() {
        this.titleService.setTitle('UnfaSystem - Disciplinas');
        this.toolbarService.set('Lista de disciplinas');
        this.toolbarService.activateExtendedToolbar(480);

        this.listaDisciplinas = new ListService();
        this.getInfo();
        this.initList(this.listaDisciplinas);
    }

    initList(list) {
        const length = list.size();
        let itemList = list.getHead();


        for (let i = 0; i < length; i++) {
            const node = `<tr class="item-list" data-id="${itemList.element.cpf}">
            <td data-title="Código" class="no-wrap">${this.convertCpf(itemList.element.cpf)}</td>
            <td data-title="Nome" class="no-wrap">${itemList.element.nome}</td>
            </tr>`;
            this.elementInsert.nativeElement.innerHTML += node;
            itemList = itemList.next;
        }

        this.elementList = this.element.nativeElement.querySelectorAll('tr.item-list');
        this.addFunction();
    }

    addFunction() {
        this.elementList.forEach(el => {
            UiElement.on(el, 'click', (e) => {
                this.router.navigate(['disciplinas/' + e.target.parentElement.dataset.id]);
            });
        });
    }

    getInfo() {
        const storage = this.storageService.getItem('disciplinas');
        if (storage) {
            const objectStorage = JSON.parse(storage);
            this.listaDisciplinas.setHead(objectStorage);
            this.listaDisciplinas.setSize();
        }
    }

    convertCpf(value: any): any {
        if (!value) {
            return '';
        }

        value = value.toString().replace(/[^0-9]+/g, '');
        if (value.length > 3) {
            value = value.substring(0, 3) + '.' + value.substring(3);
        }
        if (value.length > 7) {
            value = value.substring(0, 7) + '.' + value.substring(7);
        }
        if (value.length > 11) {
            value = value.substring(0, 11) + '-' + value.substring(11);
        }
        if (value.length > 14) {
            value = value.substring(0, 14);
        }

        return value;
    }
}
