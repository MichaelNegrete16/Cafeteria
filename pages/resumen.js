import Layout from "../layout/Layout"
import useQuiesco from "../hooks/useQuiesco"
import ResumenProducto from "../components/ResumenProducto"

export default function Resumen(){
    
    const {pedido} = useQuiesco()

    return(
        <Layout pagina='Resume'>
            <h1 className='text-4xl font-bold'>Resumen</h1>
            <p className='text-2xl my-10'>Revisa tu pedido</p>

            {pedido.length === 0 ? (
                <p className='text-center text-2xl'>No hay elementos en tu pedido</p>
            ) : (
                pedido.map(producto => (
                    <ResumenProducto producto={producto} key={producto.id}/>
                    ))
            )}

        </Layout>
    )
}