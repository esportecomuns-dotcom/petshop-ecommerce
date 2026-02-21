import { Truck, ShieldCheck, Headphones, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  { icon: Truck, title: "Frete Rápido", desc: "Entrega em até 2 dias úteis" },
  { icon: ShieldCheck, title: "Compra Segura", desc: "Pagamento 100% protegido" },
  { icon: RotateCcw, title: "Troca Fácil", desc: "Até 30 dias para troca" },
  { icon: Headphones, title: "Suporte 24h", desc: "Atendimento especializado" },
];

const Benefits = () => (
  <section className="py-14 bg-accent/50">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center text-center gap-3 p-6"
          >
            <div className="p-3 bg-primary/10 rounded-full">
              <b.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-foreground text-sm">{b.title}</h3>
            <p className="text-xs text-muted-foreground">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;
