import { useEffect, useState } from 'react'
import { addMovimiento, getProductos, getStockByProducto } from '../services/db'

function MovementForm({ onMovimientoGuardado, onProductoSeleccionado, refresh }) {

    const [productos, setProductos] = useState([])
    const [productoId, setProductoId] = useState('')
    const [tipo, setTipo] = useState('entrada')
    const [cantidad, setCantidad] = useState('')
    const [stockActual, setStockActual] = useState(0)
    const [error, setError] = useState('')

    useEffect(() => {
        const cargarProductos = async () => {
            const data = await getProductos()
            const activos = data.filter(p => p.activo)
            setProductos(activos)
        }
        cargarProductos()
    }, [refresh])

    const actualizarStock = async (id) => {
        const stock = await getStockByProducto(id)
        setStockActual(stock)
    }

    const handleProductoChange = async (e) => {
        const id = e.target.value
        setProductoId(id)
        await actualizarStock(id)
        setProductoId(id)
        await actualizarStock(id)
        if (onProductoSeleccionado) {
            onProductoSeleccionado(id)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const cantidadNum = Number(cantidad)

        if (!productoId) {
        setError('Seleccione un producto')
        return
        }

        if (cantidadNum <= 0) {
        setError('La cantidad debe ser mayor a 0')
        return
        }

        if (tipo === 'salida' && cantidadNum > stockActual) {
        setError('No hay suficiente stock disponible')
        return
        }

        const movimiento = {
        id: crypto.randomUUID(),
        productoId,
        tipo,
        cantidad: cantidadNum,
        fecha: new Date().toISOString()
        }

        await addMovimiento(movimiento)

        setCantidad('')
        setStockActual(await getStockByProducto(productoId))

        if (onMovimientoGuardado) {
        onMovimientoGuardado()
        }
    }

    return (
        <div className="sf-form-card mb-4">
            <div className="sf-form-card-header">
                <span className="sf-form-card-icon">⇄</span>
                <h5 className="sf-form-card-title">Registrar Movimiento</h5>
            </div>
            <div className="sf-form-card-body">

                {error && (
                    <div className="sf-alert sf-alert-danger">
                        <span className="sf-alert-icon">⚠</span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="sf-field">
                        <label className="sf-label">Producto</label>
                        <select
                            className="sf-select"
                            value={productoId}
                            onChange={handleProductoChange}
                        >
                            <option value="">Seleccione...</option>
                            {productos.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {productoId && (
                        <div className="sf-stock-badge-wrap">
                            <span className="sf-stock-badge">
                                Stock actual: <strong>{stockActual}</strong>
                            </span>
                        </div>
                    )}

                    <div className="sf-field">
                        <label className="sf-label">Tipo de Movimiento</label>
                        <div className="sf-tipo-toggle">
                            <button
                                type="button"
                                className={`sf-tipo-btn sf-tipo-entrada${tipo === 'entrada' ? ' active' : ''}`}
                                onClick={() => setTipo('entrada')}
                            >
                                ↑ Entrada
                            </button>
                            <button
                                type="button"
                                className={`sf-tipo-btn sf-tipo-salida${tipo === 'salida' ? ' active' : ''}`}
                                onClick={() => setTipo('salida')}
                            >
                                ↓ Salida
                            </button>
                        </div>
                    </div>

                    <div className="sf-field">
                        <label className="sf-label">Cantidad</label>
                        <input
                            type="number"
                            className="sf-input"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            placeholder="0"
                        />
                    </div>

                    <button type="submit" className="sf-btn-submit w-100">
                        Guardar Movimiento
                    </button>

                </form>
            </div>
        </div>
    )
}

export default MovementForm