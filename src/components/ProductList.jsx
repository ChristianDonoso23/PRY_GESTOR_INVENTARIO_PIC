import { useEffect, useState } from 'react'
import { getProductos, getStockByProducto, desactivarProducto } from '../services/db'

function ProductList({ refresh, onEditar, onEliminar }) {

    const [productos, setProductos] = useState([])

    useEffect(() => {
        const cargarProductos = async () => {
            const data = await getProductos()

            const productosConStock = await Promise.all(
                data
                    .filter(p => p.activo)
                    .map(async (producto) => {
                        const stock = await getStockByProducto(producto.id)
                        return { ...producto, stock }
                    })
            )

            setProductos(productosConStock)
        }
        cargarProductos()
    }, [refresh])

    return (
        <div className="mt-5">

            <h4 className="mb-4 fw-bold text-center">
                📋 Productos Registrados
            </h4>

            <div className="row g-4">

                {productos.length === 0 && (
                    <p className="text-center text-muted">
                        No hay productos registrados
                    </p>
                )}

                {productos.map((producto) => (
                    <div key={producto.id} className="col-md-4">

                        <div className="card product-card h-100 border-0 shadow-sm">

                            <div className="card-body">

                                <h5 className="fw-bold">
                                    {producto.nombre}
                                </h5>

                                <p className="text-muted mb-1">
                                    Categoría: {producto.categoria}
                                </p>

                                <p className="fs-5 fw-semibold text-primary">
                                    ${producto.precio}
                                </p>

                                <span className={`badge ${
                                    producto.stock === 0
                                        ? 'bg-danger'
                                        : producto.stock <= 5
                                        ? 'bg-warning text-dark'
                                        : 'bg-success'
                                }`}>
                                    Stock: {producto.stock}
                                </span>

                                <div className="mt-3 d-flex gap-2">
                                    <button
                                    className="btn btn-sm btn-outline-primary w-100"
                                    onClick={() => onEditar(producto)}
                                    >
                                    Editar
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger w-100"
                                        onClick={async () => {
                                            await desactivarProducto(producto.id)
                                            if (onEliminar) onEliminar()
                                        }}
                                    >
                                        Eliminar
                                    </button>


                                </div>

                                </div>

                        </div>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default ProductList
