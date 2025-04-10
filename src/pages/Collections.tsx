
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const collections = [
  {
    id: "ceramics",
    name: "Ceramics",
    description: "Handcrafted ceramics for everyday use and special occasions.",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "glassware",
    name: "Glassware",
    description: "Elegant glassware that adds sophistication to your home.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "candles",
    name: "Candles",
    description: "Scented candles that create a warm and inviting atmosphere.",
    image: "https://unsplash.com/photos/person-holding-lighted-candle-near-green-plant-OAW0OCLn52I?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "textiles",
    name: "Textiles",
    description: "Soft, natural textiles to bring comfort to your home.",
    image: "https://images.unsplash.com/photo-1588625500633-a0cd518f0f60?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    description: "Functional and beautiful kitchen accessories for the modern home.",
    image: "https://images.unsplash.com/photo-1590794056180-9e5e6f18858b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "decor",
    name: "Home Decor",
    description: "Minimal decor pieces that enhance your living space.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
  },
];

const Collections = () => {
  return (
    <>
      <Navbar />
      <div className="container py-12">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-medium mb-4">Our Collections</h1>
          <p className="text-muted-foreground">
            Explore our curated collections of mindfully crafted home goods, designed for modern living.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link
              to={`/shop?collection=${collection.id}`}
              key={collection.id}
              className="group overflow-hidden rounded-lg border bg-background transition-colors hover:bg-accent/50"
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1595408043396-44a8f7300182?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3";
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium">{collection.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {collection.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Collections;
