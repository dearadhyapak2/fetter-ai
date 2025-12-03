import { useState, useRef } from "react";
import { Send, Paperclip, X, FileText, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSendMessage: (message: string, files?: File[]) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || attachedFiles.length > 0) {
      onSendMessage(message, attachedFiles);
      setMessage("");
      setAttachedFiles([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachedFiles((prev) => [...prev, ...files]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="p-4 border-t border-border bg-background">
      {/* Attached Files Preview */}
      {attachedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {attachedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-lg text-sm"
            >
              {getFileIcon(file)}
              <span className="max-w-[150px] truncate text-foreground">
                {file.name}
              </span>
              <button
                onClick={() => removeFile(index)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-end gap-2 bg-secondary rounded-2xl p-2">
          {/* File Upload Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-full flex-shrink-0"
          >
            <Paperclip className="h-5 w-5" />
          </Button>

          {/* Text Input */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="कुछ भी पूछें..."
            rows={1}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground 
              resize-none focus:outline-none min-h-[40px] max-h-[200px] py-2 px-2"
            style={{
              height: "auto",
              minHeight: "40px",
            }}
          />

          {/* Send Button */}
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || (!message.trim() && attachedFiles.length === 0)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full 
              flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>

      <p className="text-xs text-muted-foreground text-center mt-3">
        Mk pharmacy Hub AI आपकी मदद के लिए तैयार है
      </p>
    </div>
  );
};

export default ChatInput;
