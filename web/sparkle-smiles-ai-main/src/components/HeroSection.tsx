import { motion } from "framer-motion";
import heroProduct from "@/assets/cracx-group.jpg";

const HeroSection = () => {
  return (
    <section className="bg-gradient-hero pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 text-center lg:text-left"
        >
          <span className="inline-block bg-secondary text-secondary-foreground text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            100% Natural con Xilitol
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
            ¡Bienvenidos <br />
            <span className="text-gradient-mint">cracx!</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
            Caramelos saludables que cuidan tus dientes con Xilitol.
            Sin azúcar. Cierra los ojos y disfruta de la esencia pura de Cracx.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#sabores"
              className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-semibold text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              Descubre los Sabores
            </a>
            <a
              href="#como-usar"
              className="border-2 border-primary text-primary px-8 py-3.5 rounded-full font-semibold text-base hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Cómo Funciona
            </a>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 flex justify-center"
        >
          <img
            src={heroProduct}
            alt="Cracx - Caramelos saludables de Xilitol premium en 4 sabores"
            className="w-80 md:w-96 lg:w-[28rem] animate-float drop-shadow-2xl rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
