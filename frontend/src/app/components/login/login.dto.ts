export class LoginDto {
  email!: string
  password!: string 
}

export class Login2 {
  accesToken!: string
  refreshToken!: string
  user!: {
    nome: string,
    id: string
  }
}
