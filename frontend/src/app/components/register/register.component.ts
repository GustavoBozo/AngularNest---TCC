import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import {  Prisma } from '@prisma/client'

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  http = inject(HttpClient)



  createUser(data: {name: string, email: string, password: string}){
    return this.http.post("http://localhost:3000/usuario/create", data)
    .subscribe(usuario => {
      console.log("Usuario Criado", usuario)
    })
  }


  

}
