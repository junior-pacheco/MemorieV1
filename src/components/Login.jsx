import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const {login} = useAuthStore();
  const token = useAuthStore(state => state.token)
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('data', data)
    login(data);

  };

  useEffect(() => {
    if (token) {
      navigate('/users')
    }
  }, [navigate, token])
  
  

  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-black">
      <div className="flex flex-col 2xl:flex-row md:flex-row justify-around 2xl:flex items-center md:flex 2xl:w-[60vw] md:w-[60vw] w-[90vw] ">
        <div className="bg-white 2xl:ml-28 m-0 md:m-[0px] rounded-2xl shadow-2xl w-full 2xl:w-[40%] md:w-[50%] overflow-hidden">
          {/* Logo and Title */}
          <div className="flex justify-center mt-4 items-center p-2 text-black text-center">
            <img
              src="https://media.discordapp.net/attachments/1321940814292713562/1329450552769380415/logo_md.png?ex=678a62cf&is=6789114f&hm=7afc9bbce4adf3c81fe9dcde4df9f191cfc4e651072ab54916e540cb93785b31&=&format=webp&quality=lossless"
              alt="Logo"
              className="w-[50%] h-[10vh]"
            />
          </div>
          <h2 className="text-2xl text-center text-black mt-2 font-semibold">Bienvenido</h2>
          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            <div className="mb-6">
              <label htmlFor="userName" className="block text-sm font-medium text-gray-800 mb-2">
                Nombre
              </label>
              <input
                id="userName"
                type="text"
                {...register("userName", {
                  required: "El correo electrónico es obligatorio",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]{3,16}$/,
                    message: "Dirección de correo inválida"
                  }
                })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-gray-800 focus:ring focus:ring-gray-500 transition duration-200"
                placeholder="juan"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
  
            <div className="mb-6">
              <label htmlFor="userPassword" className="block text-sm font-medium text-gray-800 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="userPassword"
                  type={showPassword ? "text" : "password"}
                  {...register("userPassword", { required: "La contraseña es obligatoria" })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-gray-800 focus:ring focus:ring-gray-500 transition duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
                >
                  {!showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 24 24"
                    >
                      <path fill="black" d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0" />
                        <path d="M21 12q-3.6 6-9 6t-9-6q3.6-6 9-6t9 6" />
                      </g>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>
  
            <button
              type="submit"
              className="w-full px-8 py-2 bg-black h-[50px] text-white font-bold transition-all transform hover:scale-105 duration-300 rounded-lg shadow-lg"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
        <div className="bg-black 2xl:border-s md:border-s borber-t border-white  w-[100%] 2xl:w-[30%] md:w-[40%]  text-white p-8  shadow-xl text-center mx-auto my-8">
          <h2 className="text-2xl font-semibold mb-4">¿Estás listo para crear un perfil para un ser querido?</h2>
          <p className="text-lg mb-6">
            Honra su memoria creando un perfil conmemorativo. Haz clic en el botón a continuación para comenzar.
          </p>
          <button
            onClick={() => navigate('/crear-perfil')}
            className="px-8 py-2 bg-white h-[50px] text-black font-bold transition-all transform hover:scale-105 duration-300 rounded-lg shadow-lg"
          >
            Crear Perfil
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default Login;




  // return (
  //   <div className="min-h-screen p-4 flex items-center justify-center bg-[#066165]">
  //     <div className="flex flex-col 2xl:flex-row md:flex-row justify-around 2xl:flex items-center md:flex w-[60vw]">
  //       <div className="bg-white 2xl:ml-28 m-0 md:m-[0px]  rounded-2xl shadow-2xl w-full 2xl:w-[40%] md:w-[50%] overflow-hidden">
  //         {/* Logo and Title */}
  //         <div className="flex justify-center items-center p-2 text-[#066165] text-center">
  //           <img
  //             src="https://gruporecordar.co/sites/default/files/LOGO%202.jpg"
  //             alt="Logo"
  //             className="w-[80%]"
  //           />
  //         </div>
  //         <h2 className="text-2xl text-center text-[#066165] mt-2 font-semibold">Bienvenido</h2>
  //         {/* Login Form */}
  //         <form onSubmit={handleSubmit(onSubmit)} className="p-8">
  //           <div className="mb-6">
  //             <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
  //               Nombre
  //             </label>
  //             <input
  //               id="userName"
  //               type="text"
  //               {...register("userName", {
  //                 required: "El correo electrónico es obligatorio",
  //                 pattern: {
  //                   value: /^[a-zA-Z0-9._-]{3,16}$/,
  //                   message: "Dirección de correo inválida"
  //                 }
  //               })}
  //               className="w-full px-4 py-3 rounded-lg border-2 border-[#7cb445] focus:border-[#7cb445] focus:ring focus:ring-[#7cb44533] transition duration-200"
  //               placeholder="juan"
  //             />
  //             {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
  //           </div>

  //           <div className="mb-6">
  //             <label htmlFor="userPassword" className="block text-sm font-medium text-gray-700 mb-2">
  //               Contraseña
  //             </label>
  //             <div className="relative">
  //               <input
  //                 id="userPassword"
  //                 type={showPassword ? "text" : "password"}
  //                 {...register("userPassword", { required: "La contraseña es obligatoria" })}
  //                 className="w-full px-4 py-3 rounded-lg border-2 border-[#7cb445] focus:border-[#7cb445] focus:ring focus:ring-[#7cb44533] transition duration-200"
  //                 placeholder="••••••••"
  //               />
                // <button
                //   type="button"
                //   onClick={() => setShowPassword(!showPassword)}
                //   className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
                // >
                //   {!showPassword ? (
                //     <svg
                //       xmlns="http://www.w3.org/2000/svg"
                //       width="1em"
                //       height="1em"
                //       viewBox="0 0 24 24"
                //     >
                //       <path fill="black" d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7" />
                //     </svg>
                //   ) : (
                //     <svg
                //       xmlns="http://www.w3.org/2000/svg"
                //       width="1em"
                //       height="1em"
                //       viewBox="0 0 24 24"
                //     >
                //       <g fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                //         <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0" />
                //         <path d="M21 12q-3.6 6-9 6t-9-6q3.6-6 9-6t9 6" />
                //       </g>
                //     </svg>
                //   )}
                // </button>
  //             </div>
  //             {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
  //           </div>

  //           <button
  //             type="submit"
  //             className="w-full bg-[#7cb445] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#5d9c36] transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#7cb445]/50"
  //           >
  //             Iniciar Sesión
  //           </button>
  //         </form>
  //       </div>
  //       <div className="bg-[#7cb445] w-[40%] 2xl:w-[30%] md:w-[40%] transition-all transform hover:scale-105 duration-300 text-white p-8 rounded-lg shadow-xl text-center mx-auto my-8">
  //           <h2 className="text-2xl font-semibold mb-4">¿Estás listo para crear un perfil para un ser querido?</h2>
  //           <p className="text-lg mb-6">
  //             Honra su memoria creando un perfil conmemorativo. Haz clic en el botón a continuación para comenzar.
  //           </p>
  //           <button
  //             onClick={() => navigate('/crear-perfil')}
  //             className="px-8 py-2 bg-[#066165] h-[50px] text-white rounded-lg shadow-lg hover:bg-[#066065e3] transition-all duration-300"
  //           >
  //             Crear Perfil
  //           </button>
  //       </div>
  //     </div>
  //   </div>
  // );
// };

// export default Login;

