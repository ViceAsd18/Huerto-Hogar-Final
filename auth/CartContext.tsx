import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Producto } from "services/productos";

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
    // 1. Inicializamos leyendo de localStorage para no perder datos al recargar
    const [carrito, setCarrito] = useState<CartItem[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("carrito_compras");
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem("carrito_compras", JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlCarrito = (producto: Producto, cantidad = 1) => {
        setCarrito(prev => {
            const existe = prev.find(item => item.id_producto === producto.id_producto);
            if (existe) {
                return prev.map(item =>
                    item.id_producto === producto.id_producto
                        ? { ...item, cantidad: item.cantidad + cantidad }
                        : item
                );
            } else {
                return [...prev, { ...producto, cantidad }];
            }
        });
    };

    // Función para quitar un producto
    const eliminarDelCarrito = (id: number) => {
        setCarrito(prev => prev.filter(item => item.id_producto !== id));
    };

    // Función para cambiar cantidad desde el input
    const actualizarCantidad = (id: number, cantidad: number) => {
        setCarrito(prev =>
            prev.map(item => item.id_producto === id ? { ...item, cantidad } : item)
        );
    };

    const limpiarCarrito = () => {
        setCarrito([]);
    };

    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    return (
        <CartContext.Provider value={{
            carrito,
            agregarAlCarrito,
            eliminarDelCarrito,
            actualizarCantidad,
            limpiarCarrito,
            total,
            cantidadTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
    return ctx;
};