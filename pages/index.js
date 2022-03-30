import Layout from "../layout/Layout"
import Producto from "../components/Producto"
import useQuiesco from "../hooks/useQuiesco"

export default function Home() {

  const {categoriaActual} = useQuiesco()
  // console.log(categoriaActual.nombre)

  return (
   <Layout pagina={`Menu ${categoriaActual?.nombre}`}>
     <h1 className='font-black text-4xl'>{categoriaActual?.nombre}</h1>
     <p className='text-2xl my-10'>Elige y personaliza tuy pedido a continuacion</p>

      <div className='grid gab-4 grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>

          {categoriaActual?.productos?.map(producto => (
            <Producto key={producto.id} producto={producto} />
        ))}

        

      </div>

   </Layout>
    )

}

