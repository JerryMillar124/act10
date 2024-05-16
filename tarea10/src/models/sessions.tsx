export interface Session {
    id_sesion: number;
    fecha_sesion?: Date| null;
    hora_sesion?: TimeRanges;
    idcliente: number;
    fechaventa: Date;
    fechacreacion: Date;
    fk_creadopor?: number | null;
    fechaactualizacion?: Date| null;
    fk_actualizadopor?: number| null;
    fechaeliminacion?: Date | null;
    fk_eliminadopor?: number | null;
    }