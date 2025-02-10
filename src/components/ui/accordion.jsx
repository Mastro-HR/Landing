import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

// Root Accordion Component
const Accordion = AccordionPrimitive.Root;

// Accordion Item
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={`
      mb-4 rounded-lg bg-gray-900/30 border border-gray-800/50 overflow-hidden
      transition-all duration-200 ease-in-out hover:border-gray-700/50 ${className}
    `}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

// Accordion Trigger
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={`
        group flex w-full items-center justify-between text-base font-medium
        px-4 py-4 transition-all duration-200 ease-in-out hover:bg-gray-800/30
        data-[state=open]:bg-gray-800/40 focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-accent-500 ${className}
      `}
      {...props}
    >
      {children}
      <ChevronDown
        className={`
          h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ease-in-out
          group-hover:text-gray-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-accent-400
        `}
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = 'AccordionTrigger';

// Accordion Content
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={`
      overflow-hidden transition-all duration-300 ease-in-out
      data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down
      data-[state=closed]:opacity-0 data-[state=open]:opacity-100
    `}
    {...props}
  >
    <div className={`px-4 py-4 border-t border-gray-800/50 bg-gray-900/20 text-gray-300 ${className}`}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
