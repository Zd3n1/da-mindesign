
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Send, MessageCircle, Image } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "@/context/ChatContext";
import ApiKeyInput from "./ApiKeyInput";

interface Message {
  role: "user" | "assistant";
  content: string;
  image?: string;
}

const ChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! How can I help you with your home decor questions today? You can also share images for product suggestions." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { apiKey } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async () => {
    if ((!input.trim() && !imagePreview) || !apiKey) return;

    const userMessage: Message = { 
      role: "user", 
      content: input,
      ...(imagePreview && { image: imagePreview })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Create a system prompt that includes our product categories
    const systemPrompt = `You are a helpful assistant for GLOW, a minimalist home goods store. 
Provide concise, helpful answers about home decor, interior design, our products, and styling advice.
Our store has these product collections:
- Ceramics: Handcrafted ceramics for everyday use and special occasions
- Glassware: Elegant glassware that adds sophistication to your home
- Candles: Scented candles that create a warm and inviting atmosphere
- Textiles: Soft, natural textiles to bring comfort to your home
- Kitchen: Functional and beautiful kitchen accessories for the modern home
- Home Decor: Minimal decor pieces that enhance your living space

If an image is shared, analyze it and suggest relevant products from our collections that would complement the style shown.`;

    try {
      let messageContent = input;
      
      // If there's an image, construct message content accordingly
      if (imagePreview) {
        // For OpenRouter with image, we'll use the base64 image data
        const chatMessages = [
          { 
            role: "system", 
            content: systemPrompt
          },
          ...messages.map(msg => ({ 
            role: msg.role, 
            content: msg.content 
          })),
          { 
            role: "user", 
            content: [
              { 
                type: "text", 
                text: input || "What products would you recommend based on this image?"
              },
              {
                type: "image_url",
                image_url: {
                  url: imagePreview
                }
              }
            ]
          }
        ];

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
            "HTTP-Referer": window.location.href, // Required for OpenRouter
            "X-Title": "GLOW Home Decor Assistant" // Optional but recommended
          },
          body: JSON.stringify({
            model: "openai/gpt-4o", // Using GPT-4o for vision capabilities
            messages: chatMessages,
            max_tokens: 500
          })
        });

        const data = await response.json();
        
        if (data.error) {
          setMessages(prev => [...prev, { 
            role: "assistant", 
            content: `Error: ${data.error.message || "Something went wrong. Please try again."}` 
          }]);
        } else if (data.choices && data.choices[0]) {
          const assistantMessage: Message = { 
            role: "assistant", 
            content: data.choices[0].message.content 
          };
          setMessages(prev => [...prev, assistantMessage]);
        }
      } else {
        // Regular text-only query
        const chatMessages = [
          { role: "system", content: systemPrompt },
          ...messages.map(msg => ({ role: msg.role, content: msg.content })),
          { role: "user", content: input }
        ];
        
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
            "HTTP-Referer": window.location.href, // Required for OpenRouter
            "X-Title": "GLOW Home Decor Assistant" // Optional but recommended
          },
          body: JSON.stringify({
            model: "openai/gpt-3.5-turbo", // Default model for text-only
            messages: chatMessages,
            max_tokens: 500
          })
        });

        const data = await response.json();
        
        if (data.error) {
          setMessages(prev => [...prev, { 
            role: "assistant", 
            content: `Error: ${data.error.message || "Something went wrong. Please try again."}` 
          }]);
        } else if (data.choices && data.choices[0]) {
          const assistantMessage: Message = { 
            role: "assistant", 
            content: data.choices[0].message.content 
          };
          setMessages(prev => [...prev, assistantMessage]);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Sorry, I couldn't connect to the server. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat button */}
      <Button 
        className="fixed bottom-4 right-4 rounded-full shadow-lg z-50 h-12 w-12 p-0"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle />
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 sm:w-96 h-[500px] bg-background border rounded-lg shadow-xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-medium">GLOW Assistant</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* API Key input */}
          {!apiKey && (
            <div className="p-4">
              <ApiKeyInput />
            </div>
          )}

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="flex flex-col gap-4">
              {messages.map((message, i) => (
                <div 
                  key={i} 
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted"
                    }`}
                  >
                    {message.image && (
                      <div className="mb-2">
                        <img 
                          src={message.image} 
                          alt="User uploaded" 
                          className="rounded-md max-h-32 object-contain" 
                        />
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Image preview */}
          {imagePreview && (
            <div className="p-2 border-t">
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-16 object-contain rounded-md"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background shadow-sm"
                  onClick={clearImage}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="min-h-[60px] resize-none"
                disabled={isLoading || !apiKey}
              />
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading || !apiKey}
                  className="h-10 w-10"
                  title="Upload image"
                >
                  <Image className="h-4 w-4" />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </Button>
                <Button 
                  onClick={handleSendMessage} 
                  disabled={isLoading || (!input.trim() && !imagePreview) || !apiKey} 
                  className="h-10 w-10"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWindow;

