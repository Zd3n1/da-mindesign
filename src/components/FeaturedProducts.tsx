
import React from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const featuredProducts = [
  {
    id: "1",
    name: "Ceramic Vase",
    price: "58",
    imageUrl: "https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?q=80&w=2787&auto=format&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1674479019774-21a23e8f065e?q=80&w=2788&auto=format&fit=crop",
    category: "Candles"
  },
  {
    id: "4",
    name: "Ceramic Mug Set",
    price: "42",
    imageUrl: "https://images.unsplash.com/photo-1657946874620-afab95fd7505?q=80&w=2787&auto=format&fit=crop",
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
