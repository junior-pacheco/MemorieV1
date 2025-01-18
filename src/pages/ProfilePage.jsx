import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProfileStore from '../store/profileStore';
import { WhatsappShareButton } from 'react-share';
import { WhatsappIcon } from 'react-share';


const ProfilePage = () => {
  const { readProfileId } = useProfileStore();
  const { profileId } = useParams();
  const profile = useProfileStore((state) => state.profile);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    readProfileId(profileId);
  }, [profileId, readProfileId]);

  const profileUrl = `${window.location.origin}/profile/${profileId}`;

  const toggleMenu = () => setIsOpen(!isOpen);


  return (
    <>
      {profile && (
        <div className="min-h-screen p-2 bg-gradient-to-br from-[#191d22] via-[#264853] to-[#396c7a] text-white overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
            <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start mb-12">
              <div className="w-full">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 capitalize tracking-wide break-words">
                {profile.name}
              </h1>
                <p className="text-lg sm:text-xl opacity-90 break-words leading-relaxed">
                  {profile.description}
                </p>
              </div>
            </div>

            <div className="mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {profile.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    <img
                      src={`http://${import.meta.env.VITE_PUBLIC_HOST}:${import.meta.env.VITE_PUBLIC_PORT}/${image.substring(
                        image.indexOf('uploads')
                      )}`}
                      alt={`${profile.name}'s image ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition duration-500 ease-in-out transform hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {profile.videos.map((video, index) => (
                  <div
                    key={index}
                    className="w-full aspect-video overflow-hidden rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    <video className="w-full h-full rounded-lg max-h-screen" controls>
                      <source
                        src={`http://${import.meta.env.VITE_PUBLIC_HOST}:${import.meta.env.VITE_PUBLIC_PORT}/${video.substring(
                          video.indexOf('uploads')
                        )}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </div>
            </div>

            <div className="fixed top-2 right-2">
              <button
                onClick={toggleMenu}
                className="bg-[#6ba7b8] h-[50px] w-[50px] py-2 px-2 text-white font-bold transition-all transform hover:scale-105 duration-300 shadow-lg hover:bg-[#5a9eb3] rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                  <path
                    fill="none"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0m12-6a3 3 0 1 0 6 0a3 3 0 1 0-6 0m0 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0m-6.3-7.3l6.6-3.4m-6.6 6l6.6 3.4"
                  />
                </svg>
              </button>
              {/* Menú desplegable */}
              {isOpen && (
                <div className="absolute top-14 right-0 bg-[#6ba7b8] rounded-full p-4 shadow-lg space-y-4">
                  <div className="flex flex-col items-center gap-2 justify-center">
                    <WhatsappShareButton url={profileUrl} className="p-2">
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;