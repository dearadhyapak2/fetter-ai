import { useState, useRef, useEffect } from "react";
import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import ChatMessage from "@/components/ChatMessage";
import WelcomeScreen from "@/components/WelcomeScreen";
import HistoryDrawer from "@/components/HistoryDrawer";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  files?: { name: string; type: string }[];
}

interface Chat {
  id: string;
  title: string;
  date: string;
  messages: Message[];
}

const Index = () => {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find((chat) => chat.id === currentChatId);
  const messages = currentChat?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("owner") || lowerMessage.includes("मालिक") || lowerMessage.includes("किसने बनाया")) {
      return "इस ऐप के मालिक मुकेश कुमार देशमुख हैं। वे गाँव चंगोरी, जिला दुर्ग से हैं।";
    }

    if (lowerMessage.includes("पेरासिटामोल") || lowerMessage.includes("paracetamol")) {
      return "पेरासिटामोल एक दर्द निवारक और बुखार कम करने वाली दवा है।\n\n📌 उपयोग:\n• बुखार में\n• सिरदर्द में\n• शरीर दर्द में\n\n⚠️ सावधानियां:\n• खाली पेट न लें\n• 24 घंटे में 4 से ज्यादा गोली न लें\n• शराब के साथ न लें\n\n💊 सामान्य खुराक: 500mg से 1000mg, हर 4-6 घंटे में";
    }

    if (lowerMessage.includes("सर्दी") || lowerMessage.includes("जुकाम") || lowerMessage.includes("cold")) {
      return "सर्दी-जुकाम में ये करें:\n\n🏠 घरेलू उपचार:\n• गर्म पानी पिएं\n• अदरक-तुलसी की चाय\n• भाप लें\n• शहद-नींबू का पानी\n\n💊 दवाइयां:\n• Cetirizine (एलर्जी के लिए)\n• पेरासिटामोल (बुखार हो तो)\n\n⚠️ डॉक्टर को दिखाएं अगर:\n• 3 दिन से ज्यादा बुखार रहे\n• सांस लेने में तकलीफ हो";
    }

    if (lowerMessage.includes("बुखार") || lowerMessage.includes("fever")) {
      return "बुखार में ये घरेलू उपचार करें:\n\n🏠 तुरंत राहत के लिए:\n• माथे पर गीला कपड़ा रखें\n• हल्के कपड़े पहनें\n• खूब पानी पिएं\n\n🍵 पीने के लिए:\n• तुलसी-अदरक का काढ़ा\n• गिलोय का रस\n• नींबू पानी\n\n💊 दवाई:\n• पेरासिटामोल 500mg\n\n⚠️ 102°F से ज्यादा बुखार हो तो डॉक्टर को दिखाएं";
    }

    if (lowerMessage.includes("स्टोर") || lowerMessage.includes("रखें") || lowerMessage.includes("store")) {
      return "दवाइयों को सही तरीके से रखने के टिप्स:\n\n📦 सही जगह:\n• ठंडी और सूखी जगह पर रखें\n• सीधी धूप से बचाएं\n• बच्चों की पहुंच से दूर रखें\n\n🌡️ तापमान:\n• कमरे के तापमान (25°C से नीचे) पर रखें\n• कुछ दवाइयां फ्रिज में रखें (पैकेट पर देखें)\n\n⚠️ ध्यान दें:\n• एक्सपायरी डेट जरूर चेक करें\n• पुरानी दवाइयां न खाएं";
    }

    if (lowerMessage.includes("नमस्ते") || lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "नमस्ते! 🙏 मैं MK Pharmacy Hub AI हूं।\n\nमैं आपकी इन बातों में मदद कर सकता हूं:\n• दवाइयों की जानकारी\n• स्वास्थ्य सलाह\n• घरेलू उपचार\n• फार्मेसी से जुड़े सवाल\n\nकृपया अपना सवाल पूछें!";
    }

    return "धन्यवाद आपके सवाल के लिए! 🙏\n\nमैं आपकी मदद के लिए यहां हूं। कृपया अपना सवाल विस्तार से पूछें:\n\n• दवाई का नाम बताएं\n• अपनी समस्या बताएं\n• या कोई भी स्वास्थ्य संबंधी सवाल पूछें\n\nमैं सरल हिंदी में जवाब दूंगा।";
  };

  const handleSendMessage = async (content: string, files?: File[]) => {
    const fileAttachments = files?.map((f) => ({ name: f.name, type: f.type }));

    let chatId = currentChatId;
    if (!chatId) {
      const newChat: Chat = {
        id: Date.now().toString(),
        title: content.slice(0, 30) + (content.length > 30 ? "..." : ""),
        date: new Date().toLocaleDateString("hi-IN"),
        messages: [],
      };
      setChats((prev) => [newChat, ...prev]);
      chatId = newChat.id;
      setCurrentChatId(chatId);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      files: fileAttachments,
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, userMessage] }
          : chat
      )
    );

    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? { ...chat, messages: [...chat.messages, assistantMessage] }
            : chat
        )
      );
      setIsLoading(false);
    }, 1000);
  };

  const handleNewChat = () => {
    setCurrentChatId(null);
  };

  const handleSelectChat = (id: string) => {
    setCurrentChatId(id);
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Header */}
      <ChatHeader
        onMenuClick={() => {}}
        onHistoryClick={() => setHistoryOpen(true)}
      />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <WelcomeScreen />
        ) : (
          <div className="max-w-3xl mx-auto pb-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                content={message.content}
                files={message.files}
              />
            ))}
            {isLoading && (
              <div className="flex gap-3 p-4">
                <div className="w-10 h-10 rounded-full bg-card shadow-md border border-border flex items-center justify-center">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onNewChat={handleNewChat}
        chatHistory={chats.map((c) => ({ id: c.id, title: c.title, date: c.date }))}
        currentChatId={currentChatId}
        onSelectChat={handleSelectChat}
      />
    </div>
  );
};

export default Index;
