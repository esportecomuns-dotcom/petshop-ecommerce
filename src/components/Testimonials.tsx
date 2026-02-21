import { Star } from "lucide-react";
import { testimonials } from "@/data/products";
import { motion } from "framer-motion";

const Testimonials = () => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-display font-bold text-foreground">O que dizem nossos clientes</h2>
        <p className="text-muted-foreground mt-2">Mais de 10.000 pets felizes!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl border border-border p-6 shadow-card"
          >
            <div className="flex gap-1 mb-3">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-pet-amber text-pet-amber" />
              ))}
            </div>
            <p className="text-foreground text-sm leading-relaxed mb-4">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {t.avatar}
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.pet}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
