import {  Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EmailValidator, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginDto, Login2 } from './login.dto';
import { UserService } from '../../auth.service';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  http = inject(HttpClient)
  router = inject(Router)

  constructor(
    private userService: UserService,
    private cookieService: CookieService
  ) {}


  async login(data: {email: string, password: string}){

    const res = await this.http.post<Login2>("http://localhost:3030/usuario/login", data)
    .subscribe(usuario => {
      console.log(data.email)

      
      console.log('teste2', usuario)
      
      this.userService.updateUserName(usuario.user.nome)
      this.cookieService.set('idLogado', usuario.user.id)
      this.cookieService.set('userLogin', usuario.user.nome)
      console.log(usuario.user.nome)
      
      
    })

    
    if(res){
      this.router.navigate(['/home'])

    }
  }
}
