// HiringContext_Analysis/MobileMenu.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';

const MobileMenu = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-30 bg-gray-900/50">
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-lg">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[calc(100vh-5rem)]">
          {children}
        </div>
      </div>
    </div>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default MobileMenu;