import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeltons/SideBarSkeleton";
import { UserCircle } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading, newMessageUsers } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.indexOf(user._id) > -1)
    : users;

  const newMessageUserSet = new Set(newMessageUsers || []);
  
  // Sorting: First online users, then offline users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aIsOnline = onlineUsers.indexOf(a._id) > -1;
    const bIsOnline = onlineUsers.indexOf(b._id) > -1;

    // Online users come first
    if (aIsOnline && !bIsOnline) return -1;
    if (!aIsOnline && bIsOnline) return 1;

    // Then, sort by new message status
    const aHasNewMessage = newMessageUserSet.has(a._id);
    const bHasNewMessage = newMessageUserSet.has(b._id);

    if (aHasNewMessage && !bHasNewMessage) return -1;
    if (!aHasNewMessage && bHasNewMessage) return 1;
    return 0;
  });

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-base-100 shadow-md"
      style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // Internet Explorer and Edge
      }}
    >
      {/* Header Section */}
      <div className="border-b border-base-300 w-full p-5 bg-base-50 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-4">
          <UserCircle className="size-6 text-primary" />
          {/* This text will be hidden on small screens */}
          <span
            className="font-semibold text-lg relative 
              before:absolute before:-bottom-1 before:left-0 before:w-0 
              before:h-[2px] before:bg-gradient-to-r before:from-red-500 before:to-blue-500
              hover:before:w-full hover:animate-[rainbow_1.5s_linear_infinite]
              hidden sm:block" // Hide text on small screens
          >
            Contacts
          </span>
        </div>
        
        {/* Checkbox for online-only */}
        <div className="mt-5 flex items-center justify-center gap-4 p-3 rounded-lg shadow-md w-full border-2 border-primary">
          {/* Only show checkbox and remove text on smaller screens */}
          <label className="cursor-pointer flex items-center gap-2 text-sm font-medium ">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-primary h-4 w-4" // Reduced size of the checkbox
            />
            {/* Hidden on small screens */}
            <span className="hidden sm:block">Show online only</span>
            {/* Hidden on small screens */}
            <span className="hidden sm:block text-xs text-gray-500">({onlineUsers.length - 1} online)</span>
          </label>
        </div>
      </div>

      {/* Users List */}
      <div
        className="overflow-y-auto w-full py-4 px-2"
        style={{
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none", // Firefox
        }}
      >
        {sortedUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-2 rounded-lg
              hover:bg-gray-500 hover:bg-opacity-30 hover:text-gray-200 transition-all duration-300
              ${selectedUser?._id === user._id ? "bg-primary text-white shadow-xl transform scale-10" : "shadow-md"}
              hover:shadow-xl hover:scale-105`}
          >
            {/* User Profile Picture */}
            <div className="relative mx-auto lg:mx-0 aspect-square w-12">
              <img
                src={user.profilePic || "/Profile-PNG-Photo.png"}
                alt={user.name}
                className="object-cover rounded-md border-2 border-gray-200 shadow-sm transition-transform hover:scale-150 w-full h-full"
              />
              {onlineUsers.indexOf(user._id) > -1 && (
                <span
                  className="absolute bottom-0 right-0 size-2 bg-green-500 
                  rounded-full ring-2 ring-white animate-pulse"
                />
              )}
            </div>
            {/* User Info */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-semibold truncate">{user.fullName}</div>
              <div className="text-sm text-gray-500">
                {onlineUsers.indexOf(user._id) > -1 ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {/* No Users Fallback */}
        {sortedUsers.length === 0 && (
          <div className="flex flex-col items-center text-gray-500 py-6">
            <img src="/Profile-PNG-Photo.png" alt="No Users" className="h-16 w-16 mb-3" />
            <p className="text-sm">No online users</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
