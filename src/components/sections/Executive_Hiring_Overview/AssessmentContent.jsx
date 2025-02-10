import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Target, 
  TrendingUp, 
  Users, 
  Zap, 
  Calendar, 
  Award, 
  Brain 
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

/* ----------------------------------------
 * 1) DATA CONSTANTS
 * ---------------------------------------- */
const TRANSLATIONS = {
  en: {
    header: {
      title: 'Technical Assessment',
      subtitle:
        'Our AI craft a series of tests focused on real-world execution, scaling, and strategic thinking. Deliver actual results rather than relying on theory to prove your leadership skills.',
      deadline: 'E.G. To be completed within 7 days',
    },
    modules: [
      {
        icon: Target,
        title: 'Execution Mastery',
        timeframe: '35 min',
        scenarios: [
          {
            problem:
              'Your best-selling product’s growth has unexpectedly stalled. You have 4 weeks and $50K to fix it.',
            task: 'Provide a detailed, day-by-day plan to diagnose and reignite growth.',
          },
          {
            problem:
              'A competitor has slashed prices by 70% in a market where you compete head-on.',
            task: 'Outline your immediate 24-hour response and short-term strategy.',
          },
        ],
      },
      {
        icon: TrendingUp,
        title: 'Scaling & Growth',
        timeframe: '20 min',
        scenarios: [
          {
            problem:
              'You have achieved product-market fit and just received $2M in funding in a winner-takes-all market.',
            task: "Map out a 12-week blitz-scaling plan to outpace competitors.",
          },
          {
            problem: 'Customer Acquisition Cost doubled in the past 30 days.',
            task: 'Diagnose the root cause and propose both quick fixes and long-term solutions.',
          },
        ],
      },
      {
        icon: Users,
        title: 'Team Leadership',
        timeframe: '20 min',
        scenarios: [
          {
            problem:
              'Your 15-person engineering squad has missed their last three deliverables.',
            task: "Identify the bottlenecks and propose corrective measures to restore momentum.",
          },
          {
            problem: 'You need to grow from 20 to 100 employees in six months.',
            task: 'Share a step-by-step hiring, onboarding, and culture-building strategy.',
          },
        ],
      },
      {
        icon: Zap,
        title: 'Crisis Management',
        timeframe: '25 min',
        scenarios: [
          {
            problem:
              'A major data breach compromised roughly 30% of user information.',
            task: "Outline your immediate 8-hour response, followed by a 2-week recovery plan.",
          },
          {
            problem: 'You have only 8 weeks of runway left, and revenue has stagnated.',
            task: 'Specify the drastic measures you’d take to sustain or pivot quickly.',
          },
        ],
      },
    ],
    scorecard: {
      title: 'Performance Scorecard',
      additionalMetrics: 'Additional Metrics',
    },
    lockedOverlay: {
      heading: 'Contact Us',
      message: 'For more information, contact us.',
      button: 'Get in Touch',
    },
    metrics: [
      {
        icon: Brain,
        title: 'Response Quality',
        score: '8.5/10',
        feedback: 'Insightful decisions backed by clear, actionable steps',
      },
      {
        icon: Target,
        title: 'Hard-Skills',
        score: '7.8/10',
        feedback: 'Balances long-term vision with immediate tactical needs',
      },
      {
        icon: Brain,
        title: 'Response Time',
        score: '9.2/10',
        feedback: 'Swift and decisive, with a strong understanding of impact',
      },
    ],
  },

  it: {
    header: {
      title: 'Test Assunzione Manager',
      subtitle:
        'Un test di esecuzione pratica, la scalabilità e il pensiero strategico. Dimostra risultati reali invece di affidarti solo alla teoria per confermare le tue capacità di leader.',
      deadline: 'E.G. A completarsi entro 7 giorni',
    },
    modules: [
      {
        icon: Target,
        title: 'Esecuzione Operativa',
        timeframe: '35 min',
        scenarios: [
          {
            problem:
              'La crescita del tuo prodotto di punta si è improvvisamente arrestata. Hai 4 settimane e 50.000€ per risolvere.',
            task: 'Fornisci un piano dettagliato giorno per giorno per diagnosticare e rilanciare la crescita.',
          },
          {
            problem:
              'Un concorrente ha tagliato i prezzi del 70% in un mercato in cui operate in modo diretto.',
            task: 'Definisci la tua risposta immediata nelle prossime 24 ore e la strategia a breve termine.',
          },
        ],
      },
      {
        icon: TrendingUp,
        title: 'Crescita e Scalabilità',
        timeframe: '20 min',
        scenarios: [
          {
            problem:
              'Hai raggiunto il product-market fit e appena ottenuto 2M€ in finanziamenti in un mercato “winner-takes-all”.',
            task: 'Elabora un piano di blitz-scaling di 12 settimane per superare la concorrenza.',
          },
          {
            problem: 'Il tuo Costo di Acquisizione Cliente è raddoppiato negli ultimi 30 giorni.',
            task: 'Individua la causa principale e proponi sia soluzioni rapide che correttivi a lungo termine.',
          },
        ],
      },
      {
        icon: Users,
        title: 'Leadership del Team',
        timeframe: '20 min',
        scenarios: [
          {
            problem:
              'Il tuo team di ingegneri di 15 persone ha mancato le ultime tre consegne.',
            task: 'Identifica i colli di bottiglia e proponi misure correttive per ripristinare la produttività.',
          },
          {
            problem: 'Hai bisogno di passare da 20 a 100 dipendenti in sei mesi.',
            task: 'Condividi una strategia passo passo per l’assunzione, l’onboarding e la costruzione di una cultura solida.',
          },
        ],
      },
      {
        icon: Zap,
        title: 'Gestione delle Crisi',
        timeframe: '25 min',
        scenarios: [
          {
            problem:
              'Una grave violazione dei dati ha compromesso circa il 30% delle informazioni degli utenti.',
            task: 'Definisci la risposta immediata nelle prime 8 ore, seguita da un piano di recupero di 2 settimane.',
          },
          {
            problem: 'Hai solo 8 settimane di autonomia finanziaria e i ricavi sono fermi.',
            task: 'Specifica le misure drastiche che adotteresti per resistere o riconvertirti velocemente.',
          },
        ],
      },
    ],
    scorecard: {
      title: 'Scheda di Performance',
      additionalMetrics: 'Metriche Aggiuntive',
    },
    lockedOverlay: {
      heading: 'Contattaci',
      message: 'Per maggiori informazioni, contattaci pure.',
      button: 'Scrivici',
    },
    metrics: [
      {
        icon: Brain,
        title: 'Qualità della Risposta',
        score: '8.5/10',
        feedback: 'Decisioni perspicaci supportate da passaggi chiari e azionabili',
      },
      {
        icon: Target,
        title: 'Competenze Tecniche',
        score: '7.8/10',
        feedback: 'Equilibra una visione a lungo termine con esigenze tattiche immediate',
      },
      {
        icon: Brain,
        title: 'Tempo di Risposta',
        score: '9.2/10',
        feedback: 'Veloce e deciso, con una forte comprensione dell\'impatto',
      },
    ],
  },
};

/* ----------------------------------------
 * 2) REUSABLE SMALL COMPONENTS
 * ---------------------------------------- */
const ScenarioItem = ({ problem, task }) => (
  <div className="space-y-2">
    <div className="text-sm sm:text-base md:text-lg text-white font-medium">
      {problem}
    </div>
    <div className="text-sm sm:text-base text-gray-400">{task}</div>
  </div>
);

const ModuleCard = ({ icon: Icon, title, timeframe, description, scenarios }) => (
  <Card className="bg-gray-900/30 backdrop-blur-sm rounded-none border-gray-800 hover:border-accent-500/50 transition-all duration-200">
    <CardHeader className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent-500/10 rounded-lg">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent-500" />
          </div>
          <CardTitle className="text-base sm:text-lg md:text-xl text-white">
            {title}
          </CardTitle>
        </div>
        <span className="text-sm text-gray-400">{timeframe}</span>
      </div>
      {description && (
        <p className="text-sm sm:text-base md:text-lg text-gray-300">
          {description}
        </p>
      )}
    </CardHeader>
    <CardContent className="space-y-4 sm:space-y-6">
      {scenarios.map((scenario, index) => (
        <ScenarioItem key={index} {...scenario} />
      ))}
    </CardContent>
  </Card>
);

/* ----------------------------------------
 * 3) MAIN SECTIONS
 * ---------------------------------------- */

const AssessmentModules = ({ modules }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
    {modules.map((module, index) => (
      <ModuleCard key={index} {...module} />
    ))}
  </div>
);

/* ----------------------------------------
 * 4) MAIN EXECUTIVE ASSESSMENT COMPONENT
 * ---------------------------------------- */
const ExecutiveAssessment = () => {
  const { language } = useLanguage();
  const content = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Deadline Banner */}
      <div className="bg-orange-500/10 rounded-lg p-4 mb-8 flex items-center gap-3">
        <Calendar className="w-5 h-5 text-orange-500 flex-shrink-0" />
        <p className="text-sm text-orange-500 font-medium">
          {content.header.deadline}
        </p>
      </div>
      {/* Header Section */}
      <div className="space-y-4 mb-8 sm:mb-12">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
          {content.header.title}
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl">
          {content.header.subtitle}
        </p>
      </div>
      {/* Modules Section */}
      <AssessmentModules modules={content.modules} />
    </div>
  );
};

export default ExecutiveAssessment;
