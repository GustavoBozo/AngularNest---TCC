import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';
import { ControleEquipeComponent } from './components/controle-equipe/controle-equipe.component';
import { MetadadosComponent } from './components/metadados/metadados.component';
import { LixeiraComponent } from './components/lixeira/lixeira.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: PaginaInicialComponent},
    {path: 'metadado', component: MetadadosComponent},
    {path: 'equipe', component: ControleEquipeComponent},
    {path: 'lixeira', component: LixeiraComponent}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
