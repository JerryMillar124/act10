export interface Category {
    id_categoria: number;
    nombre: string;
    fechacreacion?: Date | null;
    fk_creadopor?: number | null;
    FechaActu?: Date | null;
    fk_ActualizadoPor?: number | null;
    FechaEliminado?: Date | null;
    fk_EliminadoPor?: number | null;
}