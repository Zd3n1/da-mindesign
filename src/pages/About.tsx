
import React from "react";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-medium mb-6">About GLOW</h1>
          
          <div className="aspect-video mb-8 overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              alt="Our studio"
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="prose prose-neutral max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              GLOW was founded in 2020 with a simple mission: to create beautiful, functional products that enhance everyday living. We believe that the objects we surround ourselves with should bring joy, comfort, and a sense of calm to our lives.
            </p>
            
            <p className="mb-6">
              Our team of artisans and designers work together to create pieces that are both timeless and contemporary. We draw inspiration from natural materials, clean lines, and the beauty of imperfection. Each product is thoughtfully designed and made with care, using sustainable practices and materials whenever possible.
            </p>

            <Separator className="my-8" />
            
            <h2 className="text-2xl font-medium mb-4">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-medium mb-2">Sustainability</h3>
                <p className="text-muted-foreground">
                  We're committed to reducing our environmental impact through responsible material sourcing, minimal packaging, and ethical production practices.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Quality</h3>
                <p className="text-muted-foreground">
                  We believe in creating products that last. Each piece is made with attention to detail and a focus on durability.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Simplicity</h3>
                <p className="text-muted-foreground">
                  We embrace minimalism in our designs, creating products that are both beautiful and functional.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We value the relationships we build with our customers, suppliers, and the broader community.
                </p>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            <h2 className="text-2xl font-medium mb-4">Our Team</h2>
            
            <p className="mb-8">
              Our small but dedicated team brings together a diverse range of skills and experiences. We're united by our passion for beautiful design and our commitment to creating products that enhance everyday life.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="aspect-square overflow-hidden rounded-full mb-4 mx-auto max-w-[180px]">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                    alt="Emily Chen"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="font-medium">Emily Chen</h3>
                <p className="text-sm text-muted-foreground">Founder & Designer</p>
              </div>
              <div className="text-center">
                <div className="aspect-square overflow-hidden rounded-full mb-4 mx-auto max-w-[180px]">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                    alt="David Kim"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="font-medium">David Kim</h3>
                <p className="text-sm text-muted-foreground">Lead Ceramicist</p>
              </div>
              <div className="text-center">
                <div className="aspect-square overflow-hidden rounded-full mb-4 mx-auto max-w-[180px]">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                    alt="Sarah Johnson"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="font-medium">Sarah Johnson</h3>
                <p className="text-sm text-muted-foreground">Marketing Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
