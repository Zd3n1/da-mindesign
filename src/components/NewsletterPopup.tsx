
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const NewsletterPopup = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Check if the user has already seen the popup
    const hasSeenPopup = localStorage.getItem("hasSeenNewsletterPopup");
    
    if (!hasSeenPopup) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setOpen(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Success message
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    
    // Close popup and set flag in localStorage
    setOpen(false);
    localStorage.setItem("hasSeenNewsletterPopup", "true");
    setEmail("");
  };

  const handleClose = () => {
    setOpen(false);
    // Still mark as seen even if they close without subscribing
    localStorage.setItem("hasSeenNewsletterPopup", "true");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Join Our Newsletter</DialogTitle>
          <DialogDescription className="text-center">
            Subscribe to get exclusive updates, early access to new products, and special offers.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center my-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="h-6 w-6 text-primary" />
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input 
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button type="submit">
              Subscribe
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
            >
              No thanks
            </Button>
          </div>
          
          <p className="text-xs text-center text-muted-foreground">
            By subscribing, you agree to receive marketing emails from us. You can unsubscribe at any time.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterPopup;
