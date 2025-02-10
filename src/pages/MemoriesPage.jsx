import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const MemoriesPage = () => {
  const { control, handleSubmit, reset } = useForm()
  const [previewImages, setPreviewImages] = useState([])
  const [previewVideos, setPreviewVideos] = useState([])
  const [isProfileCreated, setIsProfileCreated] = useState(false)
  const navigate = useNavigate()


  const handleFilePreview = (files, type) => {
    const previews = Array.from(files).map(file =>
      URL.createObjectURL(file)
    );
    if (type === 'images') setPreviewImages(previews)
    if (type === 'videos') setPreviewVideos(previews)
  };

  const onSubmit = async (data) => {
    console.log({data})
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description)
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    if (data.images) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images[]', data.images[i])
      }
    }
    if (data.videos) {
      for (let i = 0; i < data.videos.length; i++) {
        formData.append('videos[]', data.videos[i])
      }
    }
    try {
      console.log({formData})
      const response = await axios.post('http://192.168.0.154:3000/qr-generation/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Respuesta del servidor:', response.data)
      setIsProfileCreated(true)
      reset();
      setPreviewImages([])
      setPreviewVideos([])
    } catch (error) {
      console.error('Error al enviar los datos al servidor:', error)
    }
  };

  const handleBackToForm = () => {
    navigate('/login')
  };

  return (
    <div className="h-screen w-screen">
      <div className="max-w-full mx-auto h-full">
        <div className="h-full">
          {isProfileCreated ? (
            <div className="flex bg-gradient-to-br from-[#191d22] via-[#264853] to-[#396c7a] h-full justify-center items-center text-center">
              <div className="p-6 rounded-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-white mb-4">Memoria Creada</h2>
                <p className="text-xl text-[#f5f5f5f5] mb-6">
                ¡Tu homenaje ha sido creado con éxito y está en proceso de revisión!
                </p>
                <button
                  onClick={handleBackToForm}
                  className="px-6 py-3 bg-[#6ba7b8] h-[50px] text-white font-bold transition-all transform hover:scale-105 duration-300 rounded-lg shadow-lg hover:bg-[#5a9eb3]"
                >
                  Volver al inicio
                </button>
              </div>
            </div>
          ) : (
            <div className="md:flex h-full">
              {/* Sidebar */}
              <div className="md:w-1/3 bg-gradient-to-br from-[#191d22] via-[#264853] to-[#396c7a] p-4 text-white">
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 bg-[#6ba7b8] h-[40px] text-white font-bold transition-all transform hover:scale-105 duration-300 rounded-lg shadow-lg hover:bg-[#5a9eb3]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 3s-6.186 5.34-9.643 8.232A1.04 1.04 0 0 0 2 12a1 1 0 0 0 1 1h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a1 1 0 0 0 1-1a.98.98 0 0 0-.383-.768C18.184 8.34 12 3 12 3"
                    />
                  </svg>
                </button>
                <img
                  src="/public/image/logo_md.webp"
                  className="h-20 rounded-lg mt-6 2xl:mt-20 md:h-32 mx-auto w-[80%] mb-8"
                />
                <h2 className="text-xl md:text-2xl 2xl:mt-16 font-bold mb-4 text-pretty">Un Tributo Eterno: Honra y Celebra la Vida de Tu Ser Querido                </h2>
                <p className="opacity-75 text-base md:text-lg text-pretty text-justify">
                Conmemora la vida de tu ser querido creando un espacio único y lleno de amor que preserve su esencia para siempre. Este perfil conmemorativo será un refugio donde su historia, sus logros y los momentos más significativos de su vida cobren vida a través de palabras, imágenes, videos y recuerdos. Comparte anécdotas entrañables, mensajes sinceros y reflexiones que capturen la huella que dejaron en quienes los conocieron.
                </p>
              </div>
              {/* Formulario */}
              <div className="md:w-2/3  bg-[#ddeef0] bg-opacity-20 backdrop-filter backdrop-blur-2xl p-4 flex 2xl:overflow-auto md:overflow-auto flex-col h-full overflow-y-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 h-full">
                  {/* Inputs Nombre y Descripción */}
                  <div className="flex flex-col md:flex-row md:justify-between md:gap-8">
                    <div className="flex flex-col w-full md:w-1/2 space-y-4">
                      <span className='text-[#396c7a] font-semibold 2xl:text-lg capitalize'>Información para el Homenaje Memorial</span>
                      {/* Nombre */}
                      <div>
                        <label htmlFor="name" className="text-sm font-medium text-gray-800 mb-1">
            Nombre de tu ser querido
                        </label>
                        <Controller
                          name="name"
                          rules={{
                            required: {
                              value: true,
                              message: 'Nombre es requerido',
                            },
                          }}
                          control={control}
                          defaultValue=""
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                              <input
                                onChange={onChange}
                                value={value}
                                className="w-full h-[45px] px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Escribe el nombre"
                              />
                              {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </>
                          )}
                        />
                      </div>

                      {/* Descripción */}
                      <div >
                        <label htmlFor="description" className="text-sm font-medium text-gray-800 mb-1">
            Mensaje de homenaje o recuerdo especial
                        </label>
                        <Controller
                          name="description"
                          rules={{
                            required: {
                              value: true,
                              message: 'Descripción es requerido',
                            },
                          }}
                          control={control}
                          defaultValue=""
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                              <textarea
                                onChange={onChange}
                                value={value}
                                className="w-full px-3 py-2  min-h-[200px] max-h-[200px]   text-gray-800 border border-gray-300 rounded-md"
                                placeholder="Escribe una descripción"
                              />
                              {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </>
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col w-full md:w-1/2 space-y-4">
                      <span className='text-[#396c7a] font-semibold 2xl:text-lg capitalize'>Tu informacion de conctato</span>
                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="text-sm font-medium text-gray-800 mb-1">
            Número de teléfono
                        </label>
                        <Controller
                          name="phone"
                          control={control}
                          rules={{
                            required: 'El teléfono es requerido',
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message: 'El teléfono debe tener 10 dígitos',
                            },
                          }}
                          defaultValue=""
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                              <input
                                onChange={onChange}
                                type="text"
                                value={value}
                                className="w-full h-[45px] px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Escribe el teléfono"
                              />
                              {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </>
                          )}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-800 mb-1">
            Correo electrónico
                        </label>
                        <Controller
                          name="email"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: 'El correo es requerido',
                            pattern: {
                              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: 'Por favor ingresa un correo válido: example@gmail.com',
                            },
                          }}
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                              <input
                                type="email"
                                onChange={onChange}
                                value={value}
                                className="w-full h-[45px] px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Escribe el correo electrónico"
                              />
                              {error && <p className="text-red-500 text-sm">{error.message}</p>}
                            </>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Ajuste para el scroll */}
                  <div className="flex max-h-[70%] flex-col overflow-y-auto">
                    {/* Contenedor del botón de subir fotos y videos */}
                    <div className="flex justify-center gap-4 p-4 border-b-2 border-gray-300">
                      {/* Subir imágenes */}
                      <div className="flex flex-col items-center w-[50%] justify-center p-2 rounded-md">
                        <Controller
                          name="images"
                          control={control}
                          defaultValue={[]}
                          rules={{
                            required: {
                              value: true,
                              message: 'Fotos es requerido', 
                            },
                          }}
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <div className="relative inline-block">
                              <label
                                htmlFor="file-upload"
                                className="cursor-pointer inline-flex items-center justify-center w-40 px-4 py-2 bg-[#6ba7b8] h-[50px] text-white font-bold transition-all transform hover:scale-105 duration-300 rounded-lg shadow-lg hover:bg-[#5a9eb3] "
                              >
        Subir foto
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => {
                                  const newFiles = e.target.files;
                                  if (newFiles) {
                                    const newFilesArray = Array.from(newFiles);
                                    const uniqueFiles = newFilesArray.filter(file =>
                                      !value.some(existingFile => existingFile.name === file.name && existingFile.size === file.size)
                                    );

                                    if (uniqueFiles.length + value.length > 8) {
                                      alert('El límite es de 8 fotos');
                                    } else {
                                      const updatedFiles = [...value, ...uniqueFiles];
                                      handleFilePreview(updatedFiles, 'images');
                                      onChange(updatedFiles);
                                    }

                                    // Si hay duplicados, muestra un mensaje sin bloquear la carga de otros archivos nuevos
                                    if (newFilesArray.length > uniqueFiles.length) {
                                      alert('Algunas fotos ya han sido subidas y no se agregarán');
                                    }
                                  }
                                }}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer transition-all transform hover:scale-105 duration-300 rounded-lg shadow-lg"
                              />
                              {error && <p className="text-red-500 text-sm">{error.message}</p>} 
                            </div>
                          )}
                        />



                      </div>

                      {/* Subir videos */}
                      <div className="flex flex-col w-[50%] items-center justify-center p-2 rounded-md">
                        <Controller
                          name="videos"
                          control={control}
                          defaultValue={[]}
                          rules={{
                            required: {
                              value: true,
                              message: 'Video es requerido', 
                            },
                          }}
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <div className="relative inline-block">
                              <label
                                htmlFor="file-upload"
                                className="cursor-pointer inline-flex items-center justify-center w-40 px-4 py-2 bg-[#6ba7b8] h-[50px] text-white font-bold transition-all transform hover:scale-105 duration-300 rounded-lg shadow-lg hover:bg-[#5a9eb3]"
                              >
        Subir video
                              </label>
                              <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => {
                                  const newFile = e.target.files?.[0];

                                  if (newFile) {
                                    // Verificar si ya hay un video en el estado
                                    if (value.length > 0) {
                                      alert('Ya has subido un video. Solo puedes subir uno.');
                                      return;
                                    }

                                    // Verificar el tamaño del archivo
                                    if (newFile.size > 20 * 1024 * 1024) { // 20MB en bytes
                                      alert('El video no puede ser mayor a 20MB');
                                      return;
                                    }

                                    // Verificar que el video no se haya subido antes (por nombre y tamaño)
                                    const duplicate = value.some(
                                      (existingFile) => existingFile.name === newFile.name && existingFile.size === newFile.size
                                    );
                                    if (duplicate) {
                                      alert('Este video ya ha sido subido.');
                                      return;
                                    }

                                    handleFilePreview([newFile], 'videos');
                                    onChange([newFile]);
                                  }
                                }}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer transition-all transform hover:scale-105 duration-300 rounded-lg shadow-lg"
                              />
                              {error && <p className="text-red-500 text-sm">{error.message}</p>} 
                            </div>
                          )}
                        />


                      </div>
                    </div>
  
                    {/* Contenedor de las imágenes y videos */}
                    <div className="flex justify-center gap-4 p-4 overflow-y-auto">
                      {/* Imágenes subidas */}
                      <div className="flex border-2 border-gray-300 p-2 border-dashed rounded-md flex-col w-[50%]">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                          {previewImages.map((src, idx) => (
                            <img
                              key={idx}
                              src={src}
                              alt={`preview-${idx}`}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          ))}
                        </div>
                      </div>
                      {/* Videos subidos */}
                      <div className="flex flex-col w-[50%] border-2 p-2 border-gray-300 border-dashed rounded-md">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                          {previewVideos.map((src, idx) => (
                            <video
                              key={idx}
                              src={src}
                              controls
                              className="h-full w-full mt-2 bg-emerald-950 rounded-md"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Botón Guardar */}
                  <div className="flex justify-center">
                    <button type="submit" className="px-4 w-[75%] 2xl:w-[30%] bg-[#6ba7b8] h-[50px] text-white font-bold transition-all transform hover:scale-105 duration-300 rounded-lg shadow-lg hover:bg-[#5a9eb3]">
                      Crear recuerdo
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

};

export default MemoriesPage;
