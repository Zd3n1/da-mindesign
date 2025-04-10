
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full">
      <div className="container flex h-16 items-center justify-between">
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        <div className={`${isMenuOpen ? "flex flex-col absolute top-16 left-0 w-full bg-background border-b p-4 space-y-4 md:space-y-0" : "hidden"} md:flex md:relative md:top-0 md:flex-row md:items-center md:space-x-8 md:border-none md:p-0`}>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("/shop"); }} className="text-sm font-medium hover:text-primary/80 transition-colors">
            Shop
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("/collections"); }} className="text-sm font-medium hover:text-primary/80 transition-colors">
            Collections
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("/about"); }} className="text-sm font-medium hover:text-primary/80 transition-colors">
            About
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("/contact"); }} className="text-sm font-medium hover:text-primary/80 transition-colors">
            Contact
          </a>
        </div>
        <div className="text-xl font-semibold tracking-tight">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>GLOW</a>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/search")}>
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate("/cart")} className="relative">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="sr-only">Shopping cart</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
