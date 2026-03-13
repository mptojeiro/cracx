import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    category: "Producto",
    items: [
      { q: "¿Qué son exactamente los caramelos Cracx?", a: "Son deliciosos caramelos sin azúcar endulzados con Xilitol. Mientras los disfrutas, el Xilitol ayuda a prevenir la placa bacteriana y protege tus dientes, ofreciendo un cuidado dental sabroso y divertido." },
      { q: "¿Tienen fecha de caducidad?", a: "Los caramelos Cracx mantienen sus propiedades y frescor hasta por 24 meses conservados en lugar fresco y seco." },
      { q: "¿Pueden usarlos los niños?", a: "¡Por supuesto! Son ideales para niños a partir de 3 años, ofreciendo una alternativa saludable, sabrosa y divertida a los dulces tradicionales azucarados." },
      { q: "¿Cuántos caramelos Cracx vienen en cada caja?", a: "Cada caja de Cracx contiene 25 caramelos, perfectos para disfrutar en casa o llevarlos contigo a cualquier parte." }
    ]
  },
  {
    category: "Ingredientes",
    items: [
      { q: "¿Qué ingredientes contienen?", a: "Los ingredientes principales son: carbonato de calcio, bicarbonato de sodio, xilitol, aceite esencial de menta/arándano/fresa (según sabor), fluoruro de sodio, sílice, goma xantana y extracto de stevia. Todos de origen natural y certificados veganos." },
      { q: "¿Son veganas y cruelty-free?", a: "Absolutamente. Todos nuestros productos son 100% veganos y nunca testamos en animales. Contamos con certificación Leaping Bunny y Vegan Society." },
      { q: "¿Contienen gluten o alérgenos?", a: "No. Nuestras pastillas están libres de gluten, lácteos, soja, frutos secos y todos los alérgenos principales. Se fabrican en una instalación libre de alérgenos." },
    ],
  },
  {
    category: "Envío y Pedidos",
    items: [
      { q: "¿Cuánto tarda el envío?", a: "Envío estándar: 3-5 días laborables en España peninsular. Envío express (24-48h) disponible por un coste adicional. Enviamos a toda Europa con plazos de 5-10 días laborables." },
      { q: "¿El envío es gratuito?", a: "Sí, el envío estándar es gratuito para todos los pedidos dentro de España peninsular. Para Canarias, Baleares y resto de Europa se aplica un pequeño coste de envío." },
      { q: "¿Puedo devolver el producto?", a: "Ofrecemos una garantía de satisfacción de 30 días. Si no estás contento con tu compra, te devolvemos el 100% del importe sin preguntas. Solo contacta a nuestro equipo de soporte." },
      { q: "¿Tienen suscripción?", a: "Sí, puedes suscribirte para recibir tus mezclas favoritas de Cracx cada mes con un 20% de descuento. Puedes pausar o cancelar en cualquier momento sin compromiso." },
      { q: "¿A qué países realizan envíos?", a: "Actualmente enviamos a España, Portugal, Francia, Italia y Alemania. Los envíos a la Península tardan de 24 a 48 horas en llegar." },
      { q: "¿Aceptan devoluciones?", a: "Sí, contamos con una garantía de satisfacción de 30 días. Si no estás 100% satisfecho con tus Cracx, te devolveamos el dinero, sin procesos tediosos." }
    ]
  },
  {
    category: "Impacto Ambiental",
    items: [
      { q: "¿Cuál es su compromiso ecológico?", a: "Cada producto Cracx se fabrica con estándares ecológicos, minimizando el impacto ambiental en comparación con otros dulces industriales. Compensamos el 100% de nuestras emisiones de transporte." },
      { q: "¿Los empaques son biodegradables?", a: "Sí, usamos cajas compactas 100% reciclables. Adiós a los plásticos innecesarios que tardan cientos de años en descomponerse." }
    ]
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-gradient-hero pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-secondary text-secondary-foreground text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              Centro de Ayuda
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6">
              Preguntas <span className="text-gradient-mint">frecuentes</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Todo lo que necesitas saber sobre Cracx. ¿No encuentras tu respuesta? Escríbenos.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          {faqs.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1 }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">{cat.category}</h2>
              <Accordion type="single" collapsible className="space-y-3">
                {cat.items.map((item, i) => (
                  <AccordionItem key={i} value={`${cat.category}-${i}`} className="bg-card rounded-xl border border-border px-6">
                    <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA contacto */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="bg-primary rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
                ¿Tienes otra pregunta?
              </h2>
              <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
                Nuestro equipo está listo para ayudarte. Respuesta en menos de 24 horas.
              </p>
              <a
                href="/contacto"
                className="inline-block bg-primary-foreground text-primary px-8 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                Contactar
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
