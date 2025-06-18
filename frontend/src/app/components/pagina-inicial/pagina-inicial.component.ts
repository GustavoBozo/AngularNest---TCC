import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, BehaviorSubject, Subscription, firstValueFrom } from 'rxjs';
import { EquipeDTO2 } from '../controle-equipe/dto/equipe.dto';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { UserService } from '../../auth.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { DocumentoService } from '../../document.service';
import { MetadadoIn2 } from '../metadados/equipe';
import { DocumentoIn, DocumentosFilter, SecaoDTO, SecTeste, UserDocu } from './dto';
import { NgZone } from '@angular/core';
import { SelectModule } from 'primeng/select';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pagina-inicial',
  imports: [CommonModule, FormsModule, MenuComponent, MultiSelectModule, SelectModule],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css'
})
export class PaginaInicialComponent implements OnInit {
 
  
  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private document: DocumentoService,
    private cookie: CookieService,
    private ngZ: NgZone
  ) {}

  @ViewChild('modalDocumento') form!: ElementRef;
  @ViewChild('modalSecao') formSec!: ElementRef;
  @ViewChild('modalDocumentoDelete') delete!: ElementRef;

  
  http = inject(HttpClient)

  fileSelect: File | null = null;

  secaoAtiva: string = '';

  onFileSelected(event: any) {
    this.fileSelect = event.target.files[0];
  }

  openModalDocumento(){
    this.form.nativeElement.style.display = 'block';
  }

  
  closeModalDocumento(){
    this.form.nativeElement.style.display = 'none';
  }

  //Modal Seção
  openSecModal(){
    this.formSec.nativeElement.style.display = 'block';
  }

  closeModalSec(){
    this.formSec.nativeElement.style.display = 'none';
  }

  deleteName: string | undefined

  //Modal Delete
  openDelete(id:string, name: string){
    this.delete.nativeElement.style.display = 'block';
    this.deleteId = id;
    this.deleteName = name
  }

  closeDelete(){
    this.delete.nativeElement.style.display = 'none';
    this.deleteId = '';
  }

  createSec(data: SecaoDTO){
    return this.http.post<SecaoDTO>("http://localhost:3030/secao/create", data)
    .subscribe(metadado => {
      console.log("Metadado Criado", metadado)
      this.loadSecao()
      this.closeModalSec()
    })
  }

  deleteId: string | undefined;

  deleteDocumento(){
    return this.http.delete<any>(`http://localhost:3030/documento/delete/${this.deleteId}`, {})
    .subscribe(deletado => {
      location.reload()
    })
  }


  nomeUser?: string;
  nomeEquipe?: string;
  data?: EquipeDTO2;
  idTeste?: string;
  nomeUserDocu?: string

  async ngOnInit(){
    

    this.ngZ.run(() => {
      this.getDocumentosSec(this.secaoAtiva);

      this.teste();
      this.loadMetadados();

      this.loadSecao();
    });
  }
  
  


  metadadosFile: MetadadoIn2[] | undefined;

  metadadosTeste: MetadadoIn2[] | undefined;

  metadadosFiltro: MetadadoIn2[] | undefined;

  documentosUp: DocumentoIn[] | undefined;

  documentosUp1: DocumentoIn[] | undefined;

  selectedCities: any[] = [];

  selectedSecs: any[] = [];

  selectedFiltro: any[] = [];

  secoes: SecaoDTO[] = []


  documentosFinal: DocumentosFilter[] = [];

  async loadMetadados(){
    this.http.get<MetadadoIn2[]>("http://localhost:3030/metadado/list").subscribe(dados => {
      
      this.metadadosTeste = dados;
      this.metadadosFiltro = dados;
    })
    
  }

  async pesquisar(){
    

    const formData = new FormData();
    formData.append('metadados', JSON.stringify(this.selectedFiltro));
    let documentos: any[] = [];

    return this.http.post("http://localhost:3030/documento/filtrar", formData).subscribe(dado => {
      documentos = [dado]

      this.documentosFinal = []
      documentos.map(async (item) => {
        item.map(async (final: any) => {
          const data1: {
          donoId: string;
          filename: string;
          id: string;
          create: string;
          meta: []
        } = {
          donoId: "",
          filename: "",
          id: "",
          create: "",
          meta: []
        };
        
          console.log(item)
  
          data1.id = final.id
          data1.filename = final.filename
          data1.create = final.createdAt
        
          data1.meta = final.documentMetadata.map((meta: any) => meta.metadados.description)
          
          console.log(data1)

          
          
          this.documentosFinal?.push(data1)
        })
  
      })
    });
    
  }

  async loadSecao(){
    this.http.get<SecaoDTO[]>("http://localhost:3030/secao/list").subscribe(dados => {
      this.secoes = dados

      this.secaoAtiva = dados[0].name
      this.idSec = dados[0].id
      console.log(this.idSec)
    })
      
  }

  idSec: string = ''
  
  async trocarSec(secName: string){
    
    this.secaoAtiva = secName
    this.documentosFinal = [];

    const idSec1 = await firstValueFrom(this.http.get<any[]>(`http://localhost:3030/secao/list/${this.secaoAtiva}`)) 
    
    this.idSec = idSec1[0].id
    
    await this.getDocumentosSec(this.secaoAtiva);
    
    

    
  }

  async uploadDocumento() {
    if (!this.fileSelect) {
      alert('Selecione um arquivo!');
      return;
    }

    if(this.cookie.check('idLogado')){

      const idUser = this.cookie.get('idLogado')
      console.log(this.selectedCities)

      this.document.uploadDocumento(this.fileSelect, this.selectedCities, idUser, this.idSec).subscribe(response => {console.log("documento enviado com sucesso", response)});
      this.closeModalDocumento()
    }

  }

  

  async getDocumentos() {
    this.http.get<any[]>("http://localhost:3030/documento/list").subscribe(dados => this.documentosUp = dados)

    const teste1: [] = []
    

    this.documentosUp?.map(async (item) => {
      const data1: {
        donoId: string;
        filename: string;
        id: string;
        create: string;
      } = {
        donoId: "",
        filename: "",
        id: "",
        create: ""
      };
      
        console.log(item)

        data1.id = item.id
        data1.filename = item.filename
        data1.create = item.createdAt


        const res1 = await this.http.get<UserDocu>(`http://localhost:3030/usuario/listId/${item.donoId}`).subscribe(nomes => {
          this.nomeUserDocu = nomes.name
          if(this.nomeUserDocu){
            data1.donoId = this.nomeUserDocu
          }

          

          

        })
        this.documentosFinal?.push(data1)
        console.log(this.documentosFinal)

    })

  }

  metadadosDocu: [] = []

  async getDocumentosSec(nomeSec: string) {
    console.log(nomeSec)
    
    this.documentosFinal = []
    await this.http.get<any[]>(`http://localhost:3030/documento/list/${nomeSec}`).subscribe(async dados => {

      this.metadadosDocu = []
      dados.map(async (item) => {
        const data1: {
          donoId: string;
          filename: string;
          id: string;
          create: string;
          meta: []
        } = {
          donoId: "",
          filename: "",
          id: "",
          create: "",
          meta: []
        };
        
          console.log(item)
  
          data1.id = item.id
          data1.filename = item.filename
          data1.create = item.createdAt
        
          data1.meta = item.documentMetadata.map((meta: any) => meta.metadados.description)
          
          console.log(data1)

          const res1 = await this.http.get<UserDocu>(`http://localhost:3030/usuario/listId/${item.donoId}`).subscribe(nomes => {
            this.nomeUserDocu = nomes.name
            if(this.nomeUserDocu){
              data1.donoId = this.nomeUserDocu
            }
  
            
  
            
  
          })
          
          this.documentosFinal?.push(data1)
  
      })
    })
    
    
    
    

  }

  
  async teste(){
    this.nomeUser = this.cookie.get('userLogin')

    console.log(this.nomeUser)
    const res1 = await this.http.get<EquipeDTO2>(`http://localhost:3030/equipe/listEquipe/${this.idTeste}`)
    .subscribe(nome1 => {
      const a = JSON.stringify(nome1)
      this.data = JSON.parse(a)[0]
      this.nomeEquipe = this.data?.team.name
      
      
      this.userService.updateUserTeam(this.nomeEquipe);
    })
    
  }


}
