import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UiToolbarService } from 'ng-smn-ui';
import { ObjectService } from '../../../../core/utils/object.service';
import { StorageService } from '../../../../core/utils/storage.service';

@Component({
    selector: 'professor-info-component',
    templateUrl: 'professor-info.component.html',
    styleUrls: ['professor-info.component.scss']
})

export class ProfessorInfoComponent implements OnInit, OnDestroy {
    info: any;
    constructor(
        private titleService: Title,
        private toolbarService: UiToolbarService,
        private objectService: ObjectService,
        private storageService: StorageService
    ) {
        this.info = {};
    }

    ngOnInit() { 
        this.titleService.setTitle('UnifaSytem - Usuário');
        this.toolbarService.set('Cadastro de usuário');
        this.toolbarService.activateExtendedToolbar(600);
    }

    ngOnDestroy() {
        this.toolbarService.deactivateExtendedToolbar();
    }
}