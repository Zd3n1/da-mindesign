
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  category: string;
}

const ProductCard = ({ id, name, price, imageUrl, category }: ProductCardProps) => {
  return (
    <div className="group relative">
      <div className="aspect-square overflow-hidden rounded-md bg-neutral-100 transition-all group-hover:opacity-90">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm">
          <Button variant="secondary" size="sm" className="absolute bottom-4 right-4">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <div className="text-xs text-muted-foreground">{category}</div>
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
