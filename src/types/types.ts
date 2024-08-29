'use client'
import { ReactNode } from 'react';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string,
    idToken?: string,
  }
}

export interface Calculator {
    name: string;
    title: string;
}

export interface CalculatorData extends Calculator {
  id: number;
  name: string;
  description: string;
  title: string;
  subtitle: string;
  list: CalculatorData[];
}

export interface CalculatorPageProps {
  params: {
    calculator: string;
  };
}

export interface LoginContextProps{
  showLogin: boolean;
  ToggleLogin: () => void;
}

export interface LoginProviderProps {
  children: ReactNode;
}
