import React, { useEffect, useState } from "react";
import { getSesionProductos, createSesionProductos } from "../services/sessionsProduct";
import { Table, Drawer, Button, Form, InputNumber, InputNumberProps } from "antd";
import { SessionProduct } from "../models/sessionsProduct";
import DrawerFooter from "./DrawerFooter";
import supabase from "../utils/supabase";


const TablaSesionesProductos: React.FC = () => {
    const [session_product, setSessionProduct] = useState<SessionProduct[]>([]);
    const [idproducto, setIDProducto] = useState<number>(0);
    const [cantidad, setCantidad] = useState<number>(0);

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchSessionProduct = async () => {
            try {
                const session_product = await getSesionProductos();
                setSessionProduct(session_product);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchSessionProduct();
    }, []);

    const handleSubmit = async () => {

        try {
            // Consultar el ID máximo actual en la tabla direccion
            const maxIdResponse = await supabase
                .from("sesiones_productos")
                .select("idsesion")
                .order("idsesion", { ascending: false })
                .limit(1);

            const maxId = maxIdResponse.data?.[0]?.idsesion || 0;
            const newId = maxId + 1;

            const sesionProductosInput: SessionProduct = {
                idsesion: newId,
                idproducto,
                cantidad,
            };

            // Insertar el nuevo registro en la base de datos
            await createSesionProductos(sesionProductosInput);

            // Actualizar la lista de direcciones después de la inserción
            const updatedSessionProducts = await getSesionProductos();
            setSessionProduct(updatedSessionProducts);
            onClose();
        } catch (error) {
            console.error("Error creating sesion productos:", error);
        }
    };

    const onChangeP: InputNumberProps['onChange'] = (value) => {
        if (value !== null && typeof value === 'number') {
            setIDProducto(value);
        } else {
            setIDProducto(0);
        }
    };

    const onChangeC: InputNumberProps['onChange'] = (value) => {
        if (value !== null && typeof value === 'number') {
            setCantidad(value);
        } else {
            setCantidad(0);
        }
    };

    const columns = [
        {
            title: 'ID_Sesion',
            dataIndex: 'fk_sesion',
            key: 'fk_sesion',

        },
        {
            title: 'ID_Producto',
            dataIndex: 'fk_productos',
            key: 'fk_productos',
        },

        {
            title: 'Cantidad',
            dataIndex: 'cantidad',
            key: 'cantidad',
        }
    ];

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Agregar sesiones productos
            </Button>
            <Table columns={columns} dataSource={session_product} />
            <Drawer title="Agregar Sesiones Productos" onClose={onClose} open={open} footer={<DrawerFooter createRecord={handleSubmit} />}>
                <Form>

                    <Form.Item<SessionProduct>
                        label="ID_Producto"
                        name="idproducto"
                        rules={[{ required: true, message: "Agrega el ID del producto" }]}
                    >
                        <InputNumber defaultValue={idproducto} onChange={onChangeP} />          </Form.Item>

                    <Form.Item<SessionProduct>
                        label="Cantidad"
                        name="cantidad"
                        rules={[{ required: true, message: "Agrega cantidad del producto" }]}
                    >
                        <InputNumber defaultValue={cantidad} onChange={onChangeC} />          </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
}

export default TablaSesionesProductos;