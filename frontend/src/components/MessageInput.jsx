import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 sm:flex-row flex-col sm:gap-0"
      >
        <div className="flex-1 flex relative items-center">
          {/* Input field */}
          <input
            type="text"
            className="w-full input input-bordered rounded-lg pr-16 sm:pr-24"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          {/* Buttons inside input */}
          <div
            className="absolute right-4 flex items-center gap-2 sm:gap-3"
          >
            <button
              type="button"
              className={`btn btn-xs sm:btn-sm btn-circle bg-primary/10 text-primary  ${imagePreview ? "text-emerald-900" : "text-primary"}}`}
              
              onClick={() => fileInputRef.current?.click()}
            >
              <Image size={16} />
            </button>
            <button
              type="submit"
              className="btn btn-xs sm:btn-sm btn-circle bg-primary/10 text-primary"
              // disabled={!text.trim() && imagePreview}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
