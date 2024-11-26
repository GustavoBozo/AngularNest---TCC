import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { Router, RouterLink } from '@angular/router';
import { MetadadoIn } from './equipe';


@Component({
  selector: 'app-metadados',
  imports: [FormsModule, CommonModule],
  templateUrl: './metadados.component.html',
  styleUrl: './metadados.component.css'
})
export class MetadadosComponent implements OnInit {

  @ViewChild('modalMetadado') form!: ElementRef;
  @ViewChild('modalMetadadoDelete') delete!: ElementRef;

  http = inject(HttpClient)
  router = inject(Router)

  ngOnInit() {
    this.loadMetadata();
  }



  metadados:  MetadadoIn[] | undefined;

  deleteId: string | undefined;

  loadMetadata(){
    this.http.get<MetadadoIn[]>("http://localhost:3030/metadado/list").subscribe(dados => this.metadados = dados)

  }

  openModal(){
    this.form.nativeElement.style.display = 'block';
  }

  closeModal(){
    this.form.nativeElement.style.display = 'none';
  }

  openModalDelete(id:string){
    this.delete.nativeElement.style.display = 'block';
    this.deleteId = id;
    console.log(this.deleteId);
  }

  closeModalDelete(){
    this.delete.nativeElement.style.display = 'none';
  }


  createMetadado(data: MetadadoIn){
    return this.http.post<MetadadoIn>("http://localhost:3030/metadado/create", data)
    .subscribe(metadado => {
      console.log("Metadado Criado", metadado)
      location.reload()
    })
  }


  deleteMetadado(){
    return this.http.post<any>(`http://localhost:3030/metadado/delete/${this.deleteId}`, {})
    .subscribe(deletado => {
      location.reload()
    })
  }


}
