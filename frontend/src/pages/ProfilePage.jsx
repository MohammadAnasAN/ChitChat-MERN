import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 80 * 1024) {
      toast.error("Image size must be less than 80KB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-14 sm:pt-16 bg-gradient-to-l from-primary/5 via-primary/50 to-primary/10">
      <div className="max-w-2xl mx-auto p-4 sm:p-5 py-6  mt-11">
        <div className="bg-base-300 rounded-xl overflow-hidden shadow-[0_4px_10px_rgba(0,4,4,0.2),0_10px_20px_rgba(0,0,0,0.3)]">
          {/* Header Section */}
          <div className="relative bg-gradient-to-l from-primary/40 via-primary/80 to-primary/40 h-32 sm:h-40 shadow-4xl">
            <div className="absolute bottom-[-3rem] left-1/2 transform -translate-x-1/2">
               
              <div className="relative">
                <img
                  src={selectedImg || authUser.profilePic || "/Profile-PNG-Photo.png"}
                  alt="Profile"
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-primary shadow-[0_4px_10px_rgba(0,0,4,2),0_10px_20px_rgba(0,0,0,0.3)]"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-0 right-0 bg-base-content p-2 rounded-full cursor-pointer transition-all duration-200 ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }`}
                >
                  <Camera className="w-5 h-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="pt-16 px-4 sm:px-6">
            {/* Profile Info */}
            <div className="text-center space-y-2">
              {/* <h1 className="text-xl sm:text-2xl font-semibold">{authUser?.fullName}</h1>
              <p className="text-sm text-zinc-400">{authUser?.email}</p> */}
              <p className="text-xs text-zinc-400">
                {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
              </p>
            </div>

            <div className="mt-6 mb-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-xs text-zinc-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
                <p className="px-3 py-2 bg-base-200 rounded-lg border border-primary shadow-[0_4px_10px_rgba(0,0,0,0.2),0_10px_20px_rgba(0,0,0,0.3)]">{authUser?.fullName}</p>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-zinc-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
                <p className="px-3 py-2 bg-base-200 rounded-lg border border-primary shadow-[0_4px_10px_rgba(0,0,0,0.2),0_10px_20px_rgba(0,0,0,0.3)]">{authUser?.email}</p>
              </div>
            </div>

            {/* About Section */}
            <div className="mt-8 mb-11 bg-base-200 p-4 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.2),0_10px_20px_rgba(0,0,0,0.3)]">
              <h2 className="text-sm font-medium mb-3">About</h2>
              <p className="text-sm flex justify-between mb-1 items-center">
              Member Since: <span className="font-semibold">{authUser.createdAt?.split("T")[0]}</span>
              </p>
               <p className="text-sm flex justify-between items-center">
               Account Status: <span className="text-green-500 font-semibold text-right">Active</span>
               </p>
            </div>


            {/* Contact Section */}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
