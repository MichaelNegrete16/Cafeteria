import React from 'react'
import Image from 'next/image'
import { formatearDinero } from '../helpers'
import useQuiesco from '../hooks/useQuiesco'


const Producto = ({producto}) => {
    
    const {handleSetProducto,handleChangeModal}=useQuiesco()

    const {nombre,precio,imagen} = producto

    return (
        <div className='broder p-3'>
            
            <Image src={`/assets/img/${imagen}.jpg`} height={500} width={400} alt={`Imagen de ${nombre}`} />

            <div className='p-5'>
                <h3 className='font-bold text-2xl'>{nombre}</h3>
                <p className='mt-5 font-black text-4xl text-amber-500'> {formatearDinero(precio)} </p>
                <button type="button" 
                        className='bg-indigo-600 hover:bg-indigo-800 uppercase font-bold text-white w-full mt-5 p-3' 
                        onClick={()=> {
                            handleSetProducto(producto)
                            handleChangeModal()
                            }} >
                            Agregar
                </button>
            </div>

        </div>
    )
}

export default Producto