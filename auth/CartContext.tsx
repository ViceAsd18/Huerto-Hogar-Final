import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Producto } from "services/productos";
import { useAuth } from "auth/AuthContext";

export type CartItem = Producto & { cantidad: number };

interface CartContextType {
  carrito: CartItem[];
  agregarAlCarrito: (producto: Producto, cantidad?: number) => void;
  eliminarDelCarrito: (id: number) => void;
  actualizarCantidad: (id: number, cantidad: number) => void;
  limpiarCarrito: () => void;
  total: number;
  cantidadTotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();

    console.log("🔑 Usuario actual:", user);

    const KEY = `carrito_${user?.id_usuario ?? "anon"}`;
    console.log("🎯 KEY generada:", KEY);

    const [carrito, setCarrito] = useState<CartItem[]>([]);

  // CARGAR carrito al cambiar usuario
    useEffect(() => {
        if (typeof window === "undefined") return;

        console.log("📥 Cargando carrito desde localStorage con KEY:", KEY);

        try {
        const saved = localStorage.getItem(KEY);

        setCarrito(saved ? JSON.parse(saved) : []);

        } catch (err) {
        setCarrito([]);
        }
    }, [KEY]);

    // GUARDAR carrito
    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
        localStorage.setItem(KEY, JSON.stringify(carrito));
        } catch (err) {
        console.error("💥 ERROR guardando localStorage:", err);
        }
    }, [carrito, KEY]);

    // AGREGAR
    const agregarAlCarrito = (producto: Producto, cantidad = 1) => {
        console.log("🛒 AGREGAR", producto.nombre_producto, "cantidad:", cantidad);

        setCarrito(prev => {
        console.log("📌 Carrito antes:", prev);

        const existe = prev.find(item => item.id_producto === producto.id_producto);

        const newState = existe
            ? prev.map(item =>
                item.id_producto === producto.id_producto
                ? { ...item, cantidad: item.cantidad + cantidad }
                : item
            )
            : [...prev, { ...producto, cantidad }];

        console.log("📌 Carrito después:", newState);

        return newState;
        });
    };

    const eliminarDelCarrito = (id: number) => {
        setCarrito(prev => prev.filter(item => item.id_producto !== id));
    };

    const actualizarCantidad = (id: number, cantidad: number) => {
        setCarrito(prev =>
        prev.map(item => item.id_producto === id ? { ...item, cantidad } : item)
        );
    };

    const limpiarCarrito = () => {
        setCarrito([]);
    };

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);


    return (
        <CartContext.Provider
        value={{
            carrito,
            agregarAlCarrito,
            eliminarDelCarrito,
            actualizarCantidad,
            limpiarCarrito,
            total,
            cantidadTotal
        }}
        >
        {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
    return ctx;
};
