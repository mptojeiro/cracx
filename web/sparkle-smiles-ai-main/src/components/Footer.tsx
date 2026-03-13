import cracxLogo from "@/assets/cracx-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="/" className="flex items-center">
          <img src={cracxLogo} alt="Cracx Logo" className="h-8 object-contain" />
        </a>
        <p className="text-muted-foreground text-sm">
          © 2026 Cracx. Todos los derechos reservados.
        </p>
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <a href="/nosotros" className="hover:text-primary transition-colors">Nosotros</a>
          <a href="/ingredientes" className="hover:text-primary transition-colors">Ingredientes</a>
          <a href="/faq" className="hover:text-primary transition-colors">FAQ</a>
          <a href="/contacto" className="hover:text-primary transition-colors">Contacto</a>
          <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
          <a href="#" className="hover:text-primary transition-colors">Términos</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
