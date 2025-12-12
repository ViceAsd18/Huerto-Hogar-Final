import { Table } from 'antd';
import type { User } from 'services/usuario';
import Boton from '../../atomos/Boton';

interface UsuariosTableProps {
  usuarios: User[];
  onEditar: (usuario: User) => void;
}

const UsuariosTable = ({ usuarios, onEditar }: UsuariosTableProps) => {
  const columns = [
    { title: 'ID', dataIndex: 'id_usuario', key: 'id_usuario' },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Rol', dataIndex: 'rol', key: 'rol' },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_: any, record: User) => (
        <Boton onClick={() => onEditar(record)} color='#1890ff'>
            Editar 
        </Boton>
      ),
    },
  ];

  return <Table style={{overflow : 'auto'}} dataSource={usuarios} columns={columns} rowKey="id_usuario" />;
};

export default UsuariosTable;
