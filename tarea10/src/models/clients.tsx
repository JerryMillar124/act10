export interface Client {
    id_cliente: number;
    nombre: string;
    apellido: string;
    fechanac: Date;
    idgenero: number;
    telefono: string;
    correo: string;
    iddireccion: number;
    fechacreacion: Date;
    fk_creadopor?: number | null;
    fechaactualizacion?: Date| null;
    fk_actualizadopor?: number| null;
    fechaeliminacion?: Date | null;
    fk_eliminadopor?: number | null;
    }