export interface DocumentoIn {
    id: string,
    filename: string,
    createdAt: string,
    updatedAt: string,
    donoId: string
}

export interface DocumentosFilter {
    id: string,
    filename: string,
    donoId: string,
    create: string,
    meta?: Array<String>
}

export interface UserDocu {
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: string,
    updatedAt: string
}

export interface SecaoDTO {
    id: string,
    name: string
}

export interface SecTeste { 
    id: string
}