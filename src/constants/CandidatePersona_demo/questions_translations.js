import { useLanguage } from '@/context/LanguageContext';

export const candidate_personaQuestionsTranslations = {
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
        section: "Job Information",
        question: "What is the official title for this position?",
        description: "Please provide the specific job title to ensure clarity in the hiring process.",
        type: "text",
        placeholder: "e.g. Senior Product Manager",
        validation: {
          required: true,
          type: 'text'
        }
      },
      {
        id: '3',
        section: "Responsibilities",
        question: "Have you clearly listed the main tasks and activities of the role?",
        type: "choice",
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" }
        ],
        validation: {
          required: true
        }
      },
      {
        id: '4',
        section: "Responsibilities",
        question: "Will this role involve managing teams?",
        description: "If yes, please specify the size and structure of the teams (e.g., number of direct reports, departments managed).",
        type: "choice",
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" }
        ],
        validation: {
          required: true
        },
        conditional: {
          showWhen: "yes",
          type: "text",
          placeholder: "e.g., 5 direct reports, managing the marketing department"
        }
      },
      {
        id: '5',
        section: "Requirements",
        question: "Do you require any educational qualification for this position?",
        description: "If yes, please specify any required degrees, certifications, or educational backgrounds",
        type: "choice",
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" }
        ],
        validation: {
          required: true
        },
        conditional: {
          showWhen: "yes",
          type: "text",
          placeholder: "e.g., Bachelor's degree in Business Administration, PMP Certification"
        }
      },
      {
        id: '6',
        section: "Requirements",
        question: "How many years of professional experience are required and in which specific sectors?",
        description: "Specify the required years of experience and relevant sectors or roles",
        type: "text",
        placeholder: "e.g. 5+ years in product management in the technology sector",
        validation: {
          required: true
        }
       },
       {
        id: '7',
        section: "Technical Competencies",
        question: "What technical or digital competencies are essential for the role's success?",
        description: "Specify required technical skills, platforms, and systems proficiency levels needed to drive digital initiatives",
        type: "text",
        placeholder: "e.g. Experience with enterprise SaaS platforms, data analytics tools, digital transformation projects",
        validation: {
          required: true
        }
       },
       {
        id: '8',
        section: "Work Environment",
        question: "What is the expected work arrangement for this position?",
        description: "Please specify the work location requirements and any travel expectations",
        type: "choice",
        options: [
          { label: "Hybrid with travel", value: "hybrid" },
          { label: "Remote with quarterly meetings", value: "remote" },
          { label: "Office-based", value: "on_site" }
        ],
        validation: {
          required: true
        }
       },
       {
        id: '9',
        section: "Employment Terms",
        question: "What is the intended employment arrangement?",
        description: "Specify the employment terms and any flexibility considerations",
        type: "choice",
        options: [
          { label: "Full-time permanent", value: "full_time" },
          { label: "Contract-based", value: "contract" },
          { label: "Part-time executive", value: "part_time" }
        ],
        validation: {
          required: true
        }
       },
       {
        id: '10',
        section: "Performance Objectives",
        question: "What are the key performance indicators (KPIs) for this role?",
        description: "Detail the specific measurable objectives and expected outcomes",
        type: "choice",
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" }
        ],
        validation: {
          required: true
        },
        conditional: {
          showWhen: "yes",
          type: "text",
          placeholder: "e.g. Increase market share by 15%, achieve 25% revenue growth, launch strategic initiatives"
        }
       },
       {
        id: '11',
        section: "Compensation Package",
        question: "What is the executive compensation structure for this position?",
        description: "Outline the complete compensation package including base salary, bonuses, equity, and benefits",
        type: "text",
        placeholder: "e.g. Base salary range $200-250K, performance bonus up to 30%, equity package, executive benefits",
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
        description: "Utilizzeremo queste informazioni per comprendere meglio la vostra attività e creare un profilo di assunzione più accurato.",
        type: "url",
        placeholder: "Inserisci l'indirizzo del sito web aziendale - es. https://www.mastrohr.com",
        validation: {
          required: true,
          type: 'url'
        }
      },
      {
        id: '2',
        section: "Informazioni sulla Posizione",
        question: "Qual è il titolo ufficiale della posizione?",
        description: "Indica il titolo specifico della posizione per garantire chiarezza nel processo di selezione.",
        type: "text",
        placeholder: "es. Senior Product Manager",
        validation: {
          required: true,
          type: 'text'
        }
      },
      {
        id: '3',
        section: "Responsabilità",
        question: "Hai definito chiaramente le principali mansioni e attività del ruolo?",
        type: "choice",
        options: [
          { label: "Sì", value: "yes" },
          { label: "No", value: "no" }
        ],
        validation: {
          required: true
        }
      },
      {
        id: '4',
        section: "Responsabilità",
        question: "Questo ruolo prevede la gestione di team?",
        description: "Se sì, specifica la dimensione e la struttura dei team (es. numero di riporti diretti, dipartimenti gestiti).",
        type: "choice",
        options: [
          { label: "Sì", value: "yes" },
          { label: "No", value: "no" }
        ],
        validation: {
          required: true
        },
        conditional: {
          showWhen: "yes",
          type: "text",
          placeholder: "es. 5 riporti diretti, gestione del dipartimento marketing"
        }
      },
      {
        id: '5',
        section: "Requisiti",
        question: "Sono richiesti titoli di studio specifici per questa posizione?",
        description: "Se sì, specifica i titoli di studio, le certificazioni o il background formativo richiesto",
        type: "choice",
        options: [
          { label: "Sì", value: "yes" },
          { label: "No", value: "no" }
        ],
        validation: {
          required: true
        },
        conditional: {
          showWhen: "yes",
          type: "text",
          placeholder: "es. Laurea in Economia Aziendale, Certificazione PMP"
        }
      },
      {
        id: '6',
        section: "Requisiti",
        question: "Quanti anni di esperienza professionale sono richiesti e in quali settori specifici?",
        description: "Specifica gli anni di esperienza richiesti e i settori o ruoli pertinenti",
        type: "text",
        placeholder: "es. 5+ anni di esperienza nella gestione prodotto nel settore tecnologico",
        validation: {
          required: true
        }
      },
      {
        id: '7',
        section: "Competenze Tecniche",
        question: "Quali competenze tecniche o digitali sono essenziali per il successo nel ruolo?",
        description: "Specifica le competenze tecniche, le piattaforme e i livelli di padronanza dei sistemi necessari per guidare le iniziative digitali",
        type: "text",
        placeholder: "es. Esperienza con piattaforme SaaS enterprise, strumenti di analisi dati, progetti di trasformazione digitale",
        validation: {
          required: true
        }
      },
      {
        id: '8',
        section: "Ambiente di Lavoro",
        question: "Quale modalità di lavoro è prevista per questa posizione?",
        description: "Specifica i requisiti di sede e le eventuali necessità di trasferta",
        type: "choice",
        options: [
          { label: "Ibrido con trasferte", value: "hybrid" },
          { label: "Remoto con incontri trimestrali", value: "remote" },
          { label: "In sede", value: "on_site" }
        ],
        validation: {
          required: true
        }
      },
      {
        id: '9',
        section: "Termini di Impiego",
        question: "Qual è la tipologia contrattuale prevista?",
        description: "Specifica le condizioni contrattuali e le eventuali flessibilità previste",
        type: "choice",
        options: [
          { label: "Tempo indeterminato", value: "full_time" },
          { label: "Contratto a termine", value: "contract" },
          { label: "Executive part-time", value: "part_time" }
        ],
        validation: {
          required: true
        }
      },
      {
        id: '10',
        section: "Obiettivi di Performance",
        question: "Quali sono i principali indicatori di performance (KPI) per questo ruolo?",
        description: "Dettaglia gli obiettivi specifici misurabili e i risultati attesi",
        type: "choice",
        options: [
          { label: "Sì", value: "yes" },
          { label: "No", value: "no" }
        ],
        validation: {
          required: true
        },
        conditional: {
          showWhen: "yes",
          type: "text",
          placeholder: "es. Incremento quota di mercato del 15%, crescita del fatturato del 25%, lancio di iniziative strategiche"
        }
      },
      {
        id: '11',
        section: "Pacchetto Retributivo",
        question: "Qual è la struttura retributiva prevista per questa posizione dirigenziale?",
        description: "Delinea il pacchetto retributivo completo includendo stipendio base, bonus, equity e benefit",
        type: "text",
        placeholder: "es. RAL €200-250K, bonus performance fino al 30%, piano di equity, benefit dirigenziali",
        validation: {
          required: true
        }
      }
    ]
  }
};

export const useCandidatePersonaQuestions = () => {
  const { language } = useLanguage();
  return candidate_personaQuestionsTranslations[language].questions;
};
