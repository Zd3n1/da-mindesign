
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";

const Cart = () => {
  const { items, addToCart, removeFromCart, clearCart } = useCart();
  
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container py-16">
          <h1 className="text-2xl md:text-3xl font-medium mb-8">Shopping Cart</h1>
          <div className="text-center py-16">
            <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add some products to your cart to continue shopping.</p>
            <Button onClick={() => window.history.back()}>Continue Shopping</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-16">
        <h1 className="text-2xl md:text-3xl font-medium mb-8">Shopping Cart</h1>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-6">
                  <div className="aspect-square h-24 w-24 overflow-hidden rounded-md bg-neutral-100">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1595408043396-44a8f7300182?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3";
                      }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                      <p className="mt-1">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => {
                          if (item.quantity > 1) {
                            // Fixed: Only pass id property to the addToCart function
                            // The function handles quantity internally
                            const { id, name, price, imageUrl, category } = item;
                            addToCart({ id, name, price, imageUrl, category });
                          } else {
                            removeFromCart(item.id);
                          }
                        }}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => addToCart({ ...item })}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:sticky lg:top-20 h-fit rounded-lg border p-6">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${getTotalPrice()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${getTotalPrice()}</span>
                </div>
              </div>
              <Button className="w-full mt-6">Proceed to Checkout</Button>
              <Button variant="outline" className="w-full" onClick={() => clearCart()}>
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
