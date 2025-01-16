import { Controller, useForm } from 'react-hook-form';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const QRScanner = () => {
  const { control, handleSubmit, reset } = useForm()
  const [previewImages, setPreviewImages] = useState([])
  const [previewVideos, setPreviewVideos] = useState([])
  const [isProfileCreated, setIsProfileCreated] = useState(false)
  const navigate = useNavigate()

  const handleFilePreview = (files, type) => {
    const previews = Array.from(files).map(file =>
      URL.createObjectURL(file)
    );
    if (type === "images") setPreviewImages(previews)
    if (type === "videos") setPreviewVideos(previews)
  };

  const onSubmit = async (data) => {
    console.log('Datos enviados al servidor:', data)
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description)
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
      const response = await axios.post('http://192.168.0.246:3000/qr-generation/upload', formData, {
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
    setIsProfileCreated(false)
  };

  return (
    <div className="h-screen w-screen p-2">
      <div className="max-w-full mx-auto h-full">
        <div className="h-full">
          {isProfileCreated ? (
            <div className="flex h-full justify-center items-center text-center rounded-lg">
              <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-black mb-4">Perfil Creado</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Tu perfil ha sido creado exitosamente y está siendo revisado.
                </p>
                <button
                  onClick={handleBackToForm}
                  className="px-6 py-3 bg-black text-white rounded-md shadow-md hover:bg-[#054c4b] transition-colors duration-300"
                >
                  Volver a crear otro
                </button>
              </div>
            </div>
          ) : (
            <div className="md:flex h-full">
              {/* Sidebar */}
              <div className="md:w-1/3 bg-black p-4 text-white rounded-lg">
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-white bg-black rounded-md shadow-md hover:bg-[#5e6262] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 3s-6.186 5.34-9.643 8.232A1.04 1.04 0 0 0 2 12a1 1 0 0 0 1 1h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a1 1 0 0 0 1-1a.98.98 0 0 0-.383-.768C18.184 8.34 12 3 12 3"
                    />
                  </svg>
                </button>
                <img
                  src="https://media.discordapp.net/attachments/1321940814292713562/1329449268510982204/IMG-20250115-WA00102.jpg?ex=678a619d&is=6789101d&hm=41405b397e260c4f79b86d24e6c04d33899338d8d4a9e7e511d6e2905852ef1b&=&format=webp"
                  alt="Logo"
                  className="h-20 rounded-lg mt-6 md:h-32 mx-auto w-[80%] mb-8"
                />
                <h2 className="text-xl md:text-2xl font-bold mb-4">Crear Perfil Del Difunto</h2>
                <p className="opacity-75 text-base md:text-lg">
                  Honra la memoria de tu ser querido creando un perfil conmemorativo. Comparte su historia, fotos y videos
                  para mantener vivo su recuerdo.
                </p>
              </div>
                  {/* Formulario */}
                  <div className="md:w-2/3 p-4 flex overflow-auto flex-col h-full">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 h-full">
                      {/* Inputs Nombre y Descripción */}
                      <div className="flex flex-col md:flex-row md:gap-4">
                        {/* Nombre */}
                        <div className="w-full md:w-1/2">
                          <label htmlFor="name" className="text-sm font-medium text-gray-800 mb-1">
                            Nombre del difunto
                          </label>
                          <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                              <input
                                onChange={onChange}
                                value={value}
                                className="w-full h-[45px] px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Escribe el nombre"
                              />
                            )}
                          />
                        </div>
      
                        {/* Descripción */}
                        <div className="w-full md:w-1/2">
                          <label htmlFor="description" className="text-sm font-medium text-gray-800 mb-1">
                            Descripción o mensaje conmemorativo
                          </label>
                          <Controller
                            name="description"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                              <textarea
                                onChange={onChange}
                                value={value}
                                className="w-full px-3 max-h-[45px] min-h[45px] py-2 border border-gray-300 rounded-md"
                                placeholder="Escribe una descripción"
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex max-h-[70%] flex-col">
                  {/* Contenedor del botón de subir fotos y videos */}
                  <div className="flex justify-center gap-4 p-4 border-b-2 border-gray-300">
                    {/* Subir imágenes */}
                    <div className="flex flex-col items-center  w-[50%]  justify-center p-2 rounded-md">
                      <Controller
                        name="images"
                        control={control}
                        defaultValue={[]}
                        render={({ field: { onChange } }) => (
                          <div className="relative inline-block">
                            <label
                              htmlFor="file-upload"
                              className="cursor-pointer inline-flex items-center justify-center w-40 h-10 px-4 py-2 text-white bg-black rounded-md shadow-md"
                            >
                              Subir foto
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => {
                                handleFilePreview(e.target.files, "images");
                                onChange(e.target.files);
                              }}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                        )}
                      />
                    </div>

                    {/* Subir videos */}
                    <div className="flex flex-col w-[50%] items-center  justify-center p-2  rounded-md">
                      <Controller
                        name="videos"
                        control={control}
                        defaultValue={[]}
                        render={({ field: { onChange } }) => (
                          <div className="relative inline-block">
                            <label
                              htmlFor="file-upload"
                              className="cursor-pointer inline-flex items-center justify-center w-40 h-10 px-4 py-2 text-white bg-black rounded-md shadow-md"
                            >
                              Subir video
                            </label>
                            <input
                              type="file"
                              accept="video/*"
                              multiple
                              onChange={(e) => {
                                handleFilePreview(e.target.files, "videos");
                                onChange(e.target.files);
                              }}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  {/* Contenedor de las imágenes y videos */}
                  <div className="flex justify-center overflow-auto gap-4 p-4">
                    {/* Imágenes subidas */}
                    <div className="flex border-2 border-gray-300 overflow-auto p-2 border-dashed rounded-mdflex-col w-[50%]">
                      <div className="grid grid-cols-2  md:grid-cols-5 2lx:grid-cols-6 gap-2 mt-2">
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
                          <div className="flex flex-col w-[50%] border-2 p-2 overflow-auto  border-gray-300 border-dashed rounded-md">
                            <div className="grid grid-cols-2 md:grid-cols-5 2lx:grid-cols-6  gap-2">
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
                    <button type="submit" className="px-4 w-[40%] py-2 bg-black text-white rounded-md">
                      Guardar
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

export default QRScanner;
