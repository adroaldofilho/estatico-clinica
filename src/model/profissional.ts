import { Usuario } from './usuario';
import { ProfissionalEspecialidade } from './profissionalespecialidade';

export class Profissional {
    idProfissional: number;
    idUsuario: number;
    picture: Blob;
    Usuario?: Usuario;
    ProfissionalEspecialidades?: ProfissionalEspecialidade[];
}
