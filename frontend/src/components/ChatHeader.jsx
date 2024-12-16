import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  // Format the "member since" date
  const memberSince = new Date(selectedUser.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-2.5 border-b border-base-300 flex items-center justify-between">
      {/* Capsule Layout */}
      <div className="flex items-center w-full md:w-auto rounded-2xl border-2 border-primary p-2 flex-grow">
        {/* Left Section: Profile Picture */}
        <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18  rounded-l-xl bg-primary">
          <img
            src={selectedUser.profilePic || "/Profile-PNG-Photo.png"}
            alt={selectedUser.fullName}
            className="border-2 border-primary w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 object-cover rounded-l-xl"
          />
        </div>

        {/* Separator */}
        <div className="w-[2px] h-full bg-white "></div>

        {/* Right Section: User Info */}
        <div className="flex flex-col justify-center px-3 flex-grow bg-gray-800 p-1.5 rounded-r-xl border-2 border-primary min-h-full">
          <div className="flex items-center justify-between w-full">
            {/* Full Name */}
            <h3 className="font-bold text-sm sm:text-base lg:text-lg text-white truncate">
              {selectedUser.fullName}
            </h3>

            {/* Member Since (Hidden on small screens) */}
            <p className="text-xs sm:text-sm text-gray-500 ml-1 sm:block hidden">
              Member since {memberSince}
            </p>
          </div>

          {/* Online / Offline Status */}
          <p
            className={`text-xs sm:text-sm lg:text-base font-thin ${
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
        className="text-gray-900 hover:text-red-900 ml-2 md:ml-5"
      >
        <X className="w-6 h-6 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};

export default ChatHeader;
