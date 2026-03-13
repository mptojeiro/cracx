import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "María García",
    text: "Después de 2 semanas mis dientes se ven notablemente más blancos. ¡Y el sabor a menta es increíble!",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    text: "Perfecto para viajar. Ya no cargo tubos de pasta. Una pastillita y listo. Mis encías están mucho mejor.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    text: "A mi hija le encanta el sabor a fresa. Ahora se lava los dientes sin protestar. ¡Gracias DentaTab!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="opiniones" className="py-24 bg-gradient-section">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Lo que dicen nuestros <span className="text-gradient-mint">clientes</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="bg-card rounded-2xl p-8 border border-border shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
              <p className="font-semibold text-foreground text-sm">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
