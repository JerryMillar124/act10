export interface Product {
    id_producto: number;
    nombre: string;
    descripcion: string;
    precio: number;
    idcategoria: number;
    fechacreacion: Date;
    fk_creadopor?: number | null;
    fechaactualizacion?: Date| null;
    fk_actualizadopor?: number| null;
    fechaeliminacion?: Date | null;
    fk_eliminadopor?: number | null;
    }