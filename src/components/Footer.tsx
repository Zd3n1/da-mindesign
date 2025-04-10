
import React from "react";
import { Instagram, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="border-t bg-background pt-12 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">GLOW</h3>
            <p className="text-sm text-muted-foreground">
              Minimal designs for modern living.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Ceramics</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Glassware</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Candles</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">All Products</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Shipping & Returns</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Newsletter</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to get exclusive updates and offers.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Your email" className="h-9" />
              <Button size="sm">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-6 text-center text-xs text-muted-foreground">
          <p>© 2025 GLOW Minimal Goods. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
