// src/components/ui/AccordionItem.jsx
import React from 'react';
import { ChevronDown } from 'lucide-react';

const AccordionItem = ({ title, content, isActive, onClick, link }) => (
  <div className="border-b border-gray-200">
    <button
      className="w-full text-left flex justify-between items-center py-6 group"
      onClick={onClick}
    >
      <h3 className="text-xl font-semibold group-hover:text-indigo-600 transition-colors">{title}</h3>
      <ChevronDown className={`transform transition-transform duration-300 ${isActive ? 'rotate-180' : ''} 
      text-indigo-600`} />
    </button>
    <div
      className={`grid transition-all duration-300 ${
        isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="overflow-hidden">
        <div className="pb-6 space-y-4">
          <p className="text-gray-600">{content}</p>
          <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center 
          group">
            {link}
            <span className="transform transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default AccordionItem;