import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('Tiếng Việt'); // Ngôn ngữ mặc định

  const toggleLanguage = () => {
    setLanguage(prevLanguage => (prevLanguage === 'Tiếng Việt' ? 'English' : 'Tiếng Việt'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
