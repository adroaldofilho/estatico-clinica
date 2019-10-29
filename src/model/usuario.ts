import { Consulta } from './consulta';

export class Usuario {
    idUsuario: number;
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    picture: Blob;
    tipoUsuario: string;
    Consulta?: Consulta[];
}
