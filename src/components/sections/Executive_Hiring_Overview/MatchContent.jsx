import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Medal, Brain } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const CandidateFlow = () => {
  const { language } = useLanguage();
  const isItalian = language === "it";
  const [counter, setCounter] = useState(0);

  const content = {
    left: {
      title: isItalian ? "10.000+ Candidati" : "10,000+ Candidates",
      desc: isItalian
        ? "Accesso istantaneo a un vasto bacino di talenti globali qualificati"
        : "Instant access to a vast pool of qualified global talent",
      stat: isItalian ? "Candidati Analizzati" : "Candidates Analyzed"
    },
    center: {
      title: isItalian ? "Analisi AI" : "AI Analysis",
      features: isItalian
        ? [
            "Analisi delle competenze tecniche",
            "Valutazione del fit culturale",
            "Matching con esperti del settore"
          ]
        : [
            "Hard-skill analysis",
            "Cultural fit assessment",
            "Matching with industry-experts"
          ],
      stat: isItalian ? "Parametri Analizzati" : "Parameters Analyzed"
    },
    right: {
      title: isItalian ? "I 3 Migliori Match" : "Top 3 Perfect Matches",
      desc: isItalian
        ? "Selezione garantita dei candidati più qualificati e compatibili"
        : "Guaranteed selection of the most qualified and compatible candidates",
      stat: isItalian ? "Precisione del Match" : "Match Accuracy"
    },
    contact: {
      text: isItalian
        ? "Stai cercando l'executive giusto per la tua azienda?"
        : "Are you looking for the right executive to join your business?",
      button: isItalian ? "Contattaci" : "Contact Us"
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => (prev + 1) % 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row items-stretch justify-between md:divide-x divide-gray-800 gap-8"
      >
        {/* Large Candidate Pool */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center text-center md:w-1/3 p-6 md:px-8 first:md:pr-12 last:md:pl-12"
        >
          <div className="mb-6 p-4 bg-blue-500/10 rounded-full">
            <Users className="w-10 h-10 text-blue-400" />
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-4">
            {content.left.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mb-6">
            {content.left.desc}
          </p>
          <div className="mt-auto pt-4 border-t border-gray-800 w-full">
            <div className="text-3xl font-bold text-blue-400">10K+</div>
            <div className="text-sm text-gray-400">{content.left.stat}</div>
          </div>
        </motion.div>

        {/* AI Algorithm */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center text-center md:w-1/3 p-6 relative"
        >
          <div className="mb-6 p-4 bg-accent-500/10 rounded-full">
            <Brain className="w-10 h-10 text-accent-500" />
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-4">
            {content.center.title}
          </h2>
          <ul className="space-y-2 text-left mb-6">
            {content.center.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-sm sm:text-base text-gray-300">
                <div className="w-2 h-2 bg-accent-500 rounded-full mr-2" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-4 border-t border-gray-800 w-full">
            <div className="text-3xl font-bold text-accent-500">150+</div>
            <div className="text-sm text-gray-400">{content.center.stat}</div>
          </div>
        </motion.div>

        {/* Top 3 Matches */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center text-center md:w-1/3 p-6"
        >
          <div className="mb-6 p-4 bg-green-500/10 rounded-full">
            <Medal className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-4">
            {content.right.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mb-6">
            {content.right.desc}
          </p>
          <div className="mt-auto pt-4 border-t border-gray-800 w-full">
            <div className="text-3xl font-bold text-green-400">90.5%</div>
            <div className="text-sm text-gray-400">{content.right.stat}</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-16 text-center"
      >
        <motion.div variants={itemVariants} className="space-y-6">
          <p className="text-lg sm:text-xl text-gray-300">
            {content.contact.text}
          </p>
          <Link 
            to="/contact-sales"
            className="w-full sm:w-auto border border-gray-500/40 hover:bg-gray-500/10 text-white px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
            {content.contact.button}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default memo(CandidateFlow);