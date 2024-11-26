import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { EquipeDTO2 } from '../controle-equipe/dto/equipe.dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagina-inicial',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css'
})
export class PaginaInicialComponent implements OnInit {

  @ViewChild('modalDocumento') form!: ElementRef;
  http = inject(HttpClient)

  fileSelect: File | null = null;


  onFileSelected(event: any) {
    this.fileSelect = event.target.files[0];
  }

  openModalDocumento(){
    this.form.nativeElement.style.display = 'block';
  }

  closeModalDocumento(){
    this.form.nativeElement.style.display = 'none';
  }

  nomeUser: string | undefined;
  nomeEquipe: string | undefined;
  data: EquipeDTO2 | undefined;

  ngOnInit(){
    this.nomeEquipeCoki();
    this.nomeUserCoki();
    this.teste();
  }

  async nomeUserCoki(){
    
    const res = await this.http.get("http://localhost:3030/usuario/nomeUser")
    .subscribe(nome => {
      this.nomeUser = JSON.stringify(nome).replace(/"/g, '');
    })

    
    
  }

  async uploadDocumento() {
    const res = await this.http.post("http://localhost:3030/documento/upload", this.fileSelect)
    .subscribe(nome => {
      console.log("documentoEnviado")
    })
  }

  idTeste: string | undefined

  async nomeEquipeCoki(){
    const res = await this.http.get("http://localhost:3030/usuario/idUser")
    .subscribe(async (nome1) => {
      this.idTeste = JSON.stringify(nome1).replace(/"/g, '')
      console.log(this.idTeste)
    })
    
    return res;
  }

  async teste(){
    const res = await this.http.get<EquipeDTO2>(`http://localhost:3030/equipe/listEquipe/${this.idTeste}`)
    .subscribe(nome1 => {
      const a = JSON.stringify(nome1)
      this.data = JSON.parse(a)[0]
      this.nomeEquipe = this.data?.team.name
    })
  }


}
