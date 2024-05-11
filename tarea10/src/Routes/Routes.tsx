import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Home";
import Collections from "../Pages/Collections/Collections";
import UsuariosCollections from "../Pages/Collections/Usuarios/UsuariosCollections";
import CategoriasCollections from "../Pages/Collections/Usuarios/CategoriasCollections";
import SesionCollections from "../Pages/Collections/Usuarios/SesionCollection";
import SesionProductCollections from "../Pages/Collections/Usuarios/SesionProductCollection";
import ProductosCollection from "../Pages/Collections/Usuarios/ProductosCollection";
import DireccionCollection from "../Pages/Collections/Usuarios/DireccionCollection";
import GeneroCollection from "../Pages/Collections/Usuarios/GeneroCollection";
import ClientesCollection from "../Pages/Collections/Usuarios/ClientesController";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <Home /> },
            {
                path: "collections",
                element: <Collections />,
                children: [
                    { path: "usuarios", element: <UsuariosCollections /> },
                    { path: "categorias", element: <CategoriasCollections /> },
                    { path: "tipoSesion", element: <SesionCollections /> },
                    { path: "Sesion_Productos", element: <SesionProductCollections /> },
                    { path: "Productos", element: <ProductosCollection /> },
                    { path: "Direccion", element: <DireccionCollection /> },
                    { path: "Genero", element: <GeneroCollection /> },
                    { path: "Clientes", element: <ClientesCollection /> },
                ],
            },
        ],


    },
]);
