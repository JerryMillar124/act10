export interface Gender {
    id_genero: number;
    genero: string;
    fechacreacion: Date;
    fk_creadopor?: number | null;
    fechaact?: Date| null;
    fk_actualizadopor?: number| null;
    fechaeliminado?: Date | null;
    fk_eliminadopor?: number | null;
    }