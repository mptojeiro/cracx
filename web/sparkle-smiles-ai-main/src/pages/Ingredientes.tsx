import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Leaf, FlaskConical, ShieldCheck, Sparkles, Droplets, Wheat } from "lucide-react";

const ingredients = [
  { icon: Sparkles, name: "Carbonato de Calcio", origin: "Mineral", desc: "Agente limpiador suave que elimina manchas sin dañar el esmalte. Fuente natural de calcio para dientes más fuertes.", safety: "Aprobado por la EMA y la FDA" },
  { icon: ShieldCheck, name: "Hidroxiapatita", origin: "Mineral bioactivo", desc: "El componente principal del esmalte dental. Repara micro-fisuras y remineraliza los dientes de forma natural.", safety: "Usado en odontología clínica" },
  { icon: Leaf, name: "Xilitol", origin: "Abedul finlandés", desc: "Edulcorante natural que inhibe el crecimiento de bacterias causantes de caries. Estimula la producción de saliva.", safety: "Recomendado por la OMS" },
  { icon: FlaskConical, name: "Bicarbonato de Sodio", origin: "Mineral", desc: "Neutraliza ácidos, blanquea suavemente y elimina el mal aliento. Usado en odontología durante más de 100 años.", safety: "Certificado seguro para uso oral" },
  { icon: Droplets, name: "Aceites Esenciales", origin: "Plantas orgánicas", desc: "Menta, arándano o fresa según el sabor. Propiedades antibacterianas naturales y frescura duradera.", safety: "Orgánicos certificados" },
  { icon: Wheat, name: "Sílice Natural", origin: "Cuarzo", desc: "Micro-abrasivo suave que pule la superficie dental sin rayar. Contribuye a una limpieza profunda y uniforme.", safety: "Grado alimentario" },
];

const certifications = [
  "🌱 100% Vegano",
  "🐰 Cruelty-Free (Leaping Bunny)",
  "♻️ Empaque Zero Waste",
  "🇪🇺 Fabricado en la UE",
  "🧪 Testado Dermatológicamente",
  "🌍 Carbono Neutro",
];

const Ingredientes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-gradient-hero pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-secondary text-secondary-foreground text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              Transparencia Total
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6">
              Nuestros <span className="text-gradient-mint">ingredientes</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Solo 6 ingredientes principales. Sin sorpresas, sin químicos agresivos, sin ingredientes 
              que no puedas pronunciar. Aquí está todo lo que contiene cada pastilla.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {ingredients.map((ing, i) => (
              <motion.div
                key={ing.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg hover:shadow-primary/5 transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-5">
                  <ing.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-1">{ing.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">Origen: {ing.origin}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{ing.desc}</p>
                <span className="inline-block bg-mint-light text-primary text-xs font-medium px-3 py-1 rounded-full">
                  {ing.safety}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lo que NO contiene */}
      <section className="py-24 bg-gradient-section">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Lo que <span className="text-accent">NO</span> encontrarás
            </h2>
            <p className="text-muted-foreground text-lg">Eliminamos todo lo que tu boca no necesita.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["SLS / SLES", "Parabenos", "Triclosán", "Microplásticos", "Colorantes artificiales", "Edulcorantes sintéticos", "Dióxido de titanio", "Conservantes químicos"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl border border-border p-4 text-center"
              >
                <span className="text-accent text-xl mb-1 block">✕</span>
                <span className="text-foreground text-sm font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificaciones */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Nuestras <span className="text-gradient-mint">certificaciones</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl border border-border p-6 text-center text-foreground font-medium"
              >
                {cert}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ingredientes;
