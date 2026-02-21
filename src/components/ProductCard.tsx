import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { motion } from "framer-motion";

const badgeStyles: Record<string, string> = {
  "novo": "bg-secondary text-secondary-foreground",
  "promoção": "bg-destructive text-destructive-foreground",
  "mais vendido": "bg-primary text-primary-foreground",
};

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useWishlist();
  const favorite = isFavorite(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group bg-card rounded-xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
    >
      <Link to={`/produto/${product.id}`} className="block relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.badge && (
          <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${badgeStyles[product.badge]}`}>
            {product.badge === "promoção" ? `-${discount}%` : product.badge.toUpperCase()}
          </span>
        )}
        <button
          className={`absolute top-3 right-3 p-2 bg-card/80 backdrop-blur-sm rounded-full transition-all hover:bg-card ${favorite ? "opacity-100 shadow-sm" : "md:opacity-0 group-hover:opacity-100"}`}
          onClick={(e) => { 
            e.preventDefault(); 
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          aria-pressed={favorite}
        >
          <Heart className={`h-4 w-4 transition-colors ${favorite ? "fill-primary text-primary" : "text-muted-foreground hover:text-primary"}`} />
        </button>

      </Link>

      <div className="p-4 space-y-2">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{product.brand}</p>
        <Link to={`/produto/${product.id}`}>
          <h3 className="font-semibold text-sm text-foreground leading-snug line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? "fill-pet-amber text-pet-amber" : "text-border"}`} />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through block">R$ {product.originalPrice.toFixed(2)}</span>
            )}
            <span className="text-lg font-bold text-primary">R$ {product.price.toFixed(2)}</span>
          </div>
          <button
            onClick={() => addItem(product)}
            className="p-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity shadow-primary"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
