import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "./CartContext";

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pendente" | "pago" | "enviado" | "entregue" | "cancelado";
  date: string;
  shippingAddress: string;
}

interface OrdersContextType {
  orders: Order[];
  createOrder: (userId: string, items: CartItem[], total: number, address: string) => Promise<Order>;
  getOrdersByUser: (userId: string) => Order[];
  getAllOrders: () => Order[];
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("petshop-orders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("petshop-orders", JSON.stringify(orders));
  }, [orders]);

  const createOrder = async (userId: string, items: CartItem[], total: number, address: string): Promise<Order> => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      userId,
      items,
      total,
      status: "pago",
      date: new Date().toISOString(),
      shippingAddress: address
    };
    
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrdersByUser = (userId: string) => orders.filter(o => o.userId === userId);
  const getAllOrders = () => orders;

  return (
    <OrdersContext.Provider value={{ orders, createOrder, getOrdersByUser, getAllOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
};
