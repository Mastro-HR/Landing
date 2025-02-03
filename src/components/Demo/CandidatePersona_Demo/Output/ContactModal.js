import React, { useState, useEffect } from 'react';
import { X, Check, XCircle } from 'lucide-react';
import PropTypes from 'prop-types';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Alert, AlertDescription } from '@/components/ui/alert';

const translations = {
  en: {
    title: 'Contact Us',
    name: 'Full Name',
    namePlaceholder: 'Enter your full name',
    companyRole: 'Company Role',
    companyRolePlaceholder: 'Your position in the company',
    email: 'Email Address',
    emailPlaceholder: 'your.email@company.com',
    phone: 'Phone Number',
    message: 'Additional Information (Optional)',
    messagePlaceholder: 'Share any specific requirements or additional information about your needs...',
    terms: 'I agree to the processing of my personal data and the sharing of information provided in the questionnaire.',
    cancel: 'Cancel',
    send: 'Send Message',
    close: 'Close',
    success: 'Message sent successfully!',
    successTitle: 'Message Sent Successfully',
    errors: {
      name: 'Full name is required',
      companyRole: 'Company role is required',
      email: 'Please enter a valid email address',
      emailFormat: 'Invalid email format',
      phone: 'Phone number is required',
      phoneFormat: 'Invalid phone number format',
      terms: 'You must agree to the terms',
      submit: 'Error sending message. Please try again later.'
    }
  },
  it: {
    title: 'Contattaci',
    name: 'Nome Completo',
    namePlaceholder: 'Inserisci il tuo nome completo',
    companyRole: 'Ruolo Aziendale',
    companyRolePlaceholder: 'La tua posizione in azienda',
    email: 'Indirizzo Email',
    emailPlaceholder: 'tua.email@azienda.com',
    phone: 'Numero di Telefono',
    message: 'Informazioni Aggiuntive (Facoltativo)',
    messagePlaceholder: 'Condividi eventuali requisiti specifici o informazioni aggiuntive sulle tue esigenze...',
    terms: 'Acconsento al trattamento dei miei dati personali e all\'invio delle informazioni fornite nel questionario.',
    cancel: 'Annulla',
    send: 'Invia Messaggio',
    close: 'Chiudi',
    success: 'Messaggio inviato con successo!',
    successTitle: 'Messaggio Inviato con Successo',
    errors: {
      name: 'Il nome completo è obbligatorio',
      companyRole: 'Il ruolo aziendale è obbligatorio',
      email: 'Inserisci un indirizzo email valido',
      emailFormat: 'Formato email non valido',
      phone: 'Il numero di telefono è obbligatorio',
      phoneFormat: 'Formato del numero di telefono non valido',
      terms: 'Devi accettare i termini e le condizioni',
      submit: 'Errore durante l\'invio. Riprova più tardi.'
    }
  }
};

const SuccessAlert = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
        <div className="flex flex-col items-center">
          <div className="mb-4 rounded-full bg-green-100 p-2">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-4">{message}</h3>
          <button
            onClick={onClose}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ContactModal = ({ 
  isOpen, 
  onClose, 
  questionnaire,
  analysisResult,
  onSubmit,
  language = 'en'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    companyRole: '',
    email: '',
    phonePrefix: '+1',
    phoneNumber: '',
    message: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const t = translations[language] || translations.en;

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        companyRole: '',
        email: '',
        phonePrefix: '+1',
        phoneNumber: '',
        message: '',
        agreeToTerms: false
      });
      setErrors({});
      setTouched({});
      setSubmitting(false);
      setShowSuccess(false);
    }
  }, [isOpen]);

  const phonePrefixes = [
    { value: '+1', label: '🇺🇸 +1', country: 'US' },
    { value: '+44', label: '🇬🇧 +44', country: 'GB' },
    { value: '+39', label: '🇮🇹 +39', country: 'IT' },
    { value: '+33', label: '🇫🇷 +33', country: 'FR' },
    { value: '+49', label: '🇩🇪 +49', country: 'DE' }
  ];

  const getCountryCode = (prefix) => {
    const prefixObj = phonePrefixes.find(p => p.value === prefix);
    return prefixObj ? prefixObj.country : undefined;
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const validatePhone = (prefix, phoneNumber) => {
    const countryCode = getCountryCode(prefix);
    if (!countryCode) return false;
    const phoneNumberObj = parsePhoneNumberFromString(phoneNumber, countryCode);
    return phoneNumberObj ? phoneNumberObj.isValid() : false;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = t.errors.name;
    if (!formData.companyRole.trim()) newErrors.companyRole = t.errors.companyRole;
    if (!formData.email.trim()) newErrors.email = t.errors.email;
    else if (!validateEmail(formData.email)) newErrors.email = t.errors.emailFormat;
    if (!formData.phoneNumber.trim()) newErrors.phone = t.errors.phone;
    else if (!validatePhone(formData.phonePrefix, formData.phoneNumber)) newErrors.phone = t.errors.phoneFormat;
    if (!formData.agreeToTerms) newErrors.agreeToTerms = t.errors.terms;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || submitting) return;
    
    setSubmitting(true);
    setErrors({});
    
    try {
      const contactData = {
        contactInfo: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: `${formData.phonePrefix}${formData.phoneNumber.trim()}`,
          companyRole: formData.companyRole.trim(),
          message: formData.message.trim()
        },
        questionnaireData: questionnaire,
        analysisResult: analysisResult,
        metadata: {
          submittedAt: new Date().toISOString(),
          language
        }
      };

      const result = await onSubmit(contactData);
      
      if (result) {
        setShowSuccess(true);
      }
    } catch (error) {
      console.error('[ContactModal] Submission error:', error);
      setErrors({ submit: t.errors.submit });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">{t.title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.name}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  onBlur={() => handleBlur('name')}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
                    touched.name && errors.name ? 'border-red-500' : ''
                  }`}
                  placeholder={t.namePlaceholder}
                />
                {touched.name && errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.companyRole}
                </label>
                <input
                  type="text"
                  value={formData.companyRole}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyRole: e.target.value }))}
                  onBlur={() => handleBlur('companyRole')}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
                    touched.companyRole && errors.companyRole ? 'border-red-500' : ''
                  }`}
                  placeholder={t.companyRolePlaceholder}
                />
                {touched.companyRole && errors.companyRole && (
                  <p className="mt-2 text-sm text-red-600">{errors.companyRole}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.email}
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  onBlur={() => handleBlur('email')}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
                    touched.email && errors.email ? 'border-red-500' :
                    touched.email && validateEmail(formData.email) ? 'border-green-500' : ''
                  }`}
                  placeholder={t.emailPlaceholder}
                />
                {formData.email && validateEmail(formData.email) && (
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
                )}
              </div>
              {touched.email && errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.phone}
              </label>
              <div className="flex gap-4 items-center">
                <select
                  value={formData.phonePrefix}
                  onChange={(e) => setFormData(prev => ({ ...prev, phonePrefix: e.target.value }))}
                  className="w-32 px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white"
                >
                  {phonePrefixes.map(prefix => (
                    <option key={prefix.value} value={prefix.value}>
                      {prefix.label}
                    </option>
                  ))}
                </select>
                <div className="relative flex-1">
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    onBlur={() => handleBlur('phone')}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors ${
                      touched.phone
                        ? errors.phone
                          ? 'border-red-500'
                          : 'border-green-500'
                        : ''
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {touched.phone && formData.phoneNumber && (
                    validatePhone(formData.phonePrefix, formData.phoneNumber) ? (
                      <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600" />
                    )
                  )}
                </div>
              </div>
              {touched.phone && errors.phone && (
                <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.message}
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-accent-500 
                           focus:border-accent-500 transition-colors resize-vertical"
                placeholder={t.messagePlaceholder}
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                className="mt-1.5 h-4 w-4 rounded border-gray-300 text-accent-600 focus:ring-accent-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                {t.terms}
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
            )}

            {errors.submit && (
              <div className="p-4 bg-red-50 rounded-lg text-red-600 text-sm">
                {errors.submit}
              </div>
            )}

            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                disabled={submitting}
                className={`px-8 py-3 bg-accent-600 text-white rounded-lg transition-colors font-medium
                  ${submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent-700'}`}
              >
                {submitting ? 'Sending...' : t.send}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Simple Success Message Modal */}
      <SuccessAlert
        isOpen={showSuccess}
        message={t.success}
        onClose={() => {
          setShowSuccess(false);
          onClose();
        }}
      />
    </>
  );
};

ContactModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  questionnaire: PropTypes.object,
  analysisResult: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  language: PropTypes.string
};

SuccessAlert.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ContactModal;