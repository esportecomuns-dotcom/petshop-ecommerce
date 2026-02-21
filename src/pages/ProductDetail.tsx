import { useParams, Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/contexts/ProductsContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Star, ShoppingCart, Heart, ChevronRight, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { toggleFavorite, isFavorite } = useWishlist();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();

  const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-6xl mb-4">🐾</p>
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">Produto não encontrado</h1>
          <Link to="/produtos" className="text-primary font-semibold hover:underline">Voltar aos produtos</Link>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id && (p.category === product.category || p.animal === product.animal)).slice(0, 4);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/produtos" className="hover:text-primary">Produtos</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-2xl"
            />
            {product.badge === "promoção" && (
              <span className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-sm font-bold px-4 py-1.5 rounded-full">
                -{discount}% OFF
              </span>
            )}
          </div>

          {/* Info */}
          <div className="space-y-5">
            <div>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{product.brand}</p>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1">{product.name}</h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-pet-amber text-pet-amber" : "text-border"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviewCount} avaliações)</span>
            </div>

            <div className="flex items-end gap-3">
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">R$ {product.originalPrice.toFixed(2)}</span>
              )}
              <span className="text-3xl font-bold text-primary">R$ {product.price.toFixed(2)}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              ou 3x de R$ {(product.price / 3).toFixed(2)} sem juros
            </p>

            <p className="text-foreground/80 leading-relaxed">{product.description}</p>

            {/* Variations */}
            {product.variations?.map((v) => (
              <div key={v.label}>
                <p className="text-sm font-semibold text-foreground mb-2">{v.label}:</p>
                <div className="flex flex-wrap gap-2">
                  {v.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedVariations((prev) => ({ ...prev, [v.label]: opt }))}
                      className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                        selectedVariations[v.label] === opt
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-foreground hover:border-primary/50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2.5 text-foreground hover:bg-muted transition-colors rounded-l-lg">−</button>
                <span className="px-4 py-2.5 font-bold text-foreground border-x border-border min-w-[3rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2.5 text-foreground hover:bg-muted transition-colors rounded-r-lg">+</button>
              </div>
              <button
                onClick={() => { for (let i = 0; i < quantity; i++) addItem(product, selectedVariations); }}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3.5 rounded-lg hover:opacity-90 transition-opacity shadow-primary"
              >
                <ShoppingCart className="h-5 w-5" /> Adicionar ao Carrinho
              </button>
              <button 
                onClick={() => product && toggleFavorite(product.id)}
                className={`p-3 border rounded-lg transition-colors ${
                  product && isFavorite(product.id) ? "border-primary bg-primary/10" : "border-border hover:bg-accent"
                }`}
                aria-label="Favoritar"
              >
                <Heart className={`h-5 w-5 ${product && isFavorite(product.id) ? "fill-primary text-primary" : "text-muted-foreground"}`} />
              </button>

            </div>

            {/* Mini benefits */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
              {[
                { icon: Truck, text: "Frete grátis acima de R$199" },
                { icon: ShieldCheck, text: "Compra segura" },
                { icon: RotateCcw, text: "Troca em 30 dias" },
              ].map((b) => (
                <div key={b.text} className="flex flex-col items-center text-center gap-1.5">
                  <b.icon className="h-5 w-5 text-secondary" />
                  <span className="text-xs text-muted-foreground">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">Produtos Relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;
