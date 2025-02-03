import { useLanguage } from '@/context/LanguageContext';

export const formButtonTranslations = {
  en: {
    recruitment: {
      title: "Hiring Context Assessment",
      description: "This assessment will guide you through key questions about your organization to create a tailored hiring strategy",
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
      title: "Il tuo hiring è davvero a prova di futuro?",
      description: "Questa valutazione ti guiderà attraverso domande chiave sulla tua organizzazione per creare una strategia di assunzione personalizzata",
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
        button: "Analizza",
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