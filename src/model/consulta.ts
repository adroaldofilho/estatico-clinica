import { Usuario } from './usuario';
import { ProfissionalClinica } from './profissionalclinica';
import { Plano } from './plano';
import { DocumentoConsulta } from './documentoconsulta';

export class Consulta {
    idConsulta: number;
    idUsuario: number;
    idProfissionalClinica: number;
    dataHoraConsulta: Date;
    statusConsulta: number;
    idPlano: number;
    Usuario?: Usuario;
    ProfissionalClinica?: ProfissionalClinica;
    Plano?: Plano;
    DocumentoConsulta?: DocumentoConsulta;
}
