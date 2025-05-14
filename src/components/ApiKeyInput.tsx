
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/context/ChatContext";

const ApiKeyInput = () => {
  const { apiKey, setApiKey } = useChat();
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(!apiKey);

  const handleSave = () => {
    setApiKey(inputValue);
    setShowInput(false);
  };

  if (!showInput && apiKey) {
    return (
      <div className="p-4 bg-muted/20 rounded-lg">
        <p className="text-sm">API key is set</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowInput(true)}
          className="mt-1"
        >
          Change API Key
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-muted/40 rounded-lg">
      <p className="text-sm mb-2">Enter your OpenAI API key:</p>
      <div className="flex gap-2">
        <Input 
          type="password" 
          placeholder="OpenAI API Key" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSave} disabled={!inputValue.trim()}>
          Save
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        Your API key is stored locally and never sent to our servers.
      </p>
    </div>
  );
};

export default ApiKeyInput;
