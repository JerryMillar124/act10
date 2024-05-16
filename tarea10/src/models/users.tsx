export interface User {
    id_usuario: number;
    nombre: string;
    fechacreacion: Date;
    fk_creadopor?: number | null;
    fechaactu?: Date| null;
    fk_actualizadopor?: number| null;
    fechaeliminado?: Date | null;
    fk_eliminadopor?: number | null;
    }