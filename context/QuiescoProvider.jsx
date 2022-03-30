import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";


const QuiescoContext = createContext()

const QuiescoProvider = ({children}) => {

    const [categorias,setCategorias] = useState([])
    const [categoriaActual,setCategoriaActual] =useState({})
    const [producto,setProducto] = useState({})
    const [modal,setModal] = useState(false)
    const [pedido,setPedido] = useState([])
    const [nombre,setNombre] = useState('')
    const [total,setTotal] = useState(0)

    const router = useRouter()
    

    const obtenerCategorias = async () =>{
        try {
            const {data} = await axios('/api/categorias')
            setCategorias(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        obtenerCategorias()
    },[])

    useEffect(()=>{
        setCategoriaActual(categorias[0])
    },[categorias])

    useEffect(()=>{
        const nuevoTotal = pedido.reduce((total,producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    },[pedido])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    const handleSetProducto = producto =>{
        setProducto(producto)
    }

    const handleChangeModal = () =>{
        setModal(!modal)
    }

    const handleAgregarPedido = ({categoriaId, ...producto}) =>{
        //Comprobar si el elemento ya esta para que no salga repetido
        if(pedido.some(productoState => productoState.id === producto.id)){
            // console.log('El producto ya existe')
            // Actualziar el arreglo si el producto ya existe
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)
            toast.success('🦄 Pedido Actualizado!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
        }else{
            setPedido([...pedido, producto])
            toast.success('🦄 Pedido Agregado!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
        }

        setModal(false)
    }

    const handleEditarCantidades = (id) =>{
        const productoActualziar = pedido.filter(producto => producto.id === id)
        setProducto(productoActualziar[0])
        setModal(!modal)
    }

    const handleEliminarProducto = id =>{
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
    }

    
    const colocarOrden = async (e)=>{
        e.preventDefault()
        try {
           await axios.post('api/ordenes',{pedido,nombre,total,fecha: Date.now().toString()})

            //Resetear la app
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)
            toast.success('🦄 Pedido Realizado Correctamente!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
            setTimeout(()=>{
                router.push('/')
            },3000 )

        } catch (error) {
            console.log(error)
        }
    }



    return (
        <QuiescoContext.Provider 
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal,handleChangeModal,
                handleAgregarPedido,
                pedido,handleEditarCantidades,
                handleEliminarProducto,nombre,setNombre,colocarOrden,
                total}}>
            {children}
        </QuiescoContext.Provider>
    )
}

export {
    QuiescoProvider
}

export default QuiescoContext