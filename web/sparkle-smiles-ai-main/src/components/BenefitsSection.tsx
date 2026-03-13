import { motion } from "framer-motion";
import { Sparkles, Shield, Leaf, Droplets } from "lucide-react";

const benefits = [
  {
    icon: Sparkles,
    title: "100% Xilitol",
    description: "Endulzados naturalmente con Xilitol, combaten las bacterias causantes de las caries.",
  },
  {
    icon: Shield,
    title: "Protección Total",
    description: "Fortalece el esmalte y protege tus dientes mientras disfrutas del sabor dulce.",
  },
  {
    icon: Leaf,
    title: "Sin Azúcar",
    description: "La alternativa saludable perfecta. Todo el sabor sin remordimientos ni daños dentales.",
  },
  {
    icon: Droplets,
    title: "Frescura y Sabor",
    description: "Cuatro increíbles sabores que mantienen tu boca fresca y equilibrada durante horas.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const BenefitsSection = () => {
  return (
    <section id="beneficios" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            ¿Por qué <span className="text-gradient-mint">Cracx</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            El verdadero placer de cuidarse de forma saludable y deliciosa.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((b) => (
            <motion.div
              key={b.title}
              variants={item}
              className="bg-card rounded-2xl p-8 border border-border hover:shadow-xl hover:shadow-primary/5 transition-shadow group"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <b.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">{b.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{b.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
