// import { useEffect } from 'react';
// import useAuthStore from '../store/authStore';
// import useUsersStore from '../store/userStorage';
// import { useNavigate } from 'react-router-dom';

// const UsersCards = () => {
//   const { getData } = useUsersStore();
//   const { logout } = useAuthStore();
//   const data = useUsersStore((state) => state.data || []); // Garantiza un array por defecto
//   const token = useAuthStore((state) => state.token);
//   const navigate = useNavigate();
//   console.log('data', data)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await getData();
//       } catch (error) {
//         console.error('Error al obtener los datos:', error);
//       }
//     };
//     fetchData();

//     if (!token) {
//       navigate('/');
//     }
//   }, [getData, navigate, token]);

//   return (
//     <div className="p-6 bg-black text-white min-h-screen">
//       <div className="flex justify-between items-center bg-white rounded-lg p-2 max-h-[8vh]">
//         <img
//           src="https://media.discordapp.net/attachments/1321940814292713562/1329450552769380415/logo_md.png?ex=678a62cf&is=6789114f&hm=7afc9bbce4adf3c81fe9dcde4df9f191cfc4e651072ab54916e540cb93785b31&=&format=webp&quality=lossless"
//           alt="Logo"
//           className="rounded-lg md:h-[7vh] h-[5vh] 2xl:h-[5vh]"
//         />
//         <button
//           onClick={logout}
//           className="bg-black h-[45px] w-[45px] text-white px-2 rounded-lg py-2"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1"/></svg>
//         </button>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
//         {data.length > 0 ? (
//           data.map((user) => (
//             <div key={user.qrId} className="bg-white text-black rounded-lg p-4 shadow-md">
//               <h2 className="text-lg font-bold mb-2">{user.name || 'N/A'}</h2>
//               <p className="text-sm text-gray-700 mb-2">{user.description || 'Sin descripción'}</p>
//               <div className="mb-2">
//                 {user.qr_code ? (
//                   <div className="flex flex-col items-center">
//                     <img
//                       src={user.qr_code}
//                       alt="QR Code"
//                       className="w-16 h-16 object-contain"
//                     />
//                     <a
//                       href={user.qr_code}
//                       download={`QR_${user.qr_code_identifier || user.qrId}.png`}
//                       className="text-blue-500 underline mt-2"
//                     >
//                       Descargar QR
//                     </a>
//                   </div>
//                 ) : (
//                   <p>Sin QR</p>
//                 )}
//               </div>
//               <div className="mb-2">
//                 {user.photos && user.photos.length > 0 ? (
//                   <div className="flex gap-2 overflow-x-auto">
//                     {user.photos.map((photo, index) => (
//                       <img
//                         key={index}
//                         src={photo}
//                         alt={`Foto ${index + 1} de ${user.name || 'usuario'}`}
//                         className="w-16 h-16 object-cover rounded-md"
//                       />
//                     ))}
//                   </div>
//                 ) : (
//                   <p>Sin fotos</p>
//                 )}
//               </div>
//               <div>
//                 {user.videos && user.videos.length > 0 ? (
//                   <div className="flex flex-col gap-2">
//                     {user.videos.map((video, index) => (
//                       <video
//                         key={index}
//                         controls
//                         className="w-full h-32 object-cover rounded-md"
//                       >
//                         <source src={video} type="video/mp4" />
//                         Tu navegador no soporta el elemento de video.
//                       </video>
//                     ))}
//                   </div>
//                 ) : (
//                   <p>Sin videos</p>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-400 col-span-full">No hay datos disponibles.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UsersCards;
import { useEffect } from 'react';
import useAuthStore from '../store/authStore';
import useUsersStore from '../store/userStorage';
import { useNavigate } from 'react-router-dom';

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

  console.log('processedData', processedData)

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <div className="flex justify-between items-center bg-white rounded-lg p-2 max-h-[8vh]">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {processedData.length > 0 ? (
          processedData.map((user) => (
            <div key={user.qrId} className="bg-white text-black rounded-lg p-4 shadow-md">
              <h2 className="text-lg font-bold mb-2">{user.name || 'N/A'}</h2>
              <p className="text-sm text-gray-700 mb-2">{user.description || 'Sin descripción'}</p>
              <div className="mb-2">
                {user.qr_code ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={user.qr_code}
                      alt="QR Code"
                      className="w-16 h-16 object-contain"
                    />
                    <a
                      href={user.qr_code}
                      download={`QR_${user.qr_code_identifier || user.qrId}.png`}
                      className="text-blue-500 underline mt-2"
                    >
                      Descargar QR
                    </a>
                  </div>
                ) : (
                  <p>Sin QR</p>
                )}
              </div>
              <div className="mb-2 bg-emerald-900 h-[20vh]">
                {user.images && user.images.length > 0 ? (
                  <div className="flex gap-2 overflow-x-auto">
                    {user.images.map((images, index) => (
                      <img
                        key={index}
                        src={images}
                        alt={`Foto ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ))}
                  </div>
                ) : (
                  <p>Sin fotos</p>
                )}
              </div>
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
