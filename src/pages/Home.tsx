import { useNavigate } from "react-router-dom";
import { BookOpen, MessageSquare, Settings, Globe, Target, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import ChatHeader from "@/components/ChatHeader";

interface CategoryCard {
  icon: React.ReactNode;
  titleKey: "studyHelp" | "aiChat" | "settings" | "generalKnowledge" | "examPrep" | "imageGen";
  descKey: "studyHelpDesc" | "aiChatDesc" | "settingsDesc" | "generalKnowledgeDesc" | "examPrepDesc" | "imageGenDesc";
  route: string;
  gradient: string;
}

const categories: CategoryCard[] = [
  {
    icon: <BookOpen className="h-7 w-7" />,
    titleKey: "studyHelp",
    descKey: "studyHelpDesc",
    route: "/chat?topic=study",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: <MessageSquare className="h-7 w-7" />,
    titleKey: "aiChat",
    descKey: "aiChatDesc",
    route: "/chat",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: <Target className="h-7 w-7" />,
    titleKey: "examPrep",
    descKey: "examPrepDesc",
    route: "/chat?topic=exam",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    icon: <Globe className="h-7 w-7" />,
    titleKey: "generalKnowledge",
    descKey: "generalKnowledgeDesc",
    route: "/chat?topic=gk",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: <Sparkles className="h-7 w-7" />,
    titleKey: "imageGen",
    descKey: "imageGenDesc",
    route: "/chat?mode=image",
    gradient: "from-rose-500/20 to-red-500/20",
  },
  {
    icon: <Settings className="h-7 w-7" />,
    titleKey: "settings",
    descKey: "settingsDesc",
    route: "/settings",
    gradient: "from-slate-500/20 to-gray-500/20",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <div className="flex flex-col h-[100dvh] bg-background">
      <header>
        <ChatHeader onMenuClick={() => {}} onHistoryClick={() => {}} />
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 py-6">
          {/* Welcome */}
          <div className="text-center mb-8 animate-slide-up">
            <h1 className="text-2xl font-bold text-foreground mb-1">
              {t("welcome")} <span className="inline-block animate-wave">👋</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              {user ? user.email : t("guest")} • {t("welcomeSub")}
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.titleKey}
                onClick={() => navigate(cat.route)}
                className={`bg-gradient-to-br ${cat.gradient} border border-border rounded-xl p-4 text-left 
                  hover:scale-[1.02] active:scale-[0.98] transition-all duration-200
                  hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/30`}
              >
                <div className="text-primary mb-2">{cat.icon}</div>
                <h2 className="text-sm font-semibold text-foreground leading-tight">
                  {t(cat.titleKey)}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {t(cat.descKey)}
                </p>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
