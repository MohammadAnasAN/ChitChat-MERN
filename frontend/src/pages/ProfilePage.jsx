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

    if (file.size > 80 * 1024) { // 80KB in bytes
      toast.error("Image size must be less than 80KB");
      return; // Stop further execution
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
    <div className="h-screen pt-14 sm:pt-16">
      <div className="max-w-xl mx-auto p-4 sm:p-5 py-6">
        <div className="bg-base-300 rounded-xl p-5 space-y-6 shadow-lg transform transition-all duration-300">
          <div className="text-center">
            <h1 className="text-xl font-semibold">Profile</h1>
            <p className="mt-1 text-sm">Your profile information</p>
          </div>

          {/* Avatar Upload Section with Neon Effect */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/Profile-PNG-Photo.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 shadow-lg neon-glow-effect"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105 
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200 
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
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
            <p className="text-xs text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Profile Info Section */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-xs text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-3 py-2 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-3 py-2 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>

          {/* Account Info Section */}
          <div className="mt-4 bg-base-300 rounded-xl p-4 shadow-lg">
            <h2 className="text-sm font-medium mb-3">Account Information</h2>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
