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
        section: "Assessment Scenario",
        question: "What type of real scenario should the candidate be tested on?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Development of a new growth strategy", value: "growth_strategy" },
          { label: "Solving a critical operational challenge", value: "operational_challenge" },
          { label: "Launch of a new product or service", value: "product_launch" },
          { label: "Expansion into a new market", value: "market_expansion" },
          { label: "Optimization of organizational structure", value: "org_structure_optimization" },
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
        section: "Test Success Indicators",
        question: "Which aspects do you consider critical for evaluating the candidate through the test?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Ability to analyze and define the problem", value: "problem_analysis" },
          { label: "Proposal of concrete and feasible solutions", value: "feasible_solutions" },
          { label: "Innovation and differentiating approach", value: "innovation_approach" },
          { label: "Prioritization and execution capabilities", value: "execution_prioritization" },
          { label: "Alignment with company values and culture", value: "culture_fit" },
          { label: "Other", value: "other" }
        ],
        maxSelection: 3,
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
        section: "Scenario di Test",
        question: "Su quale tipo di scenario reale il candidato dovrebbe essere messo alla prova?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Sviluppo di una nuova strategia di crescita", value: "growth_strategy" },
          { label: "Risolvere una sfida operativa critica", value: "operational_challenge" },
          { label: "Lancio di un nuovo prodotto o servizio", value: "product_launch" },
          { label: "Espansione in un nuovo mercato", value: "market_expansion" },
          { label: "Ottimizzazione della struttura organizzativa", value: "org_structure_optimization" },
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
        section: "Indicatori di Successo del Test",
        question: "Quali aspetti consideri critici per valutare il candidato attraverso il test?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Analisi del problema", value: "problem_analysis" },
          { label: "Proposta di soluzioni concrete", value: "feasible_solutions" },
          { label: "Innovazione e approccio differenziante", value: "innovation_approach" },
          { label: "Capacità di prioritizzazione", value: "execution_prioritization" },
          { label: "Allineamento con valori e cultura aziendale", value: "culture_fit" },
          { label: "Altro", value: "other" }
        ],
        maxSelection: 3,
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