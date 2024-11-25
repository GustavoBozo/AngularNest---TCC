import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EquipeIn, UserTeamIn } from './dto/equipe.dto';

@Component({
  selector: 'app-controle-equipe',
  imports: [CommonModule, FormsModule],
  templateUrl: './controle-equipe.component.html',
  styleUrl: './controle-equipe.component.css'
})
export class ControleEquipeComponent {
  

  @ViewChild('modalEquipe') form1!: ElementRef;
  @ViewChild('modalEquipeUsuario') userEquipe!: ElementRef;

  http = inject(HttpClient);
  router = inject(Router);


  teamId: string | undefined;


  equipes: EquipeIn[] | undefined

  ngOnInit(){
    this.loadEquipes();
  }

  

  openModalEquipe(){
    this.form1.nativeElement.style.display = 'block';
  }

  closeModalEquipe(){
    this.form1.nativeElement.style.display = 'none';
  }

  adicionarMembros(id: string){
    this.userEquipe.nativeElement.style.display = 'block';
    this.teamId = id;
  }

  closeModalEquipeUsuario(){
    this.userEquipe.nativeElement.style.display = 'none';
  }


  createEquipe(data: EquipeIn) {
    return this.http.post<EquipeIn>("http://localhost:3030/equipe/create", data)
    .subscribe(equipe => {
      console.log("Equipe Criada", equipe)
      location.reload()
    })
  }

  createEquipeUsuario(data: {name: string, email: string, teamId: string}){
    return this.http.post<UserTeamIn>("http://localhost:3030/equipe/addEquipe", data)
    .subscribe(equipeUser => {
      console.log("Adicionado com sucesso", equipeUser)
    })
  }


  loadEquipes(){
    this.http.get<EquipeIn[]>("http://localhost:3030/equipe/list").subscribe(dados => this.equipes = dados)
  }
}
