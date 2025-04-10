
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  description: string;
}

const CategoryCard = ({ title, imageUrl, description }: CategoryCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative group overflow-hidden rounded-md">
      <img
        src={imageUrl}
        alt={title}
        className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "https://images.unsplash.com/photo-1595408043396-44a8f7300182?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent flex flex-col justify-end p-6">
        <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
        <p className="text-white/80 text-sm mb-4 max-w-[90%]">{description}</p>
        <Button 
          variant="outline" 
          className="bg-transparent text-white border-white hover:bg-white hover:text-stone-950 w-fit"
          onClick={() => navigate(`/shop?collection=${title.toLowerCase()}`)}
        >
          Shop Now
        </Button>
      </div>
    </div>
  );
};

const categories = [
  {
    title: "Ceramics",
    imageUrl: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2070&auto=format&fit=crop",
    description: "Handcrafted ceramics for everyday use and special moments."
  },
  {
    title: "Glassware",
    imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=2070&auto=format&fit=crop",
    description: "Elegant and minimalist glassware to elevate your table."
  },
  {
    title: "Candles",
    imageUrl: "https://images.unsplash.com/photo-1674479019835-6253ff6d1819?q=80&w=2788&auto=format&fit=crop",
    description: "Scented candles made from natural ingredients for a cozy atmosphere."
  }
];

const CategorySection = () => {
  return (
    <section className="py-12 bg-neutral-50">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-medium mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              imageUrl={category.imageUrl}
              description={category.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
