import { ArrowLeft, Sun, Moon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const Settings = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col h-[100dvh] bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-base font-medium text-foreground">
            {t("settingsTitle")}
          </h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
          {/* Language */}
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="h-5 w-5 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">{t("language")}</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage("hi")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  language === "hi"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  language === "en"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Theme */}
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3 mb-4">
              {theme === "dark" ? (
                <Moon className="h-5 w-5 text-primary" />
              ) : (
                <Sun className="h-5 w-5 text-primary" />
              )}
              <h2 className="text-sm font-semibold text-foreground">{t("theme")}</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleTheme()}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  theme === "dark"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <Moon className="h-4 w-4" />
                {t("darkMode")}
              </button>
              <button
                onClick={() => toggleTheme()}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  theme === "light"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sun className="h-4 w-4" />
                {t("lightMode")}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
