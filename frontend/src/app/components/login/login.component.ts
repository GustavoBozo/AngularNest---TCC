import {  Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EmailValidator, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginDto, Login2 } from './login.dto';
import { UserService } from '../../auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent {
  http = inject(HttpClient)
  router = inject(Router)

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService
  ) {}

  SemDados() {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Informe Email e Senha' });
  }

  DadosIncorretos() {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Informe Email e Senha' });
  }


  async login(data: {email: string, password: string}){

    if(data.email == '' || data.password == '') {
      console.log(data)
      this.SemDados()
    } else {

      const res = await this.http.post<Login2>("http://localhost:3030/usuario/login", data)
      .subscribe({
        next: (usuario) => {

          console.log(data.email)
    
          
          console.log('teste2', usuario)
          
          this.userService.updateUserName(usuario.user.nome)
          this.cookieService.set('idLogado', usuario.user.id)
          this.cookieService.set('userLogin', usuario.user.nome)
          console.log(usuario.user.nome)
          
        },
        error: (httpError) => {
          if(httpError.status == 401) {

          }
        }
        
      })
  
      
      if(res){
        this.router.navigate(['/home'])
  
      }
    }

  }
}
