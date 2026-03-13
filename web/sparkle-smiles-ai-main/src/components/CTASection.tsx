import { useState } from "react";
import { motion } from "framer-motion";
import CheckoutModal from "./CheckoutModal";
import { useCart } from "@/context/CartContext";
import cracxGroup from "@/assets/cracx-group.jpg";

const CTASection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  const handleBuyPack = (planName: string, price: number) => {
    addToCart({
      id: planName.toLowerCase().replace(" ", "-"),
      name: `Mix ${planName}`,
      price: price,
      quantity: 1,
      image: cracxGroup
    });
    setIsModalOpen(true);
  };

  return (
    <section id="comprar" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Disfruta tus Cracx hoy
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-lg mx-auto mb-8">
              Pide tus caramelos saludables sin riesgo. Envío gratis y garantía de satisfacción.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={(e) => { e.preventDefault(); handleBuyPack("Paquete Básico", 8.99); }}
                className="bg-primary-foreground text-primary px-8 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                Pack Inicial — €8.99
              </button>
              <button
                onClick={(e) => { e.preventDefault(); handleBuyPack("Paquete Familiar", 24.99); }}
                className="border-2 border-primary-foreground/30 text-primary-foreground px-8 py-3.5 rounded-full font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                Pack Familiar — €24.99
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default CTASection;
