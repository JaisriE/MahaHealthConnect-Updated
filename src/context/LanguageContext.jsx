import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../translations/en';
import { mr } from '../translations/mr';
import { hi } from '../translations/hi';

const LanguageContext = createContext();

const TRANSLATIONS = { en, mr, hi };
const STORAGE_KEY = 'maha_connect_language';

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (saved === 'en' || saved === 'mr' || saved === 'hi')) {
        return saved;
      }
    } catch (e) {
      console.error('Failed to load language from localStorage:', e);
    }
    return 'en'; // Default language: English
  });

  const setLanguage = (lang) => {
    if (TRANSLATIONS[lang]) {
      setLanguageState(lang);
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (e) {
        console.error('Failed to save language to localStorage:', e);
      }
    }
  };

  const t = (key, params = {}) => {
    let text = TRANSLATIONS[language]?.[key] ?? TRANSLATIONS['en']?.[key] ?? key;
    if (typeof text === 'string' && params) {
      Object.keys(params).forEach(p => {
        text = text.replace(new RegExp(`\\{${p}\\}`, 'g'), params[p]);
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
