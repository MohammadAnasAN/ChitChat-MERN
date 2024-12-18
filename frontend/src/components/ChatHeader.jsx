import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useState } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showPopup, setShowPopup] = useState(false); // State to toggle the popup

  const isOnline = onlineUsers.includes(selectedUser._id);

  // Format the "member since" date
  const memberSince = new Date(selectedUser.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Chat Header */}
      <div className="p-2.5 border-b border-base-300 flex items-center justify-between">
        {/* Capsule Layout */}
        <div className="flex items-center w-full md:w-auto rounded-2xl  p-1 flex-grow">
          {/* Left Section: Profile Picture */}
          <div
            className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-l-xl bg-primary cursor-pointer"
            onClick={() => setShowPopup(true)} // Toggle popup on click
          >
            <img
              src={selectedUser.profilePic || "/Profile-PNG-Photo.png"}
              alt={selectedUser.fullName}
              className="border-4 border-primary w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-l-xl"
            />
          </div>

          {/* Separator */}
          <div className="w-[2px] h-full bg-white"></div>

          {/* Right Section: User Info */}
          <div className="flex flex-col justify-center px-2 py-1 flex-grow bg-gradient-to-r from-primary/5 via-primary/20 to-primary/5 rounded-r-xl border-2 border-primary min-h-full">
            <div className="flex items-center justify-between w-full">
              {/* Full Name */}
              <h3 className="font-semibold text-xs sm:text-sm lg:text-base text-white truncate">
                {selectedUser.fullName}
              </h3>

              {/* Member Since */}
              <p className="text-[10px] sm:text-xstext-base-content ml-1 sm:block hidden">
                Member since {memberSince}
              </p>
            </div>

            {/* Online / Offline Status */}
            <p
              className={`text-[10px] sm:text-xs lg:text-sm font-thin ${
                isOnline ? "text-gray-100" : "text-red-500"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="text-primary hover:text-red-900 ml-2 md:ml-5"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Image Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          {/* Close Button */}
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-5 right-5 text-white hover:text-red-500"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Profile Image */}
          <div className="max-w-2xl w-full p-4">
            <img
              src={selectedUser.profilePic || "/Profile-PNG-Photo.png"}
              alt="Profile Pic"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatHeader;
