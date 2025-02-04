import { useLanguage } from '@/context/LanguageContext';

export const formButtonTranslations = {
  en: {
    recruitment: {
      title: "How to spot the perfect executive?",
      description: "This assessment will help you define the ideal candidate requirements for your organization and create tailored insights on your hiring strategy",
      progress: {
        complete: "Complete",
        restart: "Restart",
        step: "Step",
        of: "of",
        completed: "completed"
      },
      navigation: {
        previous: "Previous",
        next: "Next",
        backToAssessment: "Back to Assessment",
        backToAnalysis: "Back to Analysis"  // Added this line
      },
      analysis: {
        button: "Run Analysis",
        running: "Running Analysis...",
        error: {
          title: "Analysis Failed",
          default: "An error occurred while analyzing the data. Please try again."
        },
        retry: "Retry Analysis"
      },
      sections: {
        strategic_foundation: "Strategic Foundation",
        talent_architecture: "Talent Architecture",
        growth_catalysts: "Growth Catalysts"
      },
      descriptions: {
        strategic_foundation: "Market position & organizational dynamics",
        talent_architecture: "Capabilities & cultural alignment",
        growth_catalysts: "Impact & risk optimization"
      }
    }
  },
  it: {
    recruitment: {
      title: "Come trovare il candidato ideale?",
      description: "Questa valutazione ti permettera di identificare il tuo candidato ideale e creare una strategia di assunzione talento personalizzata",
      progress: {
        complete: "Completato",
        restart: "Ricomincia",
        step: "Fase",
        of: "di",
        completed: "completato"
      },
      navigation: {
        previous: "Precedente",
        next: "Successivo",
        backToAssessment: "Torna alla Valutazione",
        backToAnalysis: "Torna all'Analisi"  // Added this line
      },
      analysis: {
        button: "Analizza",
        running: "Analisi in corso...",
        error: {
          title: "Analisi Fallita",
          default: "Si è verificato un errore durante l'analisi dei dati. Si prega di riprovare."
        },
        retry: "Riprova Analisi"
      },
      sections: {
        strategic_foundation: "Base Strategica",
        talent_architecture: "Architettura del Talento",
        growth_catalysts: "Catalizzatori di Crescita"
      },
      descriptions: {
        strategic_foundation: "Posizione di mercato e dinamiche organizzative",
        talent_architecture: "Capacità e allineamento culturale",
        growth_catalysts: "Ottimizzazione dell'impatto e del rischio"
      }
    }
  }
};

export const useUITranslations = () => {
  const { language } = useLanguage();
  return formButtonTranslations[language]?.recruitment || formButtonTranslations.en.recruitment;
};