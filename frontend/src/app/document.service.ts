import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  private apiUrl = 'http://localhost:3030'; // Ajuste para a URL do seu backend NestJS

  constructor(private http: HttpClient) { }

  uploadDocumento(file: File, metadados: any[], idDono: string, secId: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadados', JSON.stringify(metadados));
    formData.append('idDono', idDono);
    formData.append('idSec', secId);
    
    return this.http.post(`${this.apiUrl}/documento/upload`, formData);
  }

  pesquisarDocumento(metadados: any[]){
    const formData = new FormData();
    formData.append('metadados', JSON.stringify(metadados));
    
    return this.http.post(`${this.apiUrl}/documento/filtrar`, formData);
  }
}