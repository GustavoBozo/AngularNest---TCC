import { CommonModule, JsonPipe } from '@angular/common';
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
    private document: DocumentoService
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
  idTeste?: string

  async ngOnInit(){
    
    
    await this.nomeEquipeCoki();
    await this.teste();
    await this.loadMetadados();
    
  }
  
  async nomeEquipeCoki(){
    
    this.nomeUser = localStorage.getItem('userLogin')?.toString()

    try {

      const res = await firstValueFrom(this.http.get("http://localhost:3030/usuario/idUser"));
      this.idTeste = res.toString()

      
      
    } catch (err) {
      console.log(err)
    }
    
    
  }


  metadadosFile: MetadadoIn2[] | undefined

  metadadosTeste: MetadadoIn2[] | undefined;
  selectedCities: any[] = [];


  async loadMetadados(){
    this.http.get<MetadadoIn2[]>("http://localhost:3030/metadado/list").subscribe(dados => this.metadadosTeste = dados)
  }

  

  
  
  async uploadDocumento() {
    if (!this.fileSelect) {
      alert('Selecione um arquivo!');
      return;
    }

      this.document.uploadDocumento(this.fileSelect, this.selectedCities).subscribe(response => {console.log("documento enviado com sucesso", response)});
      this.closeModalDocumento()
  }

  
  async teste(){
    const res1 = await this.http.get<EquipeDTO2>(`http://localhost:3030/equipe/listEquipe/${this.idTeste}`)
    .subscribe(nome1 => {
      const a = JSON.stringify(nome1)
      this.data = JSON.parse(a)[0]
      this.nomeEquipe = this.data?.team.name
      
      console.log(this.nomeEquipe)
      this.userService.updateUserTeam(this.nomeEquipe);
    })
    
  }


}
