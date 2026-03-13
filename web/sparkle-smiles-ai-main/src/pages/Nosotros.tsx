import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Heart, Globe, Users, Award } from "lucide-react";
import heroProduct from "@/assets/cracx-group.jpg";

const values = [
  { icon: Heart, title: "Pasión por la Salud", desc: "Creemos que una buena salud bucal es la base del bienestar general." },
  { icon: Globe, title: "Compromiso Ecológico", desc: "Cada decisión que tomamos prioriza el impacto positivo en el planeta." },
  { icon: Users, title: "Comunidad Primero", desc: "Más de 50.000 familias ya confían en nosotros para su cuidado dental diario." },
  { icon: Award, title: "Calidad Premium", desc: "Ingredientes certificados, producción ética y estándares farmacéuticos." },
];

const team = [
  { name: "Dr. Elena Voss", role: "Fundadora & Directora Científica", bio: "Odontóloga con 15 años de experiencia en formulación de productos dentales naturales." },
  { name: "Miguel Torres", role: "Director de Producto", bio: "Ex-ingeniero químico que dejó la industria farmacéutica para crear soluciones sostenibles." },
  { name: "Laura Chen", role: "Directora de Sostenibilidad", bio: "Experta en empaques biodegradables y cadenas de suministro éticas." },
];

const Nosotros = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-hero pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-secondary text-secondary-foreground text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              Nuestra Historia
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6">
              Reinventando el cuidado <span className="text-gradient-mint">dental</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Nacimos en 2023 con una misión clara: ofrecer una alternativa de placer dulce
              que realmente funcione y sea saludable. Hoy, cada caramelo Cracx representa
              nuestro compromiso con tu sonrisa y con el bienestar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src={heroProduct} alt="Producto Cracx" className="w-full max-w-md mx-auto animate-float rounded-2xl shadow-2xl" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                Nuestra <span className="text-gradient-mint">misión</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Hacer que el cuidado dental sea un placer sin culpas.
                Queremos que disfrutes de sabores deliciosos mientras el Xilitol
                protege tus dientes contra las caries.
              </p>
              <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                Nuestra <span className="text-gradient-mint">visión</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Un mundo donde cada sonrisa cuente — para la persona que sonríe y para el planeta
                que la sostiene. Para 2030, queremos haber evitado 100 millones de tubos de plástico.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-24 bg-gradient-section">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nuestros <span className="text-gradient-mint">valores</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-5">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              El equipo detrás de <span className="text-gradient-mint">Cracx</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-card rounded-2xl p-8 border border-border text-center"
              >
                <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-5 flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-primary">{t.name.charAt(0)}{t.name.split(" ")[1]?.charAt(0)}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{t.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">{t.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{t.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Nosotros;
