import { useEffect } from 'react';
import useAuthStore from '../store/authStore';
import useUsersStore from '../store/userStorage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UsersCards = () => {
  const { getData } = useUsersStore();
  const { logout } = useAuthStore();
  const data = useUsersStore((state) => state.data || []); // Garantiza un array por defecto
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getData();
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchData();

    if (!token) {
      navigate('/');
    }
  }, [getData, navigate, token]);

  // Procesar los datos para reemplazar "localhost" por la IP
  const processData = (users) =>
    users.map((user) => ({
      ...user,
      photos: user.images?.map((image) =>
        image.replace('localhost', '192.168.0.246')
      ) || [], // Ensure it defaults to an empty array if no images
      videos: user.videos?.map((video) =>
        video.replace('localhost', '192.168.0.246')
      ) || [],
      qr_code: user.qr_code?.replace('localhost', '192.168.0.246'),
    }));
  

  const processedData = processData(data);

    const deleteUser = async (userId) => {
      try {
        const response = await axios.delete(`http://192.168.0.246:3000/qr-generation/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 200) {
          // Actualiza el estado para eliminar al usuario de la lista
          getData();
          console.log('Usuario eliminado');
        }
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
      }
    };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <div className="flex justify-between items-center bg-[#f5f5f5f5] rounded-lg p-2 max-h-[8vh]">
        <img
          src="https://media.discordapp.net/attachments/1321940814292713562/1329450552769380415/logo_md.png?ex=678a62cf&is=6789114f&hm=7afc9bbce4adf3c81fe9dcde4df9f191cfc4e651072ab54916e540cb93785b31&=&format=webp&quality=lossless"
          alt="Logo"
          className="rounded-lg md:h-[7vh] h-[5vh] 2xl:h-[5vh]"
        />
        <button
          onClick={logout}
          className="bg-black h-[45px] w-[45px] text-white px-2 rounded-lg py-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1"/></svg>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-6 gap-4 mt-6">
  {processedData.length > 0 ? (
    processedData.map((user) => (
      <div 
        key={user.qrId} 
        className="bg-[#f5f5f5f5] text-black rounded-lg p-4 shadow-md relative"
      >
        {/* Botón de Delete */}
        <button
          onClick={() => deleteUser(user.qrId)}
          className="absolute h-[40px] z-40 w-[40px] top-2 right-2 bg-transparent text-white p-2 rounded-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="red" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"/></svg>
        </button>
        
        {/* Título fijo */}
        <h2 className="text-lg capitalize text-center font-bold mb-2 sticky top-0 truncate w-[80%] rounded-lg  text-gray-800 z-10">
          {user.name || 'N/A'}
        </h2>
        
        {/* Descripción con scroll */}
        <p className="text-sm text-gray-700 mb-2 max-w-full break-words overflow-hidden md:max-h-[100px] md:overflow-y-auto 2xl:max-h-[100px] 2xl:overflow-y-auto">
          {user.description || 'Sin descripción'}
        </p>
        
        {/* Código QR */}
        <div className="mb-2">
          {user.qr_code ? (
            <div className="flex justify-center items-center">
              <img
                src={user.qr_code}
                alt="QR Code"
                className="w-16 h-16 object-contain"
              />
            <button
              onClick={() => {
                const link = document.createElement('a'); // Crear un enlace dinámico
                link.href = user.qr_code; // Establecer la URL del código QR
                link.download = `QR_${user.qr_code_identifier || user.qrId}.png`; // Establecer el nombre del archivo
                link.click(); // Hacer clic en el enlace para descargar
              }}
              className="bg-transparent h-[45px] w-[45px] text-white px-2 rounded-lg py-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5l5 5l5-5m-5 5V3"/></svg>
            </button>

            </div>
          ) : (
            <p>Sin QR</p>
          )}
        </div>
        
        {/* Imágenes con scroll horizontal */}
        <div className="mb-2 h-[100px] overflow-x-auto">
          {user.images && user.images.length > 0 ? (
            <div className="flex justify-center items-center mt-2 gap-2">
              {user.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://${import.meta.env.VITE_PUBLIC_HOST}:${import.meta.env.VITE_PUBLIC_PORT}/${image.substring(image.indexOf('uploads'))}`}
                  alt={`Foto ${index + 1}`}
                  className="w-16 h-16 object-cover rounded-md"
                />
              ))}
            </div>
          ) : (
            <p className="text-white">Sin fotos</p>
          )}
        </div>
        
        {/* Videos */}
        <div>
          {user.videos && user.videos.length > 0 ? (
            <div className="flex flex-col gap-2">
              {user.videos.map((video, index) => (
                <video
                  key={index}
                  controls
                  className="w-full h-32 object-cover rounded-md"
                >
                  <source src={video} type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              ))}
            </div>
          ) : (
            <p>Sin videos</p>
          )}
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-400 col-span-full">No hay datos disponibles.</p>
  )}
</div>

    </div>
  );
};

export default UsersCards;
