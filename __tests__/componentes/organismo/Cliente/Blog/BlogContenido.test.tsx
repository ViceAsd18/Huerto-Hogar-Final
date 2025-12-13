import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BlogContenido from "../../../../../componentes/organismo/Cliente/Blog/BlogContenido";

describe("BlogContenido Component", () => {
    const mockProps = {
        autor: "Juan Pérez",
        fecha: "10 Diciembre 2024",
        minutoLectura: 5,
        contenido: {
            parrafoPrincipal: "Este es el párrafo principal del blog.",
            subtituloUno: "Sección Uno",
            parrafoDos: "Este es el segundo párrafo.",
            lista: ["Punto uno", "Punto dos", "Punto tres"],
            cita: "Una cita inspiradora sobre huertos.",
            subtituloDos: "Sección Final",
            parrafoFinal: "Párrafo de conclusión.",
            imagenFinal: "/imagen-final.jpg",
        },
    };

    it("debe renderizar la información del autor, fecha y tiempo de lectura", () => {
        render(<BlogContenido {...mockProps} />);

        expect(screen.getByText(/Juan Pérez/)).toBeInTheDocument();
        expect(screen.getByText(/10 Diciembre 2024/)).toBeInTheDocument();
        expect(screen.getByText(/5 mínutos de lectura/)).toBeInTheDocument();
    });

    it("debe renderizar el párrafo principal", () => {
        render(<BlogContenido {...mockProps} />);

        expect(screen.getByText(mockProps.contenido.parrafoPrincipal)).toBeInTheDocument();
    });

    it("debe renderizar el primer subtítulo y párrafo", () => {
        render(<BlogContenido {...mockProps} />);

        expect(screen.getByText(mockProps.contenido.subtituloUno)).toBeInTheDocument();
        expect(screen.getByText(mockProps.contenido.parrafoDos)).toBeInTheDocument();
    });

    it("debe renderizar la lista de puntos", () => {
        render(<BlogContenido {...mockProps} />);

        mockProps.contenido.lista?.forEach((item) => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
    });

    it("debe renderizar la cita", () => {
        render(<BlogContenido {...mockProps} />);

        expect(screen.getByText(mockProps.contenido.cita)).toBeInTheDocument();
    });

    it("debe renderizar el segundo subtítulo y párrafo final", () => {
        render(<BlogContenido {...mockProps} />);

        expect(screen.getByText(mockProps.contenido.subtituloDos)).toBeInTheDocument();
        expect(screen.getByText(mockProps.contenido.parrafoFinal)).toBeInTheDocument();
    });

    it("debe renderizar la imagen final con atributo alt", () => {
        render(<BlogContenido {...mockProps} />);

        const imagen = screen.getByAltText("Imagen final");
        expect(imagen).toBeInTheDocument();
        expect(imagen).toHaveAttribute("src", mockProps.contenido.imagenFinal);
    });

    it("debe no renderizar elementos opcionales cuando no existen", () => {
        const propsMinimos = {
            autor: "Autor",
            fecha: "Fecha",
            minutoLectura: 1,
            contenido: {
                parrafoPrincipal: "Solo párrafo principal",
            },
        };

        render(<BlogContenido {...propsMinimos} />);

        expect(screen.getByText("Solo párrafo principal")).toBeInTheDocument();
        expect(screen.queryByText(/Sección/)).not.toBeInTheDocument();
    });
});
