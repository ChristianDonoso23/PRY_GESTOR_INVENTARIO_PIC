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
        <form onSubmit={handleSubmit} className="sf-product-form">

            <div className="sf-product-form-header">
                <span className="sf-form-card-icon">📦</span>
                <h5 className="sf-form-card-title">
                    {productoEditar ? 'Editar Producto' : 'Nuevo Producto'}
                </h5>
            </div>

            <div className="sf-product-form-grid">

                <div className="sf-field">
                    <label className="sf-label">Nombre del Producto</label>
                    <input
                        type="text"
                        className="sf-input"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ej: Laptop HP"
                    />
                </div>

                <div className="sf-field">
                    <label className="sf-label">Categoría</label>
                    <select
                        className="sf-select"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option value="">Seleccione categoría</option>
                        {categorias.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="sf-field">
                    <label className="sf-label">Precio</label>
                    <div className="sf-input-prefix-wrap">
                        <span className="sf-input-prefix">$</span>
                        <input
                            type="number"
                            className="sf-input sf-input-prefixed"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div className="sf-field sf-field-actions">
                    <button type="submit" className="sf-btn-submit">
                        {productoEditar ? '✓ Actualizar Producto' : '+ Guardar Producto'}
                    </button>

                    {productoEditar && (
                        <button
                            type="button"
                            className="sf-btn-cancel"
                            onClick={onCancelarEdicion}
                        >
                            Cancelar
                        </button>
                    )}
                </div>

            </div>
        </form>
    )
}

export default ProductForm