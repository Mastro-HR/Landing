import React, { memo, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot,
  Brain,
  Users,
  Target,
  CheckCircle,
  Search
} from "lucide-react";
import { useAssessmentTranslation } from "./Translations";
import { useLanguage } from "@/context/LanguageContext";

// A single metric item inside an expanded step
const MetricItem = memo(({ icon: Icon, title, description, type }) => (
  <div className="bg-transparent border border-gray-800/20 rounded-lg p-4">
    <div className="flex items-start gap-4">
      <div className="p-2.5 rounded-lg bg-accent-500/10 flex-shrink-0">
        <Icon className={`w-5 h-5 ${type === "ai" ? "text-blue-500" : "text-emerald-500"}`} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-white mb-1">{title}</h4>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
));

/**
 * A single "Step" card in the pipeline.
 * - Expandable to show "metrics" on click
 */
const StepCard = memo(({ step, isActive, onClick, phaseLabel }) => {
  const contentVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer overflow-hidden transition-all duration-200 rounded-lg 
        ${isActive
          ? "border-l-4 border-l-white border border-gray-800/30"
          : "border border-gray-800/30 hover:bg-gray-800/25"
        }`}
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="flex-1 min-w-0">
            <span className="text-sm text-accent-500 font-medium">
              {`${phaseLabel} ${step.number}`}
            </span>
            <h3 className="text-base sm:text-lg font-semibold text-white mt-1 mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              key={`metrics-${step.number}`}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4"
            >
              {step.metrics.map((metric, index) => (
                <MetricItem
                  key={`${step.number}-${index}`}
                  icon={getIconComponent(metric.icon)}
                  type={metric.type}
                  title={metric.title}
                  description={metric.description}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

const getIconComponent = (iconName) => {
  const iconMap = {
    Bot,
    Brain,
    Search,
    Target,
    CheckCircle,
    Users
  };
  return iconMap[iconName] || Bot;
};

const HiringPipeline = () => {
  const { language } = useLanguage();
  const { t, getMetrics } = useAssessmentTranslation(language);
  const [activeStep, setActiveStep] = useState(1);

  const getStepIcon = useCallback((stepNumber) => {
    const icons = {
      1: <Bot className="w-6 h-6" />,
      2: <Brain className="w-6 h-6" />,
      3: <Users className="w-6 h-6" />
    };
    return icons[stepNumber];
  }, []);

  const getStepData = useCallback((stage, number) => ({
    number,
    title: t(`pipeline.stages.${stage}.title`),
    description: t(`pipeline.stages.${stage}.description`),
    metrics: getMetrics(stage),
    icon: getStepIcon(number)
  }), [t, getMetrics, getStepIcon]);

  const steps = useMemo(
    () => [
      getStepData("profile", 1),
      getStepData("expert", 2),
      getStepData("evaluation", 3)
    ],
    [getStepData]
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-left space-y-2 sm:space-y-4 mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {t("pipeline.title")}
        </h1>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
          {t("pipeline.description")}
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step) => (
          <StepCard
            key={step.number}
            step={step}
            isActive={activeStep === step.number}
            onClick={() => setActiveStep(step.number)}
            phaseLabel={t("pipeline.phaseLabel")}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(HiringPipeline);
