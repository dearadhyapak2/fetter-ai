import { User, Bot, FileText, Image as ImageIcon } from "lucide-react";

interface AttachedFile {
  name: string;
  type: string;
  url?: string;
}

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  files?: AttachedFile[];
}

const ChatMessage = ({ role, content, files }: ChatMessageProps) => {
  const isUser = role === "user";

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) {
      return <ImageIcon className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div
      className={`flex gap-4 p-4 animate-fade-in ${
        isUser ? "bg-transparent" : "bg-card/50"
      }`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
          ${isUser ? "bg-secondary" : "bg-primary"}`}
      >
        {isUser ? (
          <User className="h-5 w-5 text-muted-foreground" />
        ) : (
          <Bot className="h-5 w-5 text-primary-foreground" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-3">
        {/* Attached Files */}
        {files && files.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-lg text-sm"
              >
                {getFileIcon(file.type)}
                <span className="text-foreground">{file.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Message Text */}
        <div className="text-foreground leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
