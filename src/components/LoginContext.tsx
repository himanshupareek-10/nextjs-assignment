'use client'
import { LoginContextProps, LoginProviderProps } from '@/types/types';
import React, { createContext, useState, useContext, useEffect } from 'react';

const LoginContext = createContext<LoginContextProps | null>(null);

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [showLogin, setShowLogin] = useState(false);
  useEffect(() => {
    const savedLoginState = localStorage.getItem('showLogin');
    if (savedLoginState) {
      setShowLogin(JSON.parse(savedLoginState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('showLogin', JSON.stringify(showLogin));
  }, [showLogin]);

  const ToggleLogin = () => {
    setShowLogin(prevState => {
      const newState = !prevState;
      return newState;
    });
  };

  return (
    <LoginContext.Provider value={{ showLogin, ToggleLogin, }}>
      {children}
    </LoginContext.Provider>
  );
};


export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
};
