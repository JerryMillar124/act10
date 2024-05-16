export interface Direction {
    id_direccion: number;
    codigopostal: string;
    calle: string;
    numext: string;
    numint: string;
    ciudad: string;
    fechacreacion: Date;
    fk_creadopor?: number | null;
    fechaact?: Date| null;
    fk_actualizadopor?: number| null;
    fechaeliminado?: Date | null;
    fk_eliminadopor?: number | null;
    }