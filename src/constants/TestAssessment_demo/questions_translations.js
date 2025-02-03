import { useLanguage } from '@/context/LanguageContext';

export const test_assessmentQuestionsTranslations = {
  en: {
    questions: [
      {
        id: '1',
        section: "Company Information",
        question: "Add your company website",
        description: "We will use it to gather information about what you do, helping us create a more accurate hiring profile.",
        type: "url",
        placeholder: "Please add your company website address here - e.g. https://www.mastrohr.com",
        validation: {
          required: true,
          type: 'url'
        }
      },
      {
        id: '2',
        section: "Leadership Approach",
        question: "What leadership style best matches your organizational needs?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Strategic & Visionary Leadership", value: "strategic_visionary" },
          { label: "Operational Excellence Focus", value: "operational_excellence" },
          { label: "Transformational Leadership", value: "transformational" },
          { label: "Innovation & Change Management", value: "innovation_change" },
          { label: "People Development & Culture", value: "people_culture" },
          { label: "Other", value: "other" }
        ],
        maxSelection: 3,
        maxLength: 150,
        validation: {
          required: true
        }
      },
      {
        id: '3',
        section: "Strategic Priorities",
        question: "What are your organization's key strategic priorities?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Market Expansion & Growth", value: "market_growth" },
          { label: "Digital Transformation", value: "digital_transformation" },
          { label: "Operational Optimization", value: "operational_optimization" },
          { label: "Innovation & Product Development", value: "innovation_product" },
          { label: "Team & Culture Development", value: "team_culture" },
          { label: "Other", value: "other" }
        ],
        maxSelection: 3,
        maxLength: 150,
        validation: {
          required: true
        }
      },
      {
        id: '4',
        section: "Executive Capabilities",
        question: "Which executive capabilities are most crucial for your organization?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Strategic Vision & Planning", value: "strategic_planning" },
          { label: "Change Management & Innovation", value: "change_management" },
          { label: "Financial Growth & Scalability", value: "financial_growth" },
          { label: "Stakeholder & Relationship Management", value: "stakeholder_management" },
          { label: "Digital & Technical Leadership", value: "digital_leadership" },
          { label: "Other", value: "other" }
        ],
        maxSelection: 4,
        maxLength: 150,
        validation: {
          required: true
        }
      },
      {
        id: '5',
        section: "Business Challenges",
        question: "What are the primary business challenges this executive needs to address?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Revenue Growth & Market Share", value: "revenue_growth" },
          { label: "Operational Efficiency", value: "operational_efficiency" },
          { label: "Digital Transformation", value: "digital_transformation" },
          { label: "Team Performance & Culture", value: "team_performance" },
          { label: "Innovation & Product Development", value: "innovation_product" },
          { label: "Other", value: "other" }
        ],
        maxSelection: 3,
        maxLength: 150,
        validation: {
          required: true
        }
      },
      {
        id: '6',
        section: "Performance Metrics",
        question: "What key performance indicators (KPIs) will define success?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Financial Growth Metrics", value: "financial_metrics" },
          { label: "Operational Excellence KPIs", value: "operational_kpis" },
          { label: "Team Development Goals", value: "team_goals" },
          { label: "Market Position Indicators", value: "market_indicators" },
          { label: "Innovation & Change Metrics", value: "innovation_metrics" },
          { label: "Other", value: "other" }
        ],
        maxSelection: 3,
        maxLength: 150,
        validation: {
          required: true
        }
      },
      {
        id: '7',
        section: "Organizational Gaps",
        question: "What are the current organizational gaps this role needs to address?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Strategic Leadership", value: "strategic_gap" },
          { label: "Operational Excellence", value: "operational_gap" },
          { label: "Innovation & Change Management", value: "innovation_gap" },
          { label: "Team Development & Culture", value: "team_gap" },
          { label: "Market & Customer Focus", value: "market_gap" },
          { label: "Other", value: "other" }
        ],
        maxSelection: 3,
        maxLength: 150,
        validation: {
          required: true
        }
      },
      {
        id: '8',
        section: "Decision Making",
        question: "What type of decision-making approach is critical for this role?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Data-Driven & Analytical", value: "data_driven" },
          { label: "Strategic & Long-term Focused", value: "strategic_focus" },
          { label: "Agile & Adaptive", value: "agile_adaptive" },
          { label: "Collaborative & Inclusive", value: "collaborative" },
          { label: "Risk-Balanced & Systematic", value: "risk_balanced" },
          { label: "Other", value: "other" }
        ],
        maxSelection: 3,
        maxLength: 150,
        validation: {
          required: true
        }
      },
      {
        id: '9',
        section: "Current Capabilities",
        question: "What relevant capabilities currently exist in your organization?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Strong Leadership Team", value: "leadership_team" },
          { label: "Established Processes", value: "established_processes" },
          { label: "Technical Excellence", value: "technical_excellence" },
          { label: "Market Presence", value: "market_presence" },
          { label: "Innovation Culture", value: "innovation_culture" },
          { label: "Other", value: "other" }
        ],
        maxSelection: 4,
        maxLength: 150,
        validation: {
          required: true
        }
      }
    ]
  },
  it: {
    questions: [
      {
        id: '1',
        section: "Informazioni Aziendali",
        question: "Inserisci il sito web aziendale",
        description: "Lo utilizzeremo per raccogliere informazioni sulle vostre attività, aiutandoci a creare un profilo di assunzione più accurato",
        type: "url",
        placeholder: "Inserisci l'indirizzo del sito web aziendale - es. https://www.mastrohr.com",
        validation: {
          required: true,
          type: 'url'
        }
      },
      {
        id: '2',
        section: "Approccio alla Leadership",
        question: "Quale stile di leadership corrisponde meglio alle esigenze della tua organizzazione?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Leadership Strategica e Visionaria", value: "strategic_visionary" },
          { label: "Focus sull'Eccellenza Operativa", value: "operational_excellence" },
          { label: "Leadership Trasformazionale", value: "transformational" },
          { label: "Gestione dell'Innovazione e del Cambiamento", value: "innovation_change" },
          { label: "Sviluppo del Personale e Cultura", value: "people_culture" },
          { label: "Altro", value: "other" }
        ],
        maxSelection: 3,
        maxLength: 150,
        validation: {
          required: true
        }
      },
      {
        id: '3',
        section: "Priorità Strategiche",
        question: "Quali sono le principali priorità strategiche della tua organizzazione?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Espansione e Crescita del Mercato", value: "market_growth" },
          { label: "Trasformazione Digitale", value: "digital_transformation" },
          { label: "Ottimizzazione Operativa", value: "operational_optimization" },
          { label: "Innovazione e Sviluppo Prodotto", value: "innovation_product" },
          { label: "Sviluppo del Team e della Cultura", value: "team_culture" },
          { label: "Altro", value: "other" }
        ],
        maxSelection: 3,
        maxLength: 150,
        validation: {
          required: true
        }
      },
      {
        id: '4',
        section: "Competenze Esecutive",
        question: "Quali competenze esecutive sono più cruciali per la tua organizzazione?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Visione e Pianificazione Strategica", value: "strategic_planning" },
          { label: "Gestione del Cambiamento e Innovazione", value: "change_management" },
          { label: "Crescita Finanziaria e Scalabilità", value: "financial_growth" },
          { label: "Gestione degli Stakeholder e delle Relazioni", value: "stakeholder_management" },
          { label: "Leadership Digitale e Tecnica", value: "digital_leadership" },
          { label: "Altro", value: "other" }
        ],
        maxSelection: 4,
        maxLength: 150,
        validation: {
          required: true
        }
      },
      {
        id: '5',
        section: "Sfide Aziendali",
        question: "Quali sono le principali sfide aziendali che questo dirigente deve affrontare?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Crescita dei Ricavi e Quota di Mercato", value: "revenue_growth" },
          { label: "Efficienza Operativa", value: "operational_efficiency" },
          { label: "Trasformazione Digitale", value: "digital_transformation" },
          { label: "Performance del Team e Cultura", value: "team_performance" },
          { label: "Innovazione e Sviluppo Prodotto", value: "innovation_product" },
          { label: "Altro", value: "other" }
        ],
        maxSelection: 3,
        maxLength: 150,
        validation: {
          required: true
        }
      },
      {
        id: '6',
        section: "Metriche di Performance",
        question: "Quali indicatori chiave di performance (KPI) definiranno il successo?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Metriche di Crescita Finanziaria", value: "financial_metrics" },
          { label: "KPI di Eccellenza Operativa", value: "operational_kpis" },
          { label: "Obiettivi di Sviluppo del Team", value: "team_goals" },
          { label: "Indicatori di Posizione di Mercato", value: "market_indicators" },
          { label: "Metriche di Innovazione e Cambiamento", value: "innovation_metrics" },
          { label: "Altro", value: "other" }
        ],
        maxSelection: 3,
        maxLength: 150,
        validation: {
          required: true
        }
      },
      {
        id: '7',
        section: "Gap Organizzativi",
        question: "Quali sono gli attuali gap organizzativi che questo ruolo deve colmare?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Leadership Strategica", value: "strategic_gap" },
          { label: "Eccellenza Operativa", value: "operational_gap" },
          { label: "Gestione dell'Innovazione e del Cambiamento", value: "innovation_gap" },
          { label: "Sviluppo del Team e Cultura", value: "team_gap" },
          { label: "Focus sul Mercato e sul Cliente", value: "market_gap" },
          { label: "Altro", value: "other" }
        ],
        maxSelection: 3,
        maxLength: 150,
        validation: {
          required: true
        }
      },
      {
        id: '8',
        section: "Processo Decisionale",
        question: "Quale tipo di approccio decisionale è fondamentale per questo ruolo?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Basato sui Dati e Analitico", value: "data_driven" },
          { label: "Strategico e Orientato al Lungo Termine", value: "strategic_focus" },
          { label: "Agile e Adattivo", value: "agile_adaptive" },
          { label: "Collaborativo e Inclusivo", value: "collaborative" },
          { label: "Bilanciato sul Rischio e Sistematico", value: "risk_balanced" },
          { label: "Altro", value: "other" }
        ],
        maxSelection: 3,
        maxLength: 150,
        validation: {
          required: true
        }
      },
      {
        id: '9',
        section: "Capacità Attuali",
        question: "Quali capacità rilevanti esistono attualmente nella tua organizzazione?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Team di Leadership Forte", value: "leadership_team" },
          { label: "Processi Consolidati", value: "established_processes" },
          { label: "Eccellenza Tecnica", value: "technical_excellence" },
          { label: "Presenza sul Mercato", value: "market_presence" },
          { label: "Cultura dell'Innovazione", value: "innovation_culture" },
          { label: "Altro", value: "other" }
        ],
        maxSelection: 4,
        maxLength: 150,
        validation: {
          required: true
        }
      }
    ]
  }
};

export const useTestAssessmentQuestions = () => {
  const { language } = useLanguage();
  return test_assessmentQuestionsTranslations[language].questions;
};