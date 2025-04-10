
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Search, Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full">
      <div className="container flex h-16 items-center justify-between">
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Shop
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Collections
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary/80 transition-colors">
            About
          </a>
        </div>
        <div className="text-xl font-semibold tracking-tight">
          <a href="/">GLOW</a>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Shopping cart</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
