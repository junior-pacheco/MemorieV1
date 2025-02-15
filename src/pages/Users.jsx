import React,  { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
import useUsersStore from '../store/userStorage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Modal from 'react-modal';

Modal.setAppElement('#root');

const UsersCards = () => {
  const  getData  = useUsersStore((state) => state.getData);
  const  logoutUser  = useAuthStore((state) => state.logoutUser);
  const deleteUser = useUsersStore((state) => state.deleteUser);

  const data = useUsersStore((state) => state.data || []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleOpenModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (selectedUserId) {
      deleteUser(selectedUserId);
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);


  useEffect(() => {
    getData()
  }, [getData]);

  const processData = (users) =>
    users.map((user) => ({
      ...user,
      photos: user.images?.map((image) =>
        image.replace('localhost', '192.168.0.154')
      ) || [],
      videos: user.videos?.map((video) =>
        video.replace('localhost', '192.168.0.246')
      ) || [],
      qr_code: user.qr_code?.replace('localhost', '192.168.0.154'),
    }));
  

  const processedData = processData(data);


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#191d22] via-[#264853] to-[#396c7a] p-6">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
      />
      <header className="p-4 mb-6 flex justify-between items-center">
        <img
          src="/public/image/logo_md.webp"
          alt="Logo"
          className="h-12 w-auto rounded-lg"
        />
        <button
          onClick={logoutUser}
          className="bg-white text-white p-2 rounded-lg  transition-colors"
          aria-label="Logout"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </header>
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 gap-6 lg:gap-24 2xl:gap-28 ">
        {processedData.length > 0 ? (
          processedData.map((user) => (
            <div 
              key={user.qrId} 
              className="bg-[#ddeef0] rounded-x 2xl:min-w-[380px] lg:min-w-[380px] rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              <div className="p-4">
                <div className="flex justify-center items-center  mb-4">
                  <div className="w-24 ms-8 h-24">
                    {user.qr_code ? (
                      <img
                        src={user.qr_code || '/placeholder.svg'}
                        alt="QR Code"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                          Sin QR
                      </div>
                    )}
                  </div>
                  <div className="flex ms-4 flex-col  space-y-2">
                    {/* <button
                        onClick={() => deleteUser(user.qrId)}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        aria-label="Delete user"
                      >
                      <svg className="transition-all transform active:translate-y-2"  xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><path fill="white" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"/></svg>
                      </button> */}
                    <button
                      onClick={() => handleOpenModal(user.qrId)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      aria-label="Delete user"
                    >
                      <svg className="transition-all transform active:translate-y-2" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
                        <path fill="white" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"/>
                      </svg>
                    </button>
                    {/* Modal de confirmación usando react-modal */}
                    <Modal
                      isOpen={isModalOpen}
                      onRequestClose={handleCloseModal}
                      contentLabel="Confirmar eliminación"
                      className="flex justify-center items-center bg-black bg-opacity-10 h-full w-full"
                      overlayClassName="fixed inset-0 bg-opacity-90"
                    >
                      <div className="bg-[#ddeef0] p-6 rounded-lg shadow-lg md:w-[40%] 2xl:w-[35%] w-[70%]">
                        <h2 className="text-lg font-semibold">Confirmar eliminación</h2>
                        <p>¿Estás seguro de que deseas eliminar a este usuario?</p>
                        <div className="mt-4 flex justify-end space-x-4">
                          <button
                            onClick={handleCloseModal}
                            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                          >
              Cancelar
                          </button>
                          <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          >
              Eliminar
                          </button>
                        </div>
                      </div>
                    </Modal>
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = user.qr_code;
                        link.download = `QR_${user.qr_code_identifier || user.qrId}.png`;
                        link.click();
                        toast.success('QR descargado correctamente');
                      }}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors transform active:scale-95 focus:outline-none"
                      aria-label="Download QR code"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        className="transition-all transform active:translate-y-2"
                      >
                        <path
                          fill="none"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5l5 5l5-5m-5 5V3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
  
                {/* Título */}
                <h2 className="text-lg capitalize text-center font-bold mt-6 truncate w-full rounded-lg text-gray-800">
                  {user.name || 'N/A'}
                </h2>
                
                {/* Descripción */}
                <p className="text-sm p-2 text-gray-700 mb-2 max-w-full break-words overflow-hidden max-h-[100px] md:max-h-[100px] md:overflow-y-auto 2xl:max-h-[100px] 2xl:overflow-y-auto">
                  {user.description || 'Sin descripción'}
                </p>
                {/* Título */}
                <h2 className="capitalize text-center  truncate w-full text-gray-800">
                  {user.phone || 'N/A'}
                </h2>
                {/* Título */}
                <h2 className="capitalize text-center  truncate w-full text-gray-800">
                  {user.email || 'N/A'}
                </h2>
  
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                    {/* <Image className="mr-2" size={20} /> Imágenes */}
                  </h3>
                  <div className="flex overflow-x-auto space-x-2 pb-2">
                    {user.images && user.images.length > 0 ? (
                      user.images.map((image, index) => (
                        <img
                          key={index}
                          src={`http://${import.meta.env.VITE_PUBLIC_HOST}:${import.meta.env.VITE_PUBLIC_PORT}/${image.substring(image.indexOf('uploads'))}`}
                          alt={`Foto ${index + 1}`}
                          className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                        />
                      ))
                    ) : (
                      <p className="text-gray-400">Sin fotos</p>
                    )}
                  </div>
                </div>
  
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                    {/* <Video className="mr-2" size={20} /> Videos */}
                  </h3>
                  <div className="space-y-2">
                    {user.videos && user.videos.length > 0 ? (
                      user.videos.map((video, index) => (
                        <video
                          key={index}
                          controls
                          className="w-full h-32 object-cover rounded-md"
                        >
                          <source src={video} type="video/mp4" />
                            Tu navegador no soporta el elemento de video.
                        </video>
                      ))
                    ) : (
                      <p className="text-gray-400">Sin videos</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='flex flex-col items-center w-full col-span-12'>
            <img
              src="image/not_found.webp"
              className="h-[30vh] rounded-lg mt-6 md:h-[50vh] 2xl:h-[35vh] w-auto"
            />
            <p className="text-center text-xl text-white">No hay datos disponibles.</p>
          </div>
          // <div className="absolute inset-44 flex justify-center items-center">
          //   <div className="flex flex-col justify-center items-center rounded-lg p-6 h-[40vh]  2xl:w-[60vw] md-w-[60vw] w-[80vw]">
          //     <img
          //       src="image/not_found.webp"
          //       className="h-[50vh] rounded-lg mt-6 md:h-[50vh] 2xl:h-[35vh] w-auto"
          //     />
          //     <p className="text-center text-xl text-white">No hay datos disponibles.</p>
          //   </div>
          // </div>
          
        )}
      </div>
    </div>
  );

  //   <div className="p-6 bg-white text-white min-h-screen">
  //     <div className="flex justify-between items-center bg-black rounded-lg p-2 max-h-[8vh]">
  //       <img
  //         src="https://media.discordapp.net/attachments/1321940814292713562/1329449268510982204/IMG-20250115-WA00102.jpg?ex=678b0a5d&is=6789b8dd&hm=305a82cb2ea17f7afb3ecc0b7fdbab576c79804653ec536e4f06a82bb9730682&=&format=webp"
  //         alt="Logo"
  //         className="rounded-lg md:h-[7vh] h-[5vh] 2xl:h-[5vh]"
  //       />
  //       <button
  //         onClick={logout}
  //         className="bg-white h-[45px] w-[45px] text-white px-2 rounded-lg py-2"
  //       >
  //         <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1"/></svg>
  //       </button>
  //     </div>
  //     <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-3 gap-10 mt-6">
  //       {processedData.length > 0 ? (
  //         processedData.map((user) => (
  //           <div 
  //             key={user.qrId} 
  //             className="bg-[#ffff] border border-[#cccc] shadow-xl rounded-lg p-4 relative"
  //           >
  //             {/* Botón de Delete */}
  //             <button
  //               onClick={() => deleteUser(user.qrId)}
  //               className="absolute h-[40px] z-40 w-[40px] top-2 right-2 bg-black text-white p-2 rounded-md"
  //             >
  //               <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="white" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"/></svg>
  //             </button>
  //             <button
  //                     onClick={() => {
  //                       const link = document.createElement('a');
  //                       link.href = user.qr_code;
  //                       link.download = `QR_${user.qr_code_identifier || user.qrId}.png`;
  //                       link.click();
  //                     }}
  //                     className="absolute flex justify-center items-center h-[40px] bg-black  z-40 mt-6 w-[40px] top-7 right-2 text-white p-2 rounded-md"
  //                   >
  //                     <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24"><path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5l5 5l5-5m-5 5V3"/></svg>
  //                   </button>
                
  //             {/* Código QR */}
  //             <div className="mb-2 h-[14vh] flex justify-center items-center">
  //               {user.qr_code ? (
  //                 <>
  //                   <img
  //                     src={user.qr_code}
  //                     alt="QR Code"
  //                     className="w-26 h-26"
  //                   />
  //                 </>
  //               ) : (
  //                 <p>Sin QR</p>
  //               )}
  //             </div>

  // {/* Título */}
  // <h2 className="text-lg capitalize text-center font-bold mt-6 truncate w-[80%] rounded-lg text-gray-800">
  //   {user.name || 'N/A'}
  // </h2>
                
  // {/* Descripción */}
  // <p className="text-sm p-2 text-gray-700 mb-2 max-w-full break-words overflow-hidden md:max-h-[100px] md:overflow-y-auto 2xl:max-h-[100px] 2xl:overflow-y-auto">
  //   {user.description || 'Sin descripción'}
  // </p>
  //                 {/* Título */}
  //                 <h2 className="capitalize text-center  truncate w-full text-gray-800">
  //   {user.phone || 'N/A'}
  // </h2>
  //                 {/* Título */}
  //                 <h2 className="capitalize text-center  truncate w-full text-gray-800">
  //   {user.name || 'N/A'}
  // </h2>
                
  //             {/* Contenedor de Imágenes y Videos */}
  //             <div className="border-dashed border-2 border-[#cccc] p-4 mt-4 rounded-lg">
  //               {/* Imágenes */}
  //               <div className="mb-2 h-[100px] overflow-x-auto">
  //                 <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><g fill="black"><path d="M4.502 9a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"/><path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2M14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1M2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773l3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1z"/></g></svg>
  //                 {user.images && user.images.length > 0 ? (
  //                   <div className="flex justify-center items-center mt-2 gap-2">
  //                     {user.images.map((image, index) => (
  //                       <img
  //                         key={index}
  //                         src={`http://${import.meta.env.VITE_PUBLIC_HOST}:${import.meta.env.VITE_PUBLIC_PORT}/${image.substring(image.indexOf('uploads'))}`}
  //                         alt={`Foto ${index + 1}`}
  //                         className="w-16 h-16 object-cover rounded-md"
  //                       />
  //                     ))}
  //                   </div>
  //                 ) : (
  //                   <p className="text-white">Sin fotos</p>
  //                 )}
  //               </div>
    
  //               {/* Videos */}
  //               <div>
  //                 <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14zM3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
  //                 {user.videos && user.videos.length > 0 ? (
  //                   <div className="flex flex-col gap-2">
  //                     {user.videos.map((video, index) => (
  //                       <video
  //                         key={index}
  //                         controls
  //                         className="w-full h-20 object-cover rounded-md"
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
  //           </div>
  //         ))
  //       ) : (
  //         <p className="text-center text-gray-400 col-span-full">No hay datos disponibles.</p>
  //       )}
  //     </div>
  //   </div>
  // );
    
};

export default UsersCards;
