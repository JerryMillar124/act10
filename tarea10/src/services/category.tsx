import supabase from "../utils/supabase"
import { Category } from "../models/category";

export const getCategorias = async (): Promise<Category[]> => {
    const { data, error } = await supabase.from("categorias").select();
    if (error) {
        console.error("Error fetching category:", error);
    } else {
        console.log("Category:", data);
    }
    return data || [];

}

export const createCategoria = async (categoria: Category): Promise<void> => {
    const { error } = await supabase.from("categorias").insert(categoria);
    if (error) throw error;
}