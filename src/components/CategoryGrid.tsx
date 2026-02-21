import { Link } from "react-router-dom";
import { categories } from "@/data/products";
import { motion } from "framer-motion";

const CategoryGrid = () => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-display font-bold text-foreground">Categorias</h2>
        <p className="text-muted-foreground mt-2">Encontre o que seu pet precisa</p>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              to={`/produtos?category=${cat.id}`}
              className="flex flex-col items-center gap-3 p-5 bg-card rounded-xl border border-border hover:border-primary/40 hover:shadow-card-hover transition-all group"
            >
              <span className="text-4xl group-hover:animate-float">{cat.icon}</span>
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{cat.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CategoryGrid;
