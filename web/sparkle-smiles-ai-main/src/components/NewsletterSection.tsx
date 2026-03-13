import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "¡Suscripción exitosa!", description: "Recibirás nuestras novedades y ofertas exclusivas." });
    setEmail("");
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-secondary rounded-3xl p-10 md:p-14 max-w-3xl mx-auto text-center"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">
            Únete a la comunidad <span className="text-gradient-mint">Cracx</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            Recibe ofertas exclusivas, consejos de salud dental y sé el
            primero en probar nuevos sabores dulces.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="flex-1 px-5 py-3.5 rounded-full bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Suscribirme
            </button>
          </form>
          <p className="text-muted-foreground text-xs mt-4">Sin spam. Puedes cancelar en cualquier momento.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
