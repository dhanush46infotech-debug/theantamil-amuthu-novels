import React, { createContext, useState, useContext, useEffect } from 'react';
import taTranslations from '../i18n/ta.json';
import enTranslations from '../i18n/en.json';
import teTranslations from '../i18n/te.json';

const LanguageContext = createContext();

const translations = {
  TAMIL: taTranslations,
  ENGLISH: enTranslations,
  TELUGU: teTranslations,
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('ttm-novels-language');
    return savedLanguage || 'TAMIL';
  });

  useEffect(() => {
    localStorage.setItem('ttm-novels-language', currentLanguage);
  }, [currentLanguage]);

  // Translation function
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return value || key;
  };

  const value = {
    currentLanguage,
    setCurrentLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
