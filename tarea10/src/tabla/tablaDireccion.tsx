import React, { useEffect, useState } from "react";
import { getDireccion, createDireccion } from "../services/direction";
import { Table, Drawer, Button, Form, Input } from "antd";
import { Direction } from "../models/direction";
import DrawerFooter from "./DrawerFooter";
import supabase from "../utils/supabase";

const TablaDireccion: React.FC = () => {
    const [direction, setDirection] = useState<Direction[]>([]);
    const [open, setOpen] = useState(false);
    const [codigopostal, setCP] = useState<string>('');
    const [calle, setCalle] = useState<string>('');
    const [numext, setNumEXT] = useState<string>('');
    const [numint, setNumINT] = useState<string>('');
    const [ciudad, setCiudad] = useState<string>('');


    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchDirection = async () => {
            try {
                const direction = await getDireccion();
                setDirection(direction);
            } catch (error) {
                console.error("Error fetching direccion:", error);
            }
        };

        fetchDirection();
    }, []);

    const onChangeCodigoPostal = (value: string | null | undefined) => {
        if (value !== null && value !== undefined) {
            setCP(value);
        } else {
            setCP('');
        }
    };

    const handleSubmit = async () => {
        const randomID = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

        try {
            const currentDateTime = new Date();
            // Consultar el ID máximo actual en la tabla direccion
            const maxIdResponse = await supabase
                .from("direccion")
                .select("id_direccion")
                .order("id_direccion", { ascending: false })
                .limit(1);

            const maxId = maxIdResponse.data?.[0]?.id_direccion || 0;
            const newId = maxId + 1;

            // Crear el objeto de dirección con el nuevo ID
            const direccionInput: Direction = {
                id_direccion: newId,
                codigopostal,
                calle,
                numext,
                numint,
                ciudad,
                fechacreacion: currentDateTime,
                fk_creadopor: randomID
            };

            // Insertar el nuevo registro en la base de datos
            await createDireccion(direccionInput);

            // Actualizar la lista de direcciones después de la inserción
            const updatedDireccion = await getDireccion();
            setDirection(updatedDireccion);
            onClose();
        } catch (error) {
            console.error("Error creating direccion:", error);
        }
    };

    const columns = [
        {
            title: 'ID_Direccion',
            dataIndex: 'id_direccion',
            key: 'id_direccion',

        },

        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        },

        {
            title: 'Codigo_Postal',
            dataIndex: 'codigo_postal',
            key: 'codigo_postal',
        },

        {
            title: 'Calle',
            dataIndex: 'calle',
            key: 'calle',
        },

        {
            title: 'Colonia',
            dataIndex: 'colonia',
            key: 'colonia',
        },

        {
            title: 'Numero_Exterior',
            dataIndex: 'numero_exterior',
            key: 'numero_exterior',
        },

        {
            title: 'Numero_Interior',
            dataIndex: 'numero_interior',
            key: 'numero_interior',
        },

        {
            title: 'Ciudad',
            dataIndex: 'ciudad',
            key: 'ciudad',
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

        {
            title: 'FechaEliminado',
            dataIndex: 'fecha_eliminacion',
            key: 'fecha_eliminacion',
        },
    ];

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Agregar dirección
            </Button>
            <Table columns={columns} dataSource={direction}
            />
            <Drawer title="Agregar Direccion" onClose={onClose} open={open} footer={<DrawerFooter createRecord={handleSubmit} />}>
                <Form onFinish={handleSubmit}>
                    <Form.Item<Direction>
                        label="Codigo_Postal"
                        name="codigopostal"
                        rules={[{ required: true, message: "Agrega el código postal" }]}
                    >
                        <Input value={codigopostal} onChange={(e) => setCP(e.target.value)} />
                    </Form.Item>
                    <Form.Item<Direction>
                        label="Calle"
                        name="calle"
                        rules={[{ required: true, message: "Agrega la calle" }]}
                    >
                        <Input value={calle} onChange={(e) => setCalle(e.target.value)} />
                    </Form.Item>

                    <Form.Item<Direction>
                        label="Num_Exterior"
                        name="numext"
                        rules={[{ required: true, message: "Agrega el número exterior" }]}
                    >
                        <Input value={numext} onChange={(e) => setNumEXT(e.target.value)} />
                    </Form.Item>

                    <Form.Item<Direction>
                        label="Num_Interior"
                        name="numint"
                        rules={[{ required: true, message: "Agrega el número interior" }]}
                    >
                        <Input value={numint} onChange={(e) => setNumINT(e.target.value)} />
                    </Form.Item>

                    <Form.Item<Direction>
                        label="Ciudad"
                        name="ciudad"
                        rules={[{ required: true, message: "Agrega la ciudad" }]}
                    >
                        <Input value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
}

export default TablaDireccion;