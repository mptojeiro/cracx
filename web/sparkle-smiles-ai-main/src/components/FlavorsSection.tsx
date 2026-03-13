import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import cracxMenta from "@/assets/cracx-menta.jpg";
import cracxCereza from "@/assets/cracx-cereza.jpg";
import cracxSandia from "@/assets/cracx-sandia.jpg";
import cracxLimon from "@/assets/cracx-limon.jpg";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

const flavors = [
  {
    id: "cracx-menta",
    name: "Menta Fresca",
    price: 8.99,
    image: cracxMenta,
    description: "El clásico refrescante. Menta natural para una sensación de limpieza duradera.",
    colorClass: "bg-mint-light border-mint/20",
    dotClass: "bg-mint",
  },
  {
    id: "cracx-cereza",
    name: "Cereza Intensa",
    price: 8.99,
    image: cracxCereza,
    description: "Un sabor potente y dulce que te encantará, como comer fruta recién recolectada.",
    colorClass: "bg-red-50 border-red-200",
    dotClass: "bg-red-500",
  },
  {
    id: "cracx-sandia",
    name: "Sandía Jugosa",
    price: 8.99,
    image: cracxSandia,
    description: "Perfecta para los más dulces. Sabor suave y veraniego sin azúcares añadidos.",
    colorClass: "bg-pink-50 border-pink-200",
    dotClass: "bg-pink-500",
  },
  {
    id: "cracx-limon",
    name: "Limón Cítrico",
    price: 8.99,
    image: cracxLimon,
    description: "El toque ácido ideal. Refrescante, estimulante y perfecto para el día a día.",
    colorClass: "bg-yellow-50 border-yellow-200",
    dotClass: "bg-yellow-400",
  },
];

const FlavorsSection = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (flavor: typeof flavors[0]) => {
    addToCart({
      id: flavor.id,
      name: `Cracx ${flavor.name}`,
      price: flavor.price,
      quantity: 1,
      image: flavor.image,
    });
    toast({
      title: "Agregado a la cesta",
      description: `${flavor.name} agregado correctamente.`,
    });
  };
  return (
    <section id="sabores" className="py-24 bg-gradient-section">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Cuatro sabores, una <span className="text-gradient-mint">misión</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Elige el que más te guste. Todos con Xilitol y zero azúcar para tu salud.
          </p>
        </motion.div>

        <div className="flex justify-center mb-16 opacity-70">
          {/* The image is removed or kept as placeholder if it doesn't fit Cracx. Hiding for now to focus on cards */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {flavors.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`rounded-3xl overflow-hidden flex flex-col bg-white border shadow-sm hover:shadow-xl transition-shadow`}
            >
              <div className="relative aspect-square overflow-hidden bg-white flex items-center justify-center p-4">
                <img src={f.image} alt={f.name} className="object-cover w-full h-full rounded-2xl" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-foreground shadow-sm">
                  €{f.price}
                </div>
              </div>
              <div className={`p-6 flex-1 flex flex-col border-t ${f.colorClass}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-4 h-4 rounded-full ${f.dotClass}`} />
                  <h3 className="font-display text-xl font-bold text-foreground">{f.name}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{f.description}</p>
                <button
                  onClick={() => handleAddToCart(f)}
                  className="w-full bg-foreground text-background flex items-center justify-center gap-2 py-3 rounded-xl font-semibold hover:bg-foreground/90 transition-colors"
                >
                  <ShoppingCart size={18} />
                  Añadir
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlavorsSection;
