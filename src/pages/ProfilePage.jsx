import Album from "../components/Album";
import { useParams } from "react-router-dom";
import useUProfileStore from "../store/profileStore";
import { useEffect } from "react";

const ProfilePage = () => {
  const {readProfileId} =useUProfileStore()
  const {profileId} = useParams()
  const profile = useUProfileStore((state) => state.profile);

  useEffect(() => {
    readProfileId(profileId);
  }, [profileId, readProfileId])
  

  return (
    <div className="max-w-4xl mx-auto p-4">
      <pre>
        {JSON.stringify(profile, null, 2)}
      </pre>
    {/* <ProfileDetails /> */}
    <Album />
  </div>
  )
};

export default ProfilePage;
