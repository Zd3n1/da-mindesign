
import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
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
            <Button>Shop Now</Button>
            <Button variant="outline">View Collections</Button>
          </div>
        </div>
        <div className="aspect-video overflow-hidden rounded-md bg-neutral-100 animate-fade-in">
          <img 
            src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
            alt="Minimalist home goods arrangement" 
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
