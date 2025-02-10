// CandidateAssessment.jsx
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Brain, Star, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext"; // Import your language context

const CandidateAssessment = () => {
  const { language } = useLanguage(); // Grab current language from context
  const [expandedId, setExpandedId] = useState(null);

  // Define your candidates in both English and Italian
  const candidateData = {
    en: [
      {
        id: 1,
        name: "Sarah Chen",
        role: "Chief Product Officer",
        currentCompany: "FinTech Innovation Labs",
        match: 92,
        executiveAssessment: {
          score: 94,
          strengths: "Exceptional strategic thinking and execution capabilities",
          highlights: "Successfully led complex digital transformation projects",
          areas:
            "Communication is direct and effective. Shows strong ability to navigate ambiguous situations.",
        },
        technicalAssessment: {
          score: 90,
          notes: "Deep understanding of distributed systems and scalable architecture",
          expertise: "Product scaling, Technical architecture, Data-driven decisions",
          recommendation:
            "Strong technical background with proven ability to lead engineering teams",
        },
      },
      {
        id: 2,
        name: "Michael Torres",
        role: "VP of Engineering",
        currentCompany: "Global Tech Solutions",
        match: 88,
        executiveAssessment: {
          score: 86,
          strengths: "Strong analytical mindset with focus on operational excellence",
          highlights: "Track record of successful product launches and team scaling",
          areas: "Demonstrated ability to align technical decisions with business goals",
        },
        technicalAssessment: {
          score: 92,
          notes: "Excellent system design skills and modern tech stack knowledge",
          expertise: "Cloud architecture, Team scaling, Technical strategy",
          recommendation:
            "Highly capable technical leader with strong engineering principles",
        },
      },
      {
        id: 3,
        name: "Emma Patel",
        role: "Head of Product & Engineering",
        currentCompany: "Innovation Works",
        match: 87,
        executiveAssessment: {
          score: 89,
          strengths: "Innovative problem-solver with strong leadership presence",
          highlights: "Proven track record in high-growth environments",
          areas: "Excellent at balancing technical debt with business needs",
        },
        technicalAssessment: {
          score: 88,
          notes: "Strong focus on scalable architecture and engineering practices",
          expertise: "System design, Engineering processes, Technical leadership",
          recommendation: "Well-rounded technical leader with strong product sense",
        },
      },
    ],
    it: [
      {
        id: 1,
        name: "Sarah Chen",
        role: "Direttore del Prodotto",
        currentCompany: "FinTech Innovation Labs",
        match: 92,
        executiveAssessment: {
          score: 94,
          strengths: "Eccezionale capacità di pensiero strategico ed esecuzione",
          highlights: "Ha guidato con successo progetti di trasformazione digitale complessi",
          areas:
            "La comunicazione è diretta ed efficace. Mostra una forte capacità di navigare in situazioni ambigue.",
        },
        technicalAssessment: {
          score: 90,
          notes: "Comprensione profonda dei sistemi distribuiti e dell’architettura scalabile",
          expertise: "Scalabilità dei prodotti, Architettura tecnica, Decisioni basate sui dati",
          recommendation:
            "Solida preparazione tecnica con comprovata capacità di guidare i team di ingegneria",
        },
      },
      {
        id: 2,
        name: "Michael Torres",
        role: "VP di Ingegneria",
        currentCompany: "Global Tech Solutions",
        match: 88,
        executiveAssessment: {
          score: 86,
          strengths: "Forte mentalità analitica con attenzione all'eccellenza operativa",
          highlights: "Successi nei lanci di prodotti e nell'espansione del team",
          areas: "Capacità dimostrata di allineare le decisioni tecniche con gli obiettivi aziendali",
        },
        technicalAssessment: {
          score: 92,
          notes: "Eccellenti competenze di progettazione di sistemi e tecnologie moderne",
          expertise: "Architettura Cloud, Espansione del team, Strategia tecnica",
          recommendation:
            "Leader tecnico altamente capace con solidi principi di ingegneria",
        },
      },
      {
        id: 3,
        name: "Emma Patel",
        role: "Responsabile di Prodotto e Ingegneria",
        currentCompany: "Innovation Works",
        match: 87,
        executiveAssessment: {
          score: 89,
          strengths: "Innovativa risolutrice di problemi con forte leadership",
          highlights: "Dimostrata esperienza in ambienti ad alta crescita",
          areas: "Eccellente nel bilanciare il debito tecnico con le esigenze aziendali",
        },
        technicalAssessment: {
          score: 88,
          notes: "Forte attenzione all'architettura scalabile e alle pratiche di ingegneria",
          expertise: "Progettazione di sistemi, Processi di ingegneria, Leadership tecnica",
          recommendation:
            "Leader tecnico completo con un forte senso del prodotto",
        },
      },
    ],
  };

  // Pick the data based on the current language. Defaults to English if not found.
  const candidates = candidateData[language] || candidateData.en;

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    // Placeholder - the link is for display only
  };

  return (
    <div className="w-full max-w-4xl border border-gray-500/40 mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Heading */}
      <header className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
          {language === "it" ? "I 3 Migliori Candidati Pre-Selezionati" : "Top 3 Pre-Screened Candidates"}
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          {language === "it"
            ? "Risultati completi della valutazione per la selezione finale"
            : "Comprehensive assessment results for final selection"}
        </p>
      </header>

      {/* Candidate Cards */}
      <div className="space-y-4">
        {candidates.map((candidate) => {
          const isExpanded = expandedId === candidate.id;
          return (
            <Card
              key={candidate.id}
              className="border-gray-800/40 rounded-none"
            >
              <CardHeader className="p-0">
                <button
                  type="button"
                  onClick={() => toggleExpand(candidate.id)}
                  aria-expanded={isExpanded}
                  className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 p-4 sm:p-6 text-left bg-transparent"
                >
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-base sm:text-lg text-white">
                      {candidate.name}
                    </CardTitle>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {candidate.role} • {candidate.currentCompany}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Badge className="bg-accent-500/10 text-accent-500 text-xs sm:text-sm">
                      {candidate.match}% {language === "it" ? "Corrispondenza" : "Match"}
                    </Badge>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    )}
                  </div>
                </button>
              </CardHeader>

              {isExpanded && (
                <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    {/* Executive Assessment */}
                    <section className="flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-accent-500" />
                        <h3 className="text-white font-medium text-sm sm:text-base">
                          {language === "it" ? "Valutazione Esecutiva" : "Executive Assessment"}
                        </h3>
                      </div>
                      <div className="bg-gray-800/30 rounded-lg p-4 space-y-3 flex flex-col flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">
                            {language === "it" ? "Punteggio di Valutazione" : "Assessment Score"}
                          </span>
                          <Badge className="bg-accent-500/10 text-accent-500 text-xs sm:text-sm">
                            {candidate.executiveAssessment.score}/100
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm text-gray-300">
                          <p>{candidate.executiveAssessment.strengths}</p>
                          <p>{candidate.executiveAssessment.areas}</p>
                        </div>
                      </div>
                    </section>

                    {/* Technical Assessment */}
                    <section className="flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-accent-500" />
                        <h3 className="text-white font-medium text-sm sm:text-base">
                          {language === "it" ? "Revisione Tecnica" : "Technical Review"}
                        </h3>
                      </div>
                      <div className="bg-gray-800/30 rounded-lg p-4 space-y-3 flex flex-col flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">
                            {language === "it" ? "Punteggio Tecnico" : "Technical Score"}
                          </span>
                          <Badge className="bg-accent-500/10 text-accent-500 text-xs sm:text-sm">
                            {candidate.technicalAssessment.score}/100
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm text-gray-300">
                          <p>{candidate.technicalAssessment.notes}</p>
                          <p>{candidate.technicalAssessment.recommendation}</p>
                        </div>
                      </div>
                    </section>
                  </div>

                  {/* Profile Link */}
                  <div className="mt-6 pt-4 border-t border-gray-800">
                    <button
                      onClick={handleProfileClick}
                      className="inline-flex items-center gap-2 text-accent-500 hover:text-accent-400 transition-colors text-sm"
                    >
                      <FileText className="w-4 h-4" />
                      {language === "it" ? "Visualizza Profilo Completo del Candidato" : "View Complete Candidate Profile"}
                    </button>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CandidateAssessment;
