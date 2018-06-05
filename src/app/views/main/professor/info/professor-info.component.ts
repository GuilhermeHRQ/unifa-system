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
    estados: any;
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
        this.estados = [];
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
            const res = this.listaProfessores.contains('cpf', this.activedRoute.snapshot.params['id']);
            this.info = res.element;
            this.index = res.index;
            // this.info.cpf = parseInt(this.info.cpf, 10);
        } else {
            setTimeout(() => {
                this.addingNew = true;
            });
        }

        this.getEstados();
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
            this.listaProfessores.remove(this.listaProfessores.contains('cpf', this.info.cpf).index);
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


    getEstados() {
        this.estados = [
            { uf: 'AC', nome: 'Acre' },
            { uf: 'AL', nome: 'Alagoas' },
            { uf: 'AP', nome: 'Amapá' },
            { uf: 'AM', nome: 'Amazonas' },
            { uf: 'BA', nome: 'Bahia' },
            { uf: 'CE', nome: 'Ceará' },
            { uf: 'DF', nome: 'Distrito Federal' },
            { uf: 'ES', nome: 'Espírito Santo' },
            { uf: 'GO', nome: 'Goiás' },
            { uf: 'MA', nome: 'Maranhão' },
            { uf: 'MT', nome: 'Mato Grosso' },
            { uf: 'MS', nome: 'Mato Grosso do Sul' },
            { uf: 'MG', nome: 'Minas Gerais' },
            { uf: 'PA', nome: 'Pará' },
            { uf: 'PB', nome: 'Paraíba' },
            { uf: 'PR', nome: 'Paraná' },
            { uf: 'PE', nome: 'Pernambuco' },
            { uf: 'PI', nome: 'Piauí' },
            { uf: 'RJ', nome: 'Rio de Janeiro' },
            { uf: 'RN', nome: 'Rio Grande do Norte' },
            { uf: 'RS', nome: 'Rio Grande do Sul' },
            { uf: 'RO', nome: 'Rondônia' },
            { uf: 'RR', nome: 'Roraima' },
            { uf: 'SC', nome: 'Santa Catarina' },
            { uf: 'SP', nome: 'São Paulo' },
            { uf: 'SE', nome: 'Sergipe' },
            { uf: 'TO', nome: 'Tocantins' }
        ];
    }
}
