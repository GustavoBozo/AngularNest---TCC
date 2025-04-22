import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import {  Prisma } from '@prisma/client'

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  http = inject(HttpClient)
  router = inject(Router)

  

  createUser(data: {name: string, email: string, password: string}){
    const res =  this.http.post("http://localhost:3030/usuario/create", data)
    .subscribe(usuario => {
      console.log("Usuario Criado", usuario)
    })

    if(res){
      this.router.navigate(['/'])
    }
  }

  voltar(){
    history.back()
  }




}
