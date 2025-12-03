const WelcomeScreen = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 animate-slide-up">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">
          नमस्ते! <span className="inline-block animate-wave">👋</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          मैं आपकी स्वास्थ्य सेवा में कैसे मदद कर सकता हूं?
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
