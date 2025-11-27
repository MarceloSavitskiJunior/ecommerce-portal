import { useState, useEffect } from "react";

export function useCart() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  function updateCart(newCart: any[]) {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function removeItem(id: string) {
    updateCart(cart.filter(item => item.id !== id));
  }

  function changeQuantity(id: string, qty: number) {
    updateCart(
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(qty, 1) }
          : item
      )
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return { cart, total, removeItem, changeQuantity };
}
