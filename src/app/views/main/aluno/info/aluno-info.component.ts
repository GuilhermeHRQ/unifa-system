import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UiToolbarService, UiElement, UiSnackbar } from 'ng-smn-ui';
import { ObjectService } from '../../../../core/utils/object.service';
import { StorageService } from '../../../../core/utils/storage.service';
import { ListService } from '../../../../core/utils/list.service';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'aluno-info-component',
    templateUrl: 'aluno-info.component.html',
    styleUrls: ['aluno-info.component.scss']
})

export class AlunoInfoComponent implements OnInit, OnDestroy {
    info: any;
    addingNew: boolean;
    index: number;
    estados: any;
    cursos: Array<any>;
    listaAluno: ListService;
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
        this.cursos = [
            {id: 1, nome: 'Sistemas de Informação'},
            {id: 2, nome: 'Engenharia de Software'},
            {id: 3, nome: 'Administração'},
        ];
    }

    ngOnInit() {
        this.titleService.setTitle('UnifaSytem - Alunos');
        this.toolbarService.set('Cadastro de Alunos');
        this.toolbarService.activateExtendedToolbar(600);
        this.listaAluno = new ListService();
        this.getLista();

        if (this.activedRoute.snapshot.params['id']) {
            setTimeout(() => {
                this.addingNew = false;
            });
            const res = this.listaAluno.contains('codigo', this.activedRoute.snapshot.params['id']);
            this.info = res.element;
            this.index = res.index;
            this.info.codigo = parseInt(this.info.codigo, 10);
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
            this.listaAluno.remove(this.listaAluno.contains('cpf', this.info.cpf).index);
        }

        this.listaAluno.append(this.info);

        const head = this.listaAluno.getHead();
        this.storageService.setNewItem('alunos', JSON.stringify(head));

        UiSnackbar.show({
            text: 'Aluno ' + (this.addingNew ? 'cadastrado' : 'alterado') + ' com sucesso!'
        });

        this.router.navigate(['aluno']);
    }

    getLista() {
        const storage = this.storageService.getItem('alunos');
        if (storage) {
            const objectStorage = JSON.parse(storage);
            this.listaAluno.setHead(objectStorage);
            this.listaAluno.setSize();
        }
    }

    confirmDelete() {
        this.listaAluno.remove(this.index);
        const head = this.listaAluno.getHead();
        this.storageService.setNewItem('alunos', JSON.stringify(head));

        UiSnackbar.show({
            text: 'Aluno removido com sucesso'
        });

        this.router.navigate(['aluno']);
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
