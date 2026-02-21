import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CartSidebar = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                <h2 className="font-display text-lg font-bold text-foreground">Carrinho ({totalItems})</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-1 rounded-full hover:bg-muted transition-colors">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground font-medium">Seu carrinho está vazio</p>
                  <p className="text-sm text-muted-foreground mt-1">Adicione produtos para continuar</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 bg-muted/30 rounded-lg p-3">
                    <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-md" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground truncate">{item.product.name}</h4>
                      <p className="text-primary font-bold mt-1">R$ {item.product.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 rounded bg-card border border-border hover:bg-muted">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 rounded bg-card border border-border hover:bg-muted">
                          <Plus className="h-3 w-3" />
                        </button>
                        <button onClick={() => removeItem(item.product.id)} className="ml-auto p-1 text-destructive hover:bg-destructive/10 rounded">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-5 space-y-4">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">R$ {totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => { setIsCartOpen(false); navigate("/carrinho"); }}
                  className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-lg hover:opacity-90 transition-opacity shadow-primary"
                >
                  Finalizar Compra
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
