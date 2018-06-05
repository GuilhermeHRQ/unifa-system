import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard } from '../auth/guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { ProfessorComponent } from './professor/professor.component';
import { ProfessorListComponent } from './professor/list/professor-list.component';
import { ProfessorInfoComponent } from './professor/info/professor-info.component';
import { AlunoComponent } from './aluno/aluno.component';
import { AlunoListComponent } from './aluno/list/aluno-list.component';
import { AlunoInfoComponent } from './aluno/info/aluno-info.component';

export const MAIN_ROUTES: Routes = [{
    path: '',
    component: MainComponent,
    children: [
        { path: '', component: HomeComponent },
        {
            path: 'professor',
            component: ProfessorComponent,
            children: [
                { path: '', component: ProfessorListComponent },
                { path: 'novo', component: ProfessorInfoComponent },
                { path: ':id', component: ProfessorInfoComponent }
            ]
        },
        {
            path: 'aluno',
            component: AlunoComponent,
            children: [
                { path: '', component: AlunoListComponent },
                { path: 'novo', component: AlunoInfoComponent },
                { path: ':id', component: AlunoInfoComponent }
            ]
        },
    ]
}];
