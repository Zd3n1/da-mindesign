
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/context/ChatContext";
import { AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ApiKeyInput = () => {
  const { apiKey, setApiKey, clearApiKey } = useChat();
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(!apiKey);

  const handleSave = () => {
    if (!inputValue.trim()) return;
    
    setApiKey(inputValue);
    setShowInput(false);
    toast({
      title: "API key saved",
      description: "Your OpenRouter API key has been saved locally.",
      duration: 3000,
    });
    setInputValue("");
  };

  const handleClear = () => {
    clearApiKey();
    setShowInput(true);
    toast({
      title: "API key cleared",
      description: "Your OpenRouter API key has been removed.",
      duration: 3000,
    });
  };

  if (!showInput && apiKey) {
    return (
      <div className="p-4 bg-muted/20 rounded-lg">
        <p className="text-sm">API key is set</p>
        <div className="flex gap-2 mt-1">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowInput(true)}
          >
            Change API Key
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleClear}
          >
            Clear
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-muted/40 rounded-lg">
      <p className="text-sm mb-2">Enter your OpenRouter API key:</p>
      <div className="flex gap-2">
        <Input 
          type="password" 
          placeholder="OpenRouter API Key" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSave} disabled={!inputValue.trim()}>
          Save
        </Button>
      </div>
      <div className="flex items-start gap-1 mt-2 text-xs text-muted-foreground">
        <AlertCircle className="h-3 w-3 mt-0.5" />
        <p>
          Your API key is stored only in your browser's localStorage and never sent to our servers.
        </p>
      </div>
    </div>
  );
};

export default ApiKeyInput;
