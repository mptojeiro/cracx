import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { Trash2 } from "lucide-react";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CheckoutModal = ({ isOpen, onClose }: CheckoutModalProps) => {
    const { toast } = useToast();
    const { cart, cartTotal, removeFromCart, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        telefono: "",
        email: "",
        direccion: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const normalizePhone = (phone: string) => {
        // Eliminar todo lo que no sea dígito
        let cleanPhone = phone.replace(/\D/g, "");

        // Si el usuario puso el +34, ya estará como 34... al quitar el +
        // Si tiene 9 dígitos (España sin prefijo), le añadimos el 34
        if (cleanPhone.length === 9) {
            cleanPhone = "34" + cleanPhone;
        }

        return cleanPhone;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const normalizedPhone = normalizePhone(formData.telefono);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10,15}$/; // Aceptamos entre 10 y 15 dígitos para cubrir internacionales con prefijo

        // Validaciones avanzadas
        if (!formData.nombre.trim() || !formData.direccion.trim()) {
            toast({
                title: "Faltan datos",
                description: "Por favor, completa tu nombre y dirección de envío.",
                variant: "destructive"
            });
            return;
        }

        if (!emailRegex.test(formData.email)) {
            toast({
                title: "Email inválido",
                description: "Por favor, introduce un correo electrónico válido.",
                variant: "destructive"
            });
            return;
        }

        if (!phoneRegex.test(normalizedPhone)) {
            toast({
                title: "Teléfono inválido",
                description: "El formato del teléfono no es correcto. Asegúrate de incluir 9 dígitos (o prefijo).",
                variant: "destructive"
            });
            return;
        }

        if (cart.length === 0) {
            toast({
                title: "Cesta vacía",
                description: "Añade al menos un sabor a tu cesta antes de finalizar.",
                variant: "destructive"
            });
            return;
        }

        setLoading(true);

        try {
            const orderId = `ORD-${Math.floor(Math.random() * 100000)}`;
            const total = cartTotal.toFixed(2);
            const products = cart.map((c) => `${c.quantity}x ${c.name}`).join(", ");

            const response = await fetch("https://cracx.onrender.com/webhook/new-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId,
                    customerName: formData.nombre,
                    customerPhone: normalizedPhone,
                    customerEmail: formData.email,
                    customerAddress: formData.direccion,
                    products,
                    total,
                    trackingLink: `https://envios.cracx.com/track/${orderId}`
                })
            });

            if (!response.ok) throw new Error("Error en la petición POST");

            const result = await response.json();

            if (result.success) {
                toast({
                    title: "¡Pedido recibido! 🎉",
                    description: "Hemos guardado tu pedido correctamente. Busca tu correo de confirmación con el link de seguimiento.",
                });
                clearCart();
                onClose();
            } else {
                throw new Error("El backend devolvió error");
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error al procesar",
                description: "Hubo un problema procesando tu compra. Por favor, inténtalo más tarde.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Completar Pedido - Cracx</DialogTitle>
                    <DialogDescription>
                        Estás a punto de pedir {cart.length} producto(s). Déjanos tus datos para enviártelo.
                    </DialogDescription>
                </DialogHeader>

                {cart.length > 0 && (
                    <div className="bg-muted/50 p-3 rounded-xl mt-4 max-h-40 overflow-y-auto">
                        <ul className="space-y-3">
                            {cart.map((item) => (
                                <li key={item.id} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3">
                                        {item.image && <img src={item.image} alt={item.name} className="w-10 h-10 rounded-md object-cover" />}
                                        <div>
                                            <p className="font-semibold text-foreground">{item.name}</p>
                                            <p className="text-muted-foreground">{item.quantity} x €{item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <button type="button" onClick={() => removeFromCart(item.id)} className="text-destructive hover:opacity-70">
                                        <Trash2 size={16} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between font-bold text-foreground mt-4 pt-3 border-t">
                            <span>Total</span>
                            <span>€{cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Nombre completo *</label>
                        <Input name="nombre" placeholder="Ej. Juan Pérez" value={formData.nombre} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">WhatsApp (con prefijo +34) *</label>
                        <Input name="telefono" type="tel" placeholder="+34 600 000 000" value={formData.telefono} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Dirección de envío completa *</label>
                        <Input name="direccion" type="text" placeholder="Calle Falsa 123, 1A, 28000 Madrid" value={formData.direccion} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email *</label>
                        <Input name="email" type="email" placeholder="hola@cracx.com" value={formData.email} onChange={handleChange} required />
                    </div>
                    <Button type="submit" className="w-full bg-primary text-primary-foreground mt-6 hover:opacity-90 transition-opacity" disabled={loading || cart.length === 0}>
                        {loading ? "Procesando..." : `Pagar €${cartTotal.toFixed(2)} de forma Segura`}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CheckoutModal;
