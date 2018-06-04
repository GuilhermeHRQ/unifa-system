import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UiToolbarService, UiElement, UiSnackbar } from 'ng-smn-ui';
import { ObjectService } from '../../../../core/utils/object.service';
import { StorageService } from '../../../../core/utils/storage.service';
import { ListService } from '../../../../core/utils/list.service';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'professor-info-component',
    templateUrl: 'professor-info.component.html',
    styleUrls: ['professor-info.component.scss']
})

export class ProfessorInfoComponent implements OnInit, OnDestroy {
    info: any;
    addingNew: boolean;
    index: number;
    listaProfessores: ListService;
    constructor(
        private titleService: Title,
        private toolbarService: UiToolbarService,
        private objectService: ObjectService,
        private storageService: StorageService,
        private element: ElementRef,
        private router: Router,
        private activedRoute: ActivatedRoute,
    ) {
        this.info = {};
    }

    ngOnInit() {
        this.titleService.setTitle('UnifaSytem - Professor');
        this.toolbarService.set('Cadastro de Professor');
        this.toolbarService.activateExtendedToolbar(600);
        this.listaProfessores = new ListService();
        this.getLista();

        if (this.activedRoute.snapshot.params['id']) {
            setTimeout(() => {
                this.addingNew = false;
            });
            const res = this.listaProfessores.contains('codigo', this.activedRoute.snapshot.params['id']);
            this.info = res.element;
            this.index = res.index;
            this.info.codigo = parseInt(this.info.codigo, 10);
        } else {
            setTimeout(() => {
                this.addingNew = true;
            });
        }
    }

    ngOnDestroy() {
        this.toolbarService.deactivateExtendedToolbar();
    }

    onSubmit(form) {
        for (const control in form.controls) {
            if (form.controls.hasOwnProperty(control)) {
                form.controls[control].markAsTouched();
                form.controls[control].markAsDirty();
            }
        }

        if (!form.valid) {
            UiElement.focus(this.element.nativeElement.querySelector('form .ng-invalid'));
            return false;
        }

        if (!this.addingNew) {
            this.listaProfessores.remove(this.listaProfessores.contains('codigo', this.info.codigo).index);
        }

        this.listaProfessores.append(this.info);

        const head = this.listaProfessores.getHead();
        this.storageService.setNewItem('professores', JSON.stringify(head));

        UiSnackbar.show({
            text: 'Professor ' + (this.addingNew ? 'cadastrado' : 'alterado') + ' com sucesso!'
        });

        this.router.navigate(['professor']);


    }

    getLista() {
        const storage = this.storageService.getItem('professores');
        if (storage) {
            const objectStorage = JSON.parse(storage);
            this.listaProfessores.setHead(objectStorage);
            this.listaProfessores.setSize();
        }
    }

    confirmDelete() {
        this.listaProfessores.remove(this.index);
        const head = this.listaProfessores.getHead();
        this.storageService.setNewItem('professores', JSON.stringify(head));

        UiSnackbar.show({
            text: 'Professor removido com sucesso'
        });

        this.router.navigate(['professor']);
    }
}
