import {  Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from './login.dto';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  http = inject(HttpClient)
  router = inject(Router)



  async login(data: {email: string, password: string}){
    const res = await this.http.post<LoginDto>("http://localhost:3030/usuario/login", data)
    .subscribe(usuario => {
      console.log("Logado", usuario)
      
    })

    
    if(res){
      this.router.navigate(['/home'])
    }
  }
}
