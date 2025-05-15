
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ChatContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  clearApiKey: () => void;
}

const STORAGE_KEY = 'glow_openrouter_api_key';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [apiKey, setApiKeyState] = useState<string>('');

  // Load API key from localStorage on initial render
  useEffect(() => {
    const storedKey = localStorage.getItem(STORAGE_KEY);
    if (storedKey) {
      setApiKeyState(storedKey);
    }
  }, []);

  // Set API key in state and localStorage
  const setApiKey = (key: string) => {
    localStorage.setItem(STORAGE_KEY, key);
    setApiKeyState(key);
  };

  // Clear API key from state and localStorage
  const clearApiKey = () => {
    localStorage.removeItem(STORAGE_KEY);
    setApiKeyState('');
  };

  return (
    <ChatContext.Provider value={{ apiKey, setApiKey, clearApiKey }}>
      {children}
    </ChatContext.Provider>
  );
};
