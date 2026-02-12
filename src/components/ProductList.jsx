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

    const getStockChip = (stock) => {
        if (stock === 0)   return { cls: 'empty',  label: `Sin stock` }
        if (stock <= 5)    return { cls: 'low',    label: `Stock bajo: ${stock}` }
        return                    { cls: 'ok',     label: `Stock: ${stock}` }
    }

    return (
        <div className="sf-products-section">

            <h4 className="sf-section-title">Productos Registrados</h4>

            <div className="row g-4">

                {productos.length === 0 && (
                    <div className="col-12">
                        <p className="sf-product-empty">No hay productos registrados</p>
                    </div>
                )}

                {productos.map((producto) => {
                    const chip = getStockChip(producto.stock)
                    return (
                        <div key={producto.id} className="col-md-4">
                            <div className="card product-card h-100">
                                <div className="card-body d-flex flex-column" style={{ padding: '1.25rem' }}>

                                    <p className="sf-product-category">{producto.categoria}</p>
                                    <h5 className="sf-product-name">{producto.nombre}</h5>
                                    <p className="sf-product-price">${producto.precio.toLocaleString()}</p>

                                    <span className={`sf-stock-chip ${chip.cls}`}>
                                        {chip.cls === 'empty' ? '✕' : chip.cls === 'low' ? '⚠' : '✓'} {chip.label}
                                    </span>

                                    <div className="sf-card-actions mt-auto">
                                        <button
                                            className="sf-btn-edit"
                                            onClick={() => onEditar(producto)}
                                        >
                                            ✎ Editar
                                        </button>
                                        <button
                                            className="sf-btn-delete"
                                            onClick={async () => {
                                                await desactivarProducto(producto.id)
                                                // actualizar la lista local inmediatamente
                                                setProductos(prev => prev.filter(p => p.id !== producto.id))
                                                if (onEliminar) onEliminar()
                                            }}
                                        >
                                            ✕ Eliminar
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default ProductList