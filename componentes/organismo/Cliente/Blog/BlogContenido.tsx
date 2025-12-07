interface Props {
    autor: string;
    fecha: string;
    minutoLectura: number;
    contenido: {
        parrafoPrincipal: string;
        subtituloUno?: string;
        parrafoDos?: string;
        lista?: string[];
        cita?: string;
        subtituloDos?: string;
        parrafoFinal?: string;
        imagenFinal?: string;
    };
}

const BlogContenido = ({ autor, fecha, minutoLectura, contenido }: Props) => {

    const contenedorStyle: React.CSSProperties = {
        maxWidth: 900,
        margin: "0 auto",
        padding: "40px 20px",
        lineHeight: 1.7,
        fontSize: 18,
    };

    const metaStyle: React.CSSProperties = {
        opacity: 0.6,
        fontSize: 15,
    };

    const subtituloStyle: React.CSSProperties = {
        fontSize: 26,
        marginTop: 20,
        marginBottom: 10,
        fontWeight: 600
    };

    const citaStyle: React.CSSProperties = {
        borderLeft: "4px solid #5f8f52",
        paddingLeft: 16,
        fontStyle: "italic",
        opacity: 0.85,
        margin: "20px 0"
    };

    const listaStyle: React.CSSProperties = {
        paddingLeft: 22,
        margin: "10px 0 20px 0",
        display: "flex",
        flexDirection: "column",
        gap: 6,
    };

    return (
        <div style={contenedorStyle}>

            <p style={metaStyle}>
                {autor} • {fecha} • {minutoLectura} mínutos de lectura
            </p>



            <p style={{ marginBottom: 18 }}>{contenido.parrafoPrincipal}</p>

            {contenido.subtituloUno && (
                <h2 style={subtituloStyle}>{contenido.subtituloUno}</h2>
            )}

            {contenido.parrafoDos && (
                <p style={{ marginBottom: 15 }}>{contenido.parrafoDos}</p>
            )}

            {contenido.lista && (
                    <ul style={listaStyle}>
                        {contenido.lista.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                )}

            {contenido.imagenFinal && (
                <img
                    src={contenido.imagenFinal}
                    alt="Imagen final"
                    style={{
                        width: "100%",
                        height: 360,
                        objectFit: "cover",
                        borderRadius: 12,
                    }}
                />
            )}

            {contenido.cita && (
                <blockquote style={citaStyle}>{contenido.cita}</blockquote>
            )}

            {contenido.subtituloDos && (
                <h2 style={subtituloStyle}>{contenido.subtituloDos}</h2>
            )}

            {contenido.parrafoFinal && (
                <p style={{ marginBottom: 18 }}>{contenido.parrafoFinal}</p>
            )}

        </div>
    );
};

export default BlogContenido;
