import { useParams } from "react-router";
import { blogs } from "data/blogsData";
import ClienteLayout from "componentes/layout/ClienteLayout";
import BlogBanner from "componentes/organismo/Cliente/Blog/BlogBanner";
import BlogContenido from "componentes/organismo/Cliente/Blog/BlogContenido";

const DetalleBlogPage = () => {
    const { id } = useParams();
    const blog = blogs.find((b) => b.id === Number(id));

    if (!blog) return <p>Artículo no encontrado</p>;


    return (
        <ClienteLayout>
            
            <BlogBanner
                imagen={blog.imagen}
                categoria={blog.categoria}
                titulo={blog.titulo}
                fecha={blog.fecha}
                autor={blog.autor}
            />

            
            
            <BlogContenido 
                autor={blog.autor} 
                fecha={blog.fecha} 
                minutoLectura={blog.minutoLectura} 
                contenido={blog.contenido}
            />


        </ClienteLayout>
    );
};

export default DetalleBlogPage;
