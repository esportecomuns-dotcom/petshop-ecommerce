import HeroBanner from "@/components/HeroBanner";
import CategoryGrid from "@/components/CategoryGrid";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/contexts/ProductsContext";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  const { products } = useProducts();
  useSEO("Home", "Tudo para o seu pet com o melhor preço e entrega rápida.");
  
  const featured = products.filter((p) => p.badge === "mais vendido").slice(0, 4);
  const onSale = products.filter((p) => p.badge === "promoção").slice(0, 4);


  return (
    <main>
      <HeroBanner />
      <Benefits />
      <CategoryGrid />

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground">Mais Vendidos</h2>
              <p className="text-muted-foreground mt-1">Os favoritos dos nossos clientes</p>
            </div>
            <Link to="/produtos" className="hidden md:inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline">
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* On Sale */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground">🔥 Ofertas</h2>
              <p className="text-muted-foreground mt-1">Aproveite os melhores preços</p>
            </div>
            <Link to="/produtos?badge=promoção" className="hidden md:inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline">
              Ver todas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {onSale.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Index;
