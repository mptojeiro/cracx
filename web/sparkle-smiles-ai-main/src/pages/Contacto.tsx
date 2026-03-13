import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail, MapPin, Smartphone, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hola@cracx.com", href: "mailto:hola@cracx.com" },
  { icon: Smartphone, label: "WhatsApp", value: "+34 600 000 000", href: "https://wa.me/34600000000" },
  { icon: MapPin, label: "Oficina Central", value: "Calle Verde 45, 28001 Madrid", href: "#" },
];

const Contacto = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "¡Mensaje enviado!", description: "Te responderemos en menos de 24 horas." });
    setForm({ nombre: "", email: "", asunto: "", mensaje: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-gradient-hero pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-secondary text-secondary-foreground text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              Hablemos
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6">
              <span className="text-gradient-mint">Contacta</span> con nosotros
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              ¿Dudas, sugerencias o propuestas? Estamos aquí para escucharte.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 max-w-6xl mx-auto">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">Información de contacto</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nuestro equipo responde en menos de 24 horas. También puedes encontrarnos en redes sociales.
                </p>
              </div>
              <div className="space-y-6">
                {contactInfo.map((c) => (
                  <a key={c.label} href={c.href} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <c.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{c.label}</p>
                      <p className="font-medium text-foreground">{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nombre</label>
                    <input
                      type="text"
                      required
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Asunto</label>
                  <input
                    type="text"
                    required
                    value={form.asunto}
                    onChange={(e) => setForm({ ...form, asunto: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Mensaje</label>
                  <textarea
                    required
                    rows={5}
                    value={form.mensaje}
                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="Cuéntanos más..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Enviar Mensaje
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contacto;
