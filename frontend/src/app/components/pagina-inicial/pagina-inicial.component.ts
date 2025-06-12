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
import { DocumentoIn, DocumentosFilter, UserDocu } from './dto';



import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pagina-inicial',
  imports: [RouterLink, CommonModule, FormsModule, MenuComponent, MultiSelectModule],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css'
})
export class PaginaInicialComponent implements OnInit {
 
  
  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private document: DocumentoService,
    private cookie: CookieService
  ) {}

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

  nomeUser?: string;
  nomeEquipe?: string;
  data?: EquipeDTO2;
  idTeste?: string;
  nomeUserDocu?: string

  async ngOnInit(){
    await this.teste();
    await this.loadMetadados();
    await this.getDocumentos();
  }
  
  


  metadadosFile: MetadadoIn2[] | undefined;

  metadadosTeste: MetadadoIn2[] | undefined;

  documentosUp: DocumentoIn[] | undefined;

  selectedCities: any[] = [];


  documentosFinal: DocumentosFilter[] = [];

  async loadMetadados(){
    this.http.get<MetadadoIn2[]>("http://localhost:3030/metadado/list").subscribe(dados => this.metadadosTeste = dados)

    
  }

  

  
  
  async uploadDocumento() {
    if (!this.fileSelect) {
      alert('Selecione um arquivo!');
      return;
    }

    if(this.cookie.check('idLogado')){

      const idUser = this.cookie.get('idLogado')

      this.document.uploadDocumento(this.fileSelect, this.selectedCities, idUser).subscribe(response => {console.log("documento enviado com sucesso", response)});
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
