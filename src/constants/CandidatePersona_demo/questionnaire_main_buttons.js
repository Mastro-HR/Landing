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
        backToAssessment: "Back to Assessment"
      },
      analysis: {
        button: "Create Candidate Profile",
        running: "Running Analysis...",
        error: {
          title: "Analysis Failed",
          default: "An error occurred while analyzing the data. Please try again."
        },
        retry: "Retry Analysis",
      },
      analysis: {
        button: "Run Analysis",
        running: "Running Analysis...",
        error: {
          title: "Analysis Failed",
          default: "An error occurred while analyzing the data. Please try again."
        },
        retry: "Retry Analysis",
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
        backToAssessment: "Torna alla Valutazione"
      },
      analysis: {
        button: "Crea Profilo Candidato",
        running: "Analisi in corso...",
        error: {
          title: "Analisi Fallita",
          default: "Si è verificato un errore durante l'analisi dei dati. Si prega di riprovare."
        },
        retry: "Riprova Analisi",
      }
    }
  }
};

export const useUITranslations = () => {
  const { language } = useLanguage();
  return formButtonTranslations[language]?.recruitment || formButtonTranslations.en.recruitment;
};