
import React from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const featuredProducts = [
  {
    id: "1",
    name: "Ceramic Vase",
    price: "58",
    imageUrl: "https://images.unsplash.com/photo-1595408043396-44a8f7300182?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Ceramics"
  },
  {
    id: "2",
    name: "Frosted Glass Tumbler",
    price: "24",
    imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Glassware"
  },
  {
    id: "3",
    name: "Natural Wax Candle",
    price: "38",
    imageUrl: "https://images.unsplash.com/photo-1608181831718-c9dc5c657c6d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Candles"
  },
  {
    id: "4",
    name: "Ceramic Mug Set",
    price: "42",
    imageUrl: "https://images.unsplash.com/photo-1530053078039-9e66258af785?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Ceramics"
  }
];

const FeaturedProducts = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex justify-between items-baseline mb-8">
          <h2 className="text-2xl md:text-3xl font-medium">Featured Products</h2>
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-primary underline"
            onClick={(e) => {
              e.preventDefault();
              navigate("/shop");
            }}
          >
            View all
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
