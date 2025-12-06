import ClienteLayout from "componentes/layout/ClienteLayout"
import GaleriaImagenes from "componentes/organismo/Cliente/Nosotros/GaleriaImagenes";
import Hero from "componentes/organismo/Cliente/Nosotros/Hero";
import Proposito from "componentes/organismo/Cliente/Nosotros/Proposito";

const HeroBackground = "/assets/img/nosotros/banner-nosotros.jpg";

const titulo = 'Nuestra Historia: Del campo a tu Hogar';
const parrafo = 'Conectamos a las familias chilenas con la frescura y calidad de nuestros productos agrícolas, cultivados con pasión y dedicación en las fértiles tierras de Chile.';

const NosotrosClientePage = () => {
    return (
        <ClienteLayout>
            <Hero background={HeroBackground} titulo={titulo} subtitulo={parrafo} />
            <Proposito></Proposito>
            <GaleriaImagenes/>
        </ClienteLayout>
    )
}

export default NosotrosClientePage;