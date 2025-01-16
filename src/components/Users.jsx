import { useEffect } from 'react';
import useAuthStore from '../store/authStore';
import useUsersStore from '../store/userStorage';

const UsersTable = () => {
  const  {getData} = useUsersStore();
  const data = useAuthStore((state) => state.data)
  console.log('data', data)

  useEffect(() => {
    getData();
  }, [getData]);


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
    </div>
  );
};

export default UsersTable;
