import React, { useEffect, useState } from "react";
import { getCategory } from "../services/category";
import { Button, Drawer, Form, Input, Table } from "antd";
import { Category } from "../models/category";
import DrawerFooter from "./DrawerFooter";

const TablaCategorias: React.FC = () => {

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const [category, setCategory] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categories = await getCategory();
                setCategory(categories);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchCategory();
    }, []);

    const columns = [
        {
            title: 'ID_Categoria',
            dataIndex: 'id_categoria',
            key: 'id_categoria',

        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        },

        {
            title: 'FechaCreacion',
            dataIndex: 'fecha_creacion',
            key: 'fecha_creacion',
        },

        {
            title: 'Fecha_Actualizacion',
            dataIndex: 'fecha_actualizacion',
            key: 'fecha_actualizacion',
        },

        {
            title: 'Creado_Por',
            dataIndex: 'fk_creado_por',
            key: 'fk_creado_por',
        },

        {
            title: 'Actualizado_Por',
            dataIndex: 'fk_actualizado_por',
            key: 'fk_actualizado_por',
        },

        {
            title: 'Fecha_Eliminacion',
            dataIndex: 'fecha_eliminacion',
            key: 'fecha_eliminacion',
        },
        {
            title: 'Eliminado_Por',
            dataIndex: 'fk_eliminado_por',
            key: 'fk_eliminado_por',
        }
    ];

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Añadir
            </Button>
            <Table columns={columns} dataSource={category} />
            <Drawer title="Agregar categoria" onClose={onClose} open={open} footer={<DrawerFooter />}>
                <Form>
                    <Form.Item label="Categoria" name="Categoria">
                        <Input />
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
}

export default TablaCategorias;