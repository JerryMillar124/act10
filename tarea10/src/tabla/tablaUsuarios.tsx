import React, { useEffect, useState } from "react";
import { getUsuarios, createUsuarios } from "../services/users";
import { Table, Drawer, Button, Form, Input } from "antd";
import { User } from "../models/users";
import DrawerFooter from "./DrawerFooter";
import supabase from "../utils/supabase";


const TablaUsuarios: React.FC = () => {
    const [users, setUser] = useState<User[]>([]);
    const [nombre, setNombre] = useState<string>('');
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

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

    const handleSubmit = async () => {
        const randomID = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

        try {
            const currentDateTime = new Date();
            const maxIdResponse = await supabase
                .from("usuarios")
                .select("id_usuario")
                .order("id_usuario", { ascending: false })
                .limit(1);

            const maxId = maxIdResponse.data?.[0]?.id_usuario || 0;
            const newId = maxId + 1;
            // Crear el objeto de dirección con el nuevo ID
            const UserInput: User = {
                id_usuario: newId,
                nombre,
                fechacreacion: currentDateTime,
                fk_creadopor: randomID,
            };

            await createUsuarios(UserInput);

            const updateUser = await getUsuarios();
            setUser(updateUser);
            onClose();
        } catch (error) {
            console.error("Error creating usuarios:", error);
        }
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Agregar usuario
            </Button>
            <Table columns={columns} dataSource={users} />
            <Drawer title="Agregar Usuarios" onClose={onClose} open={open} footer={<DrawerFooter createRecord={handleSubmit} />}>
                <Form onFinish={handleSubmit}>
                    <Form.Item<User>
                        label="Nombre"
                        name="nombre"
                        rules={[{ required: true, message: "Agrega el nombre" }]}
                    >
                        <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </Form.Item>



                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
}

export default TablaUsuarios;