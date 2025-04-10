
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-12 md:py-24">
      <div className="container grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium">
            Minimal design.<br />
            Exceptional quality.
          </h1>
          <p className="text-muted-foreground max-w-[600px]">
            Timeless home goods crafted for modern living. Our minimalist designs bring elegant simplicity to your everyday life.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            <Button onClick={() => navigate("/shop")}>Shop Now</Button>
            <Button variant="outline" onClick={() => navigate("/collections")}>View Collections</Button>
          </div>
        </div>
        <div className="aspect-video overflow-hidden rounded-md bg-neutral-100 animate-fade-in">
          <img 
            src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
            alt="Minimalist home goods arrangement" 
            className="object-cover w-full h-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1595408043396-44a8f7300182?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3";
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
