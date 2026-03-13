import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CheckoutModal from "./CheckoutModal";
import cracxLogo from "@/assets/cracx-logo.png";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartCount } = useCart();

  const links = [
    { label: "Beneficios", href: "/#beneficios" },
    { label: "Sabores", href: "/#sabores" },
    { label: "Ingredientes", href: "/ingredientes" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "FAQ", href: "/faq" },
    { label: "Contacto", href: "/contacto" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <a href="/" className="flex items-center">
          <img src={cracxLogo} alt="Cracx Logo" className="h-10 object-contain" />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => setIsModalOpen(true)}
            className="relative bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <ShoppingCart size={18} />
            <span>Mi Cesta</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setIsOpen(false); setIsModalOpen(true); }}
                className="relative bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold text-center flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                <span>Mi Cesta</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
