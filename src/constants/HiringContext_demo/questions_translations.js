import { useLanguage } from '@/context/LanguageContext';

export const hiring_contextQuestionsTranslations = {
  en: {
    questions: [
      {
        id: '1',
        section: "Company Information",
        question: "Add your company website",
        description: "We will use it to gather information about what you do, helping us create a more accurate hiring profile",
        type: "url",
        placeholder: "Please add your company website address here - e.g. https://www.mastrohr.com",
        validation: {
          required: true,
          type: 'url'
        }
      },
      {
        id: '2',
        section: "Growth Objectives",
        question: "What are your main growth objectives for the next 12 months?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Expand into new markets", value: "expand_new_markets" },
          { label: "Increase recurring revenue", value: "increase_revenue" },
          { label: "Improve efficiency of operations", value: "improve_efficiency" },
          { label: "Increase brand awareness", value: "increase_brand_awareness" },
          { label: "Engineer new products", value: "engineer_products" },
          { label: "Optimize margins", value: "optimize_margins" }
        ],
        maxSelection: 3,
        validation: {
          required: true
        }
      },
      {
        id: '3',
        section: "Team Competencies",
        question: "What skills or experiences are missing in your company?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Leadership and strategy", value: "strategic_management" },
          { label: "Hiring and talent management", value: "digital_transformation" },
          { label: "Commercial and business growth", value: "leadership_development" },
          { label: "Innovation and technology", value: "innovation_technology" },
          { label: "Marketing and communication", value: "marketing_development" },
          { label: "Operations and processes", value: "operations_process" },
          { label: "Finance and scalability", value: "finance_scalability" },
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
        section: "Company Challenges",
        question: "If you could solve one organizational problem tomorrow, what would it be?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Internal structure and processes", value: "structure_issues" },
          { label: "Market position consolidation", value: "market_positioning" },
          { label: "Growth and expansion", value: "growth_expansion" },
          { label: "Technology and automation", value: "technology_products" },
          { label: "Recruiting and talent management", value: "talent_management" },
          { label: "Company culture", value: "cultural_issues" },
          { label: "Client acquisition", value: "client_acquisition" },
          { label: "Cost optimization", value: "cost_optimization" },
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
        section: "Cultural Compatibility",
        question: "What do you look for to ensure cultural compatibility?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "We look for results-oriented managers", value: "results_oriented" },
          { label: "We look for innovation-oriented mindsets", value: "innovation_culture" },
          { label: "We look for people with a collaborative culture", value: "collaborative_culture" },
          { label: "We look for a manager who is a change agent", value: "change_agent" },
          { label: "We look for someone to strengthen our current culture", value: "strengthen_culture" }
        ],
        maxSelection: 2,
        validation: {
          required: true
        }
      },
      {
        id: '6',
        section: "Hiring Process",
        question: "What is the main obstacle slowing down your hiring process?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Difficulty finding candidates with the right skills", value: "talent_scarcity" },
          { label: "Selection process is too long and complex", value: "slow_hiring_process" },
          { label: "Lack of internal alignment on hiring goals", value: "misalignment_hiring_goals" },
          { label: "Difficulty convincing talent to choose our company", value: "low_employer_branding" },
          { label: "Limited budget to attract the best candidates", value: "budget_constraints" },
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
        section: "Hiring Mistakes",
        question: "What was the most costly mistake made in a recent hire?",
        type: "multiselect",
        options: [
          { label: "Hiring too quickly without proper evaluation", value: "rushed_hiring" },
          { label: "Underestimating cultural fit with the company", value: "cultural_mismatch" },
          { label: "Inadequate verification of technical or managerial skills", value: "poor_skill_check" },
          { label: "Waiting too long and losing the ideal candidate", value: "lost_candidate" },
          { label: "Not providing effective onboarding and losing the new hire", value: "poor_onboarding" },
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
        section: "Recruitment Optimization",
        question: "If you could improve one aspect of your hiring process, what would it be?",
        type: "multiselect",
        options: [
          { label: "Increase the quality of incoming candidates", value: "better_candidate_quality" },
          { label: "Speed up the selection process without losing effectiveness", value: "faster_hiring_process" },
          { label: "Improve evaluation of soft skills and cultural fit", value: "soft_skills_evaluation" },
          { label: "Make the company more attractive to top talent", value: "stronger_employer_branding" },
          { label: "Integrate software to optimize our recruiting processes", value: "recruitment_automation" },
          { label: "Other", value: "other" }
        ],
        maxSelection: 3,
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
        section: "Obiettivi di Crescita",
        question: "Quali sono i principali obiettivi di crescita per i prossimi 12 mesi?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Espansione in nuovi mercati", value: "expand_new_markets" },
          { label: "Incremento dei ricavi ricorrenti", value: "increase_revenue" },
          { label: "Miglioramento dell'efficienza operativa", value: "improve_efficiency" },
          { label: "Aumento della visibilità del nostro brand", value: "increase_brand_awareness" },
          { label: "Sviluppo di nuovi prodotti", value: "engineer_products" },
          { label: "Ottimizzazione dei margini", value: "optimize_margins" }
        ],
        maxSelection: 3,
        validation: {
          required: true
        }
      },
      {
        id: '3',
        section: "Competenze del Team",
        question: "Quali competenze o esperienze mancano nella vostra azienda?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Leadership e strategia", value: "strategic_management" },
          { label: "Hiring e talent management", value: "digital_transformation" },
          { label: "Commerciale e vendite", value: "leadership_development" },
          { label: "Innovazione e tecnologia", value: "innovation_technology" },
          { label: "Marketing e comunicazione", value: "marketing_development" },
          { label: "Operations e processi", value: "operations_process" },
          { label: "Finanza e scalabilità", value: "finance_scalability" },
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
        section: "Sfide Aziendali",
        question: "Se potessi risolvere un solo problema organizzativo domani, quale sarebbe?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Struttura e processi interni", value: "structure_issues" },
          { label: "Consolidamento del posizionamento di mercato", value: "market_positioning" },
          { label: "Crescita ed espansione", value: "growth_expansion" },
          { label: "Tecnologia e automazione", value: "technology_products" },
          { label: "Recruiting e gestione del talento", value: "talent_management" },
          { label: "Cultura aziendale", value: "cultural_issues" },
          { label: "Acquisizione clienti", value: "client_acquisition" },
          { label: "Ottimizzazione costi", value: "cost_optimization" },
          { label: "Altro", value: "other" }
        ],
        maxSelection: 3,
        maxLength: 150,
        validation: {
          required: true
        }
      },
      {
        id: '5',
        section: "Compatibilità Culturale",
        question: "Cosa cerchi per garantire compatibilità con la cultura aziendale?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Cerchiamo manager orientati ai risultati", value: "results_oriented" },
          { label: "Cerchiamo un manager con mentalità orientata all'innovazione", value: "innovation_culture" },
          { label: "Cerchiamo un leader con una cultura collaborativa", value: "collaborative_culture" },
          { label: "Cerchiamo un agente del cambiamento", value: "change_agent" },
          { label: "Cerchiamo qualcuno che rafforzi la cultura attuale", value: "strengthen_culture" }
        ],
        maxSelection: 2,
        validation: {
          required: true
        }
      },
      {
        id: '6',
        section: "Processo di Hiring",
        question: "Qual è il principale ostacolo che rallenta le vostre assunzioni?",
        type: "multiselect",
        multiSelectHint: true,
        options: [
          { label: "Difficoltà nel trovare candidati con le giuste competenze", value: "talent_scarcity" },
          { label: "Processo di selezione troppo lungo e complesso", value: "slow_hiring_process" },
          { label: "Mancanza di allineamento interno sugli obiettivi di assunzione", value: "misalignment_hiring_goals" },
          { label: "Difficoltà nel convincere i talenti a scegliere la nostra azienda", value: "low_employer_branding" },
          { label: "Budget limitato per attrarre i migliori candidati", value: "budget_constraints" },
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
        section: "Errori di Hiring",
        question: "Qual è l’errore più costoso che avete fatto in una recente assunzione?",
        type: "multiselect",
        options: [
          { label: "Assumere troppo velocemente senza un’adeguata valutazione", value: "rushed_hiring" },
          { label: "Sottovalutare l’allineamento culturale con l’azienda", value: "cultural_mismatch" },
          { label: "Non verificare adeguatamente le competenze tecniche o manageriali", value: "poor_skill_check" },
          { label: "Aspettare troppo a lungo e perdere il candidato ideale", value: "lost_candidate" },
          { label: "Non fornire un onboarding efficace e perdere il nuovo assunto", value: "poor_onboarding" },
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
        section: "Ottimizzazione del Recruiting",
        question: "Se doveste migliorare un solo aspetto del vostro processo di hiring, quale sarebbe?",
        type: "multiselect",
        options: [
          { label: "Aumentare la qualità dei candidati in ingresso", value: "better_candidate_quality" },
          { label: "Velocizzare il processo di selezione senza perdere efficacia", value: "faster_hiring_process" },
          { label: "Migliorare la capacità di valutazione di soft skills e fit culturale", value: "soft_skills_evaluation" },
          { label: "Rendere più attraente l’azienda per i migliori talenti", value: "stronger_employer_branding" },
          { label: "Integrare software per ottimizzare il recruiting", value: "recruitment_automation" },
          { label: "Altro", value: "other" }
        ],
        maxSelection: 3,
        maxLength: 150,
        validation: {
          required: true
        }
      }
    ]
  }
};

export const useHiringContextQuestions = () => {
  const { language } = useLanguage();
  return hiring_contextQuestionsTranslations[language].questions;
};
