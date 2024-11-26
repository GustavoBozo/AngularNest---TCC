import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagina-inicial',
  imports: [RouterLink, CommonModule],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css'
})
export class PaginaInicialComponent implements OnInit {


  http = inject(HttpClient)


  nomeUser: string | undefined;
  nomeEquipe: string | undefined;

  ngOnInit(){
    this.nomeEquipeCoki();
    this.nomeUserCoki();
  }

  async nomeUserCoki(){
    
    const res = await this.http.get("http://localhost:3030/usuario/nomeUser")
    .subscribe(nome => {
      this.nomeUser = JSON.stringify(nome).replace(/"/g, '');
    })

    
    
  }


  async nomeEquipeCoki(){
    const res = await this.http.get("http://localhost:3030/usuario/nomeEquipe")
    .subscribe(nome => {
      if(!nome){
        this.nomeEquipe = "Sem Equipe"
      } else {

        this.nomeEquipe = JSON.stringify(nome).replace(/"/g, '');
      }
    })

    return res;
  }


}
