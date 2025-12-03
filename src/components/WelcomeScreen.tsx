import { Pill, Stethoscope, Heart, BookOpen } from "lucide-react";

interface WelcomeScreenProps {
  onSuggestionClick: (suggestion: string) => void;
}

const WelcomeScreen = ({ onSuggestionClick }: WelcomeScreenProps) => {
  const suggestions = [
    {
      icon: Pill,
      title: "दवाई की जानकारी",
      description: "किसी भी दवाई के बारे में पूछें",
      query: "पेरासिटामोल टैबलेट के बारे में बताओ",
    },
    {
      icon: Stethoscope,
      title: "स्वास्थ्य सलाह",
      description: "आम बीमारियों की जानकारी",
      query: "सर्दी जुकाम में क्या करना चाहिए?",
    },
    {
      icon: Heart,
      title: "घरेलू उपचार",
      description: "सरल घरेलू नुस्खे",
      query: "बुखार में कौन से घरेलू उपचार करें?",
    },
    {
      icon: BookOpen,
      title: "फार्मेसी गाइड",
      description: "दवाइयों को कैसे रखें",
      query: "दवाइयों को सही तरीके से कैसे स्टोर करें?",
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 animate-fade-in">
      {/* Logo & Title */}
      <div className="text-center mb-10">
        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center animate-pulse-glow">
          <Pill className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Mk pharmacy Hub AI
        </h1>
        <p className="text-lg text-muted-foreground">
          आज आपकी क्या मदद करूं?
        </p>
      </div>

      {/* Suggestion Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion.query)}
            className="flex items-start gap-4 p-4 bg-card hover:bg-card/80 border border-border 
              rounded-xl text-left transition-all duration-200 hover:shadow-lg hover:border-primary/30 group"
          >
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <suggestion.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">
                {suggestion.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {suggestion.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;
