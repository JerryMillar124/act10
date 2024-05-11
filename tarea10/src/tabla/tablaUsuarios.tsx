import React, { useEffect, useState } from "react";
import { getUsuarios } from "../services/users";
import { Form, Input, Table } from "antd";
import { User } from "../models/users";
import { Button, Drawer } from 'antd';
import DrawerFooter from "./DrawerFooter";


const TablaUsuarios: React.FC = () => {

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const [users, setUser] = useState<User[]>([]);



    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUsuarios();
                setUser(user);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchUser();
    }, []);

    const columns = [
        {
            title: 'ID_Usuario',
            dataIndex: 'id_usuario',
            key: 'id_usuario',

        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        },

        {
            title: 'Fecha_Creacion',
            dataIndex: 'fecha_creacion',
            key: 'fecha_creacion',
        },

        {
            title: 'Fecha_Actualizacion',
            dataIndex: 'fecha_actualizacion',
            key: 'fecha_actualizacion',
        },
    ];

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Open
            </Button>
            <Drawer title="Basic Drawer" onClose={onClose} open={open} footer={<DrawerFooter />}>
                <Form>
                    <Form.Item label="nombre de usuario"
                        name="nombre">
                        <Input />
                    </Form.Item>
                    <Form.Item label="apellido de usuario"
                        name="apellido">
                        <Input />
                    </Form.Item>
                </Form>
            </Drawer>
            <Table
                columns={columns}
                dataSource={users}
            />

        </>
    );
}

export default TablaUsuarios;