import { motion } from "framer-motion";
import cracxCereza from "@/assets/cracx-cereza.jpg";

const steps = [
  { number: "01", title: "Romper", desc: "Rompe un pedazo de Cracx." },
  { number: "02", title: "Sabor", desc: "Introdúcelo en la boca." },
  { number: "03", title: "Limpieza", desc: "Siente cómo se inunda y se limpia con una experiencia única." },
];

const HowToUseSection = () => {
  return (
    <section id="como-usar" className="py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex flex-col items-center">
          {/* Steps */}
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Una nueva <span className="text-gradient-mint">experiencia</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Disfrutar de Cracx es tan simple y placentero como saborear tu dulce favorito, pero cuidando tu salud dental.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card/50 border border-border rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-colors"
                >
                  <div className="absolute top-0 right-0 -m-8 text-[120px] font-display font-bold text-primary/5 group-hover:text-primary/10 transition-colors pointer-events-none select-none">
                    {step.number}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2 relative z-10">{step.title}</h3>
                  <p className="text-muted-foreground relative z-10">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUseSection;
