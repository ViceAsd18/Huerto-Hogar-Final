import Titulo from "componentes/atomos/Titulo";
import BlogCard from "componentes/moleculas/Cliente/Blog/BlogCard";
import Texto from "componentes/atomos/Texto";

const posts = [
    {
        id: 1,
        titulo: "5 Consejos Esenciales del Riego",
        categoria: "Tendencias",
        fecha: "02 Oct, 2025",
        descripcion: "Aprende la frecuencia ideal y las técnicas clave para mantener tus plantas sanas sin desperdiciar agua.",
        imagen: "/assets/img/blog/regando.jpg"
    },
    {
        id: 2,
        titulo: "El Arte de Cosechar Tomates: Guía Completa",
        categoria: "Novedades",
        fecha: "20 Oct, 2025",
        imagen: "/assets/img/blog/tomate.jpg"
    },
    {
        id: 3,
        titulo: "Taller de Huerto Urbano",
        categoria: "Eventos",
        fecha: "18 Oct, 2025",
        imagen: "/assets/img/blog/huertourbano.jpg"
    },
    {
        id: 4,
        titulo: "Receta: Salsa de Tomate Casera",
        categoria: "Novedades",
        fecha: "15 Oct, 2025",
        imagen: "/assets/img/blog/salsatomate.jpg"
    }
];


const BlogDestacados = () => {
    const principal = posts[0];
    const superior = posts[1];
    const inferior1 = posts[2];
    const inferior2 = posts[3];

    const seccionStyle: React.CSSProperties = {
        padding: "60px 20px",
        margin: "0 auto",
    };

    const grid: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: 20,
        height: 600,
        marginTop: 40,
    };

    return (
        <section style={seccionStyle}>

            <Titulo nivel={1}>Actualidad HuertoHogar</Titulo>
            <Texto>Novedades, recetas y eventos de nuestra comunidad.</Texto>

            <div style={grid} className="blog-grid">
                <div style={{ gridColumn: "1 / 2", gridRow: "1 / 3" }}>
                    <BlogCard {...principal} esPrincipal  linkTo="/cliente/detalle-blog/1"/>
                </div>

                <div style={{ gridColumn: "2 / 4", gridRow: "1 / 2" }}>
                    <BlogCard {...superior} linkTo="/cliente/detalle-blog/2"/>
                </div>

                <div style={{ gridColumn: "2 / 3", gridRow: "2 / 3" }}>
                    <BlogCard {...inferior1} linkTo="/cliente/detalle-blog/3"/>
                </div>

                <div style={{ gridColumn: "3 / 4", gridRow: "2 / 3" }}>
                    <BlogCard {...inferior2} linkTo="/cliente/detalle-blog/4"/>
                </div>
            </div>
        </section>
    );
};

export default BlogDestacados;

