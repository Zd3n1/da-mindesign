
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChatContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [apiKey, setApiKey] = useState('');

  return (
    <ChatContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ChatContext.Provider>
  );
};
