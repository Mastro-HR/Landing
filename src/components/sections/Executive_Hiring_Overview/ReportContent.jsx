import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  Target, 
  Users, 
  Brain, 
  ArrowRight,
  LineChart as ChartIcon,
  Shield,
  Activity
} from 'lucide-react';
import { useAssessmentTranslation } from './Translations';
import { useLanguage } from '@/context/LanguageContext';

const MetricItem = memo(({ icon: Icon, title, description, type }) => (
  <div className="bg-transparent border border-gray-800/20 rounded-lg p-4 space-y-2 hover:border-accent-500/20 transition-colors duration-200">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-accent-500/10">
        <Icon className={`w-5 h-5 ${type === 'expertise' ? 'text-blue-500' : 'text-emerald-500'}`} />
      </div>
      <h4 className="text-sm font-medium text-white">{title}</h4>
    </div>
    <p className="text-xs text-gray-400 leading-relaxed ml-12">{description}</p>
  </div>
));

const StepIndicator = memo(({ step, isActive, onClick, t }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    className={`w-full p-3 transition-all duration-200 ${
      isActive 
        ? 'bg-accent-500/10 border-b border-accent-500/30' 
        : 'bg-gray-800/30 border-b border-gray-800/30 hover:bg-gray-800/40'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
        isActive ? 'bg-accent-500 text-white' : 'bg-gray-800/70 text-gray-400'
      }`}>
        {step.icon}
      </div>
      <div className="flex-1 text-left">
        <span className="block text-xs text-gray-400">
          {`${t('pipeline.phaseLabel')} ${step.number}`}
        </span>
        <span className="block text-sm font-medium text-white mt-0.5">
          {step.title}
        </span>
      </div>
    </div>
  </motion.button>
));

const StepContent = memo(({ step, t }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-4 sm:p-6 space-y-6"
  >
    <CardHeader className="space-y-3 p-0">
      <div className="flex items-center gap-3">
        <div className="space-y-1">
          <p className="text-sm text-gray-300">
            {step.description}
          </p>
        </div>
      </div>
    </CardHeader>
    
    <CardContent className="space-y-8 p-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {step.metrics.map((metric, index) => (
          <MetricItem
            key={index}
            icon={getIconComponent(metric.icon)}
            type={metric.type}
            title={metric.title}
            description={metric.description}
          />
        ))}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">
          {t('pipeline.processSteps')}
        </h3>
        <div className="space-y-3">
          {step.steps.map((stepItem, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 border-b border-gray-500/40"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-500/10 flex items-center justify-center mt-0.5">
                <span className="text-sm font-medium text-accent-500">{index + 1}</span>
              </div>
              <p className="text-sm text-gray-300 flex-1">{stepItem}</p>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </motion.div>
));

// Helper function to get the correct icon component
const getIconComponent = (iconName) => {
  const iconMap = {
    Brain: Brain,
    Target: Target,
    ChartIcon: ChartIcon,
    Shield: Shield,
    Activity: Activity
  };
  return iconMap[iconName] || Brain;
};

const ExecutiveAssessmentPipeline = () => {
  const { language } = useLanguage();
  const { t, getMetrics } = useAssessmentTranslation(language);
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: t('pipeline.stages.profile.title'),
      icon: <Target className="w-6 h-6" />,
      description: t('pipeline.stages.profile.description'),
      steps: t('pipeline.stages.profile.steps'),
      metrics: getMetrics('profile')
    },
    {
      number: 2,
      title: t('pipeline.stages.expert.title'),
      icon: <Users className="w-6 h-6" />,
      description: t('pipeline.stages.expert.description'),
      steps: t('pipeline.stages.expert.steps'),
      metrics: getMetrics('expert')
    },
    {
      number: 3,
      title: t('pipeline.stages.evaluation.title'),
      icon: <Brain className="w-6 h-6" />,
      description: t('pipeline.stages.evaluation.description'),
      steps: t('pipeline.stages.evaluation.steps'),
      metrics: getMetrics('evaluation')
    }
  ];

  return (
    <div className="max-w-5xl border border-gray-500/40 mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-left space-y-3 mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          {t('pipeline.title')}
        </h1>
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl">
          {t('pipeline.description')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {steps.map((step) => (
          <StepIndicator
            key={step.number}
            step={step}
            isActive={activeStep === step.number}
            onClick={() => setActiveStep(step.number)}
            t={t}
          />
        ))}
      </div>

      <Card className="border-gray-800/30 rounded-none">
        <AnimatePresence mode="wait">
          <StepContent 
            key={activeStep} 
            step={steps.find(s => s.number === activeStep)}
            t={t}
          />
        </AnimatePresence>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setActiveStep(prev => Math.max(prev - 1, 1))}
          disabled={activeStep === 1}
          className={`px-6 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors duration-200 w-full sm:w-auto ${
            activeStep === 1 
              ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed' 
              : 'bg-gray-800/50 text-white hover:bg-gray-800/70'
          }`}
        >
          {t('pipeline.navigation.previous')}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setActiveStep(prev => Math.min(prev + 1, steps.length))}
          disabled={activeStep === steps.length}
          className={`px-6 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors duration-200 w-full sm:w-auto ${
            activeStep === steps.length
              ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
              : 'border border-accent-500/40 hover:bg-accent-500/10 text-accent-500'
          }`}
        >
          {activeStep === steps.length 
            ? t('pipeline.navigation.complete')
            : t('pipeline.navigation.next')}
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default memo(ExecutiveAssessmentPipeline);