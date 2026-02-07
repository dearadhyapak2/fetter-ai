import { useLanguage } from "@/contexts/LanguageContext";

const WelcomeScreen = () => {
  const { t } = useLanguage();

  return (
    <section className="flex-1 flex items-center justify-center h-full" aria-label="Welcome">
      <div className="text-center px-6 animate-slide-up">
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          {t("welcome")} <span className="inline-block animate-wave" role="img" aria-label="wave">👋</span>
        </h1>
        <p className="text-base text-muted-foreground">
          {t("welcomeSub")}
        </p>
      </div>
    </section>
  );
};

export default WelcomeScreen;
