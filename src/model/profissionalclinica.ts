import { Profissional } from './profissional';
import { Clinica } from './clinica';

export class ProfissionalClinica {
    idProfissionalClinica: number;
    idProfissional: number;
    idClinica: number;
    Profissional?: Profissional;
    Clinica?: Clinica;
}
