import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroBanner = () => (
  <section className="relative overflow-hidden min-h-[520px] md:min-h-[600px] flex items-center">
    <div className="absolute inset-0">
      <img src={heroBanner} alt="Pets felizes" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-xl space-y-6"
      >
        <span className="inline-block bg-primary/20 text-primary font-bold text-sm px-4 py-1.5 rounded-full backdrop-blur-sm border border-primary/30">
          🐾 Novidades da semana
        </span>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-card leading-tight">
          Tudo para a <span className="text-gradient-primary">felicidade</span> do seu pet
        </h1>
        <p className="text-lg text-card/80 max-w-md">
          Produtos premium com até <strong className="text-primary">30% de desconto</strong>. Frete grátis acima de R$ 199!
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-3.5 rounded-lg hover:opacity-90 transition-opacity shadow-primary text-base"
          >
            Ver Produtos <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            to="/produtos?badge=promoção"
            className="inline-flex items-center gap-2 bg-card/10 backdrop-blur-sm border border-card/30 text-card font-bold px-8 py-3.5 rounded-lg hover:bg-card/20 transition-colors text-base"
          >
            Ofertas 🔥
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroBanner;
