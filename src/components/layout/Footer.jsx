import React from 'react';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-gradient-to-t from-teal-900 to-teal-800 text-primary-50 py-12">
    <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="space-y-2 mb-4 md:mb-0">
          <h3 className="text-xl font-bold">Mastro</h3>
          <p className="text-primary-100/80 text-sm leading-relaxed">
            Hire Right. Grow Faster
          </p>
        </div>
        <div className="flex space-x-4">
          <a
            href="https://www.linkedin.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-50 hover:text-primary-100 transition-colors">
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://twitter.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-50 hover:text-primary-100 transition-colors">
            <FaTwitter size={24} />
          </a>
        </div>
      </div>

      <div className="border-t border-primary-50/10 pt-6">
        <p className="text-center text-sm text-primary-100/60">
          © {new Date().getFullYear()} Mastro. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;