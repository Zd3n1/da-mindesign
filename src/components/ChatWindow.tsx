
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Send, MessageCircle, Image, Download, Mail, Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "@/context/ChatContext";
import ApiKeyInput from "./ApiKeyInput";
import ReactMarkdown from "react-markdown";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

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
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { apiKey } = useChat();
  const { toast } = useToast();

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

    // Enhanced system prompt for more concise product recommendations
    const systemPrompt = `You are a helpful assistant for GLOW, a minimalist home goods store.
When recommending products, be concise and specific. Always suggest 1-2 specific products from our collections that would perfectly match the customer's needs or the style in their image.

For each product recommendation:
1. Name the specific product with a distinctive name (e.g., "Ember Ceramic Mug" not just "mug")
2. Mention its price point ($XX-$XXX range)
3. Describe how it will transform their space in 1-2 sentences
4. Explain the emotional impact it will have (how they'll feel when using it)

Our product collections include:
- Ceramics: Handcrafted ceramics for everyday use and special occasions. Signature items: Serene Dawn Breakfast Set ($85), Terra Collection Serving Bowls ($120), Nordic Minimalist Vases ($65-95)
- Glassware: Elegant glassware that adds sophistication to your home. Signature items: Aurora Tinted Wine Glasses ($75/set), Crystal Clear Tumblers ($55/set), Smoky Geometric Decanters ($110)
- Candles: Scented candles that create a warm and inviting atmosphere. Signature items: Amber & Cedar Wood Candle ($45), Sea Salt & Sage Collection ($38), Pure Beeswax Pillars ($29-59)
- Textiles: Soft, natural textiles to bring comfort to your home. Signature items: Cloud Linen Throw Blankets ($95), Handwoven Cotton Cushion Covers ($45), Organic Hemp Table Runners ($65)
- Kitchen: Functional and beautiful kitchen accessories for the modern home. Signature items: Olive Wood Utensil Set ($75), Marble & Brass Trivets ($60), Hand-forged Knives ($125-250)
- Home Decor: Minimal decor pieces that enhance your living space. Signature items: Sculptural Brass Objects ($85-120), Natural Stone Bookends ($65), Floating Wall Shelves ($95-150)

Keep responses under 150 words. If an image is shared, focus on suggesting items that complement the style shown.`;

    try {
      let chatMessages;
      
      // If there's an image, construct message content accordingly
      if (imagePreview) {
        // For OpenRouter with image, we'll use the base64 image data
        chatMessages = [
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
        chatMessages = [
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

  // Extract recommended products from the conversation
  const extractRecommendedProducts = () => {
    const assistantMessages = messages.filter(msg => msg.role === "assistant");
    let productMentions = [];
    
    for (const msg of assistantMessages) {
      // Look for product names and prices in the format of "Product Name ($XX)"
      const productMatches = msg.content.match(/([A-Za-z\s&]+)(\s\(\$[\d-]+(?:\/set)?\))/g) || [];
      productMentions = [...productMentions, ...productMatches];
    }
    
    // Deduplicate the products
    return [...new Set(productMentions)];
  };

  // Download the conversation as PDF
  const downloadAsPDF = () => {
    // In a real implementation, you would generate a PDF here
    // For this example, we'll just create a text file
    const recommendedProducts = extractRecommendedProducts();
    
    let conversationText = "GLOW Home Decor - Chat Summary\n\n";
    conversationText += "Conversation:\n";
    
    messages.forEach(message => {
      const role = message.role === "user" ? "You" : "GLOW Assistant";
      conversationText += `${role}: ${message.content}\n\n`;
    });
    
    if (recommendedProducts.length > 0) {
      conversationText += "\nRecommended Products:\n";
      recommendedProducts.forEach(product => {
        conversationText += `- ${product}\n`;
      });
    }
    
    const blob = new Blob([conversationText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "glow-conversation.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Conversation Saved",
      description: "Your conversation has been downloaded as a text file."
    });
    
    setIsSaveDialogOpen(false);
  };

  // Send conversation to email
  const sendEmail = () => {
    // In a real implementation, you would send an API request to a backend service
    // For this example, we'll just simulate it
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Conversation Sent",
      description: `Your conversation summary has been sent to ${email}.`
    });
    
    setIsSaveDialogOpen(false);
    setEmail("");
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

      {/* Chat window - increased height */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 sm:w-96 h-[600px] bg-background border rounded-lg shadow-xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-medium">GLOW Assistant</h3>
            <div className="flex items-center gap-2">
              <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" title="Save Conversation">
                    <Save className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Save Your Conversation</DialogTitle>
                    <DialogDescription>
                      Download your conversation as a text file or have it sent to your email.
                    </DialogDescription>
                  </DialogHeader>
                  
                  {extractRecommendedProducts().length > 0 && (
                    <div className="py-4">
                      <h4 className="text-sm font-medium mb-2">Recommended Products:</h4>
                      <ul className="text-sm space-y-1">
                        {extractRecommendedProducts().map((product, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs">✓</span>
                            {product}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-4 py-4">
                    <div className="flex items-center gap-4">
                      <Button onClick={downloadAsPDF} className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Download Text
                      </Button>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or get it via email
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                      <Button onClick={sendEmail} variant="outline">
                        <Mail className="mr-2 h-4 w-4" />
                        Send to Email
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
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
                    {message.role === "assistant" ? (
                      <div className="text-sm whitespace-pre-wrap markdown-body">
                        <ReactMarkdown>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    )}
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
