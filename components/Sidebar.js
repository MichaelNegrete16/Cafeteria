import Image from "next/image"
import useQuiesco from "../hooks/useQuiesco"
import Categoria from "./Categoria"

const Sidebar = () => {

    const {categorias} = useQuiesco()

    return (
        <>
            <Image width={300} height={100} src="/assets/img/logo.svg" alt="Imagen LogoTipo" />

            {/* <Categoria/> */}

            <nav className="mt-10">
                {categorias.map((categoria) => (
                    // console.log(categoria)
                     <Categoria key={categoria.id} categoria={categoria}/>
                    // <>
                    //     <Image src={`/assets/img/icono_${categoria.icono}.svg`} alt="Imagen Icono Test"/>
                    // </>
                    ))}
            </nav>
        </>
    )
}

export default Sidebar