import  { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProfileStore from '../store/profileStore'

const ProfilePage = () => {
  const {readProfileId} = useProfileStore()
  const {profileId} = useParams()
  const profile = useProfileStore((state) => state.profile);

  useEffect(() => {
    readProfileId(profileId);
  }, [profileId, readProfileId])
  return (
    <>
    {profile && (
          <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex flex-col items-center mb-6 sm:flex-row sm:items-start">

            <div className="text-center sm:text-left bg-red-500">
              <h1 className="text-2xl font-bold mb-2 capitalize">{profile.name}</h1>
              <p className=" text-pretty">{profile.description}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {profile.images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={`http://${import.meta.env.VITE_PUBLIC_HOST}:${import.meta.env.VITE_PUBLIC_PORT}/${image.substring(image.indexOf('uploads'))}`}
                    alt={`${profile.name}'s image ${index + 1}`}
                    loading="lazy"
                    className="object-cover rounded-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.videos.map((video, index) => (
                <div key={index} className="aspect-video">
                  <video 
                    src={`http://${import.meta.env.VITE_PUBLIC_HOST}:${import.meta.env.VITE_PUBLIC_PORT}/${video.substring(video.indexOf('uploads'))}`}
                    controls 
                    className="w-full h-full rounded-lg"
                    poster={profile.images[0]}
                  >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
          </div>

    </div>
    )}
    </>
  )
}

export default ProfilePage

