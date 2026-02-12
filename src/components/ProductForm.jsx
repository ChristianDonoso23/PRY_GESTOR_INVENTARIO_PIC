import { useState } from 'react'
import { addProducto } from '../services/db'
import { useEffect } from 'react'

const categorias = [
    'Tecnología',
    'Oficina',
    'Alimentos',
    'Hogar',
    'Limpieza',
    'Otros'
]

function ProductForm({ onProductoCreado, productoEditar, onCancelarEdicion }) {

    const limpiarFormulario = () => {
        setNombre('')
        setCategoria('')
        setPrecio('')
    }

    const [nombre, setNombre] = useState('')
    const [categoria, setCategoria] = useState('')
    const [precio, setPrecio] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (productoEditar) {
            setNombre(productoEditar.nombre)
            setCategoria(productoEditar.categoria)
            setPrecio(productoEditar.precio)
        }
    }, [productoEditar])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const producto = {
            id: productoEditar ? productoEditar.id : crypto.randomUUID(),
            nombre,
            categoria,
            precio: Number(precio),
            activo: true
        }

        await addProducto(producto)

        limpiarFormulario()

        if (onProductoCreado) {
            onProductoCreado()
        }

        if (onCancelarEdicion) {
            onCancelarEdicion()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="row g-4">

            <div className="col-md-6">
                <label className="form-label fw-bold">
                    📦 Nombre del Producto
                </label>
                <input
                    type="text"
                    className="form-control form-control-lg shadow-sm"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Laptop HP"
                />
            </div>

            <div className="col-md-6">
                <label className="form-label fw-bold">
                    🏷 Categoría
                </label>
                <select
                    className="form-select form-select-lg shadow-sm"
                    value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                >
                <option value="">Seleccione categoría</option>
                    {categorias.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="col-md-6">
                <label className="form-label fw-bold">
                    💲 Precio
                </label>
                <input
                    type="number"
                    className="form-control form-control-lg shadow-sm"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    placeholder="0.00"
                />
            </div>

            <div className="col-md-6 d-flex align-items-end">
                <button type="submit" className="btn btn-primary w-100">
                    {productoEditar ? 'Actualizar Producto' : 'Guardar Producto'}
                </button>

                {productoEditar && (
                <button
                    type="button"
                    className="btn btn-secondary w-100 mt-2"
                    onClick={onCancelarEdicion}
                >
                    Cancelar
                </button>
                )}

            </div>
        </form>
    )
}

export default ProductForm
