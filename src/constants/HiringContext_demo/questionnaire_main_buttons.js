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
      },
      strategic_foundation: {
        title: "Market Position",
        competitive_edge: "Competitive Edge",
        growth_trajectory: "Growth Trajectory",
        innovation_capacity: "Innovation Capacity",
        risk_landscape: "Risk Landscape",
        organizational_dynamics: "Organizational Dynamics"
      },
      talent_architecture: {
        title: "Strategic Capabilities",
        core_competencies: "Core Competencies",
        adaptive_skills: "Adaptive Skills",
        innovation_mindset: "Innovation Mindset",
        leadership_potential: "Leadership Potential",
        cultural_alignment: "Cultural Alignment",
        values_integration: "Values Integration"
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
        retry: "Riprova Analisi"
      },
      sections: {
        strategic_foundation: "Riflessione Strategica",
        talent_architecture: "Architettura del processo di selezione",
        growth_catalysts: "Catalizzatori di Crescita"
      },
      descriptions: {
        strategic_foundation: "Posizione di mercato e dinamiche organizzative",
        talent_architecture: "Capacità e allineamento culturale",
        growth_catalysts: "Ottimizzazione dell'impatto e del rischio"
      },
      strategic_foundation: {
        title: "Posizione di Mercato",
        competitive_edge: "Vantaggio Competitivo",
        growth_trajectory: "Traiettoria di Crescita",
        innovation_capacity: "Capacità di Innovazione",
        risk_landscape: "Panorama dei Rischi",
        organizational_dynamics: "Dinamiche Organizzative"
      },
      talent_architecture: {
        title: "Capacità Strategiche",
        core_competencies: "Competenze Chiave",
        adaptive_skills: "Competenze Adattive",
        innovation_mindset: "Mentalità Innovativa",
        leadership_potential: "Potenziale di Leadership",
        cultural_alignment: "Allineamento Culturale",
        values_integration: "Integrazione dei Valori"
      }
    }
  }
};

export const useUITranslations = () => {
  const { language } = useLanguage();
  return formButtonTranslations[language]?.recruitment || formButtonTranslations.en.recruitment;
};