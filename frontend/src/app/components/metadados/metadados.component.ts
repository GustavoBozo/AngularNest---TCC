import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { Router, RouterLink } from '@angular/router';
import { Metadado } from '@prisma/client';


@Component({
  selector: 'app-metadados',
  imports: [FormsModule, CommonModule],
  templateUrl: './metadados.component.html',
  styleUrl: './metadados.component.css'
})
export class MetadadosComponent {

  @ViewChild('modalMetadado') form!: ElementRef;
  @ViewChild('modalMetadadoDelete') delete!: ElementRef;

  http = inject(HttpClient)
  router = inject(Router)

  ngOnInit() {
    this.loadMetadata();
  }



  metadados: Metadado[] | undefined;

  deleteId: number | undefined;

  loadMetadata(){
    this.http.get<Metadado[]>("http://localhost:3000/metadado/list").subscribe(dados => this.metadados = dados)

  }

  openModal(){
    this.form.nativeElement.style.display = 'block';
  }

  closeModal(){
    this.form.nativeElement.style.display = 'none';
  }

  openModalDelete(id:number){
    this.delete.nativeElement.style.display = 'block';
    this.deleteId = id;
    console.log(this.deleteId);
  }

  closeModalDelete(){
    this.delete.nativeElement.style.display = 'none';
  }


  createMetadado(data: {description: string}){
    return this.http.post<Metadado>("http://localhost:3000/metadado/create", data)
    .subscribe(metadado => {
      console.log("Metadado Criado", metadado)
      location.reload()
    })
  }


  deleteMetadado(){
    return this.http.post<any>(`http://localhost:3000/metadado/delete/${this.deleteId}`, {})
    .subscribe(deletado => {
      location.reload()
    })
  }


}
