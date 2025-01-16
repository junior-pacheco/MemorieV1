import { useEffect } from 'react';
import useAuthStore from '../store/authStore';
import useUsersStore from '../store/userStorage';
import { useNavigate } from 'react-router-dom';

const UsersTable = () => {
  const  {getData} = useUsersStore();
  const {logout} = useAuthStore()
  const data = useUsersStore((state) => state.data)
  const token = useAuthStore((state) => state.token)
  const navigate = useNavigate()

  useEffect(() => {
    getData();
    if (!token) {
      navigate('/')
    }
  }, [getData, token]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default UsersTable;
