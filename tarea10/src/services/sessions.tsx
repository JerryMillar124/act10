import supabase from "../utils/supabase"
import { Session } from "../models/sessions";


export const getSesiones = async (): Promise<Session[]> => {
    const { data, error } = await supabase.from("sesiones").select();
    if (error) throw error;
    else {
        console.log("Session:", data);
    }
    return data || [];
}

export const createSesion = async (sesion: Session): Promise<void> => {
    const { error } = await supabase.from("sesiones").insert(sesion);
    if (error) throw error;
}