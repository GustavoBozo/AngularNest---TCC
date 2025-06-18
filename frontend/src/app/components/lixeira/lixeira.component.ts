import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { Router, RouterLink } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-lixeira',
  imports: [FormsModule, CommonModule, MenuComponent],
  templateUrl: './lixeira.component.html',
  styleUrl: './lixeira.component.css'
})
export class LixeiraComponent {
  http = inject(HttpClient)
  router = inject(Router)

  ngOnInit() {
    this.loadInati();
  }

  documentosInativos: any[] = []
  
  @ViewChild('modalAtivar') delete!: ElementRef
  
  idAtivar: string = ''
  deleteName: string = ''

  async openModalDelete(id: string, name: string){
      this.idAtivar = id
      this.deleteName = name
      console.log(this.idAtivar)
      this.delete.nativeElement.style.display = 'block';
  }

  async closeModalDelete(){
      
      this.idAtivar = ''
      this.deleteName = ''
      this.delete.nativeElement.style.display = 'none';
  }

  
  async loadInati(){
    this.http.get<any[]>("http://localhost:3030/documento/inativo").subscribe(dados => this.documentosInativos = dados)
  }

  async ativarArquivo(){
    console.log("Passou", this.idAtivar)
    return this.http.post<any>(`http://localhost:3030/documento/ativo/${this.idAtivar}`, {})
    .subscribe(deletado => {
      location.reload()
    })
  }


}
