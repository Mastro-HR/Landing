// src/constants/TestAssessment_demo/questionnaire_main_buttons.js
import { useLanguage } from '@/context/LanguageContext';

export const formButtonTranslations = {
  en: {
    recruitment: {
      title: "C-Suite Test Assessment",
      description: "This assessment will help you develop a data-driven framework for senior leadership recruitment and strengthen your executive hiring decisions.",
      progress: {
        complete: "Complete",
        restart: "Restart",
        step: "Phase",
        of: "of",
        completed: "completed"
      },
      navigation: {
        previous: "Previous",
        next: "Next",
        backToAssessment: "Return to Assessment"
      },
      analysis: {
        button: "Generate C-Suite Test",
        running: "Analyzing Leadership Requirements...",
        error: {
          title: "Analysis Interrupted",
          default: "We encountered an issue while processing your executive requirements. Please try again."
        },
        retry: "Restart Analysis",
      }
    }
  },
  it: {
    recruitment: {
      title: "Crea Test Valutazione Competenze Esecutive",
      description: "Questa valutazione ti fornirà un framework basato sui dati per il recruitment di senior leadership e rafforzerà le tue decisioni di selezione executive.",
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
        button: "Genera Test",
        running: "Analisi Requisiti Leadership in corso...",
        error: {
          title: "Analisi Interrotta",
          default: "Si è verificato un problema durante l'elaborazione dei requisiti executive. Si prega di riprovare."
        },
        retry: "Riavvia Analisi",
      }
    }
  }
};

export const useUITranslations = () => {
  const { language } = useLanguage();
  return formButtonTranslations[language]?.recruitment || formButtonTranslations.en.recruitment;
};
