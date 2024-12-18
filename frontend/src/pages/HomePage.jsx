import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/SideBar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = (isDiscoEffectOn) => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200 p-4 bg-gradient-to-l from-primary/5 via-primary/50  to-primary/10 ">
      <div className="flex items-center justify-center pt-20 px-4 ">
        <div className="bg-base-100 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.2),0_10px_20px_rgba(0,0,0,0.3)]  transition-all duration-300 w-full max-w-6xl h-[calc(100vh-8rem)] ">
          <div className="flex h-full rounded-lg overflow-hidden ">
            <Sidebar />

            {!selectedUser ? <NoChatSelected isDiscoEffectOn={isDiscoEffectOn} /> : <ChatContainer />}

          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
