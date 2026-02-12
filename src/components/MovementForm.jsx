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
        <div className="card shadow-lg border-0 mb-4">
        <div className="card-body">
            <h5 className="card-title mb-3">Registrar Movimiento</h5>

            {error && (
            <div className="alert alert-danger">
                {error}
            </div>
            )}

            <form onSubmit={handleSubmit}>

            <div className="mb-3">
                <label className="form-label">Producto</label>
                <select
                className="form-select"
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
                <div className="mb-3">
                <span className="badge bg-info">
                    Stock actual: {stockActual}
                </span>
                </div>
            )}

            <div className="mb-3">
                <label className="form-label">Tipo</label>
                <select
                className="form-select"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                >
                <option value="entrada">Entrada</option>
                <option value="salida">Salida</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Cantidad</label>
                <input
                type="number"
                className="form-control"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                />
            </div>

            <button type="submit" className="btn btn-primary w-100">
                Guardar Movimiento
            </button>

            </form>
        </div>
        </div>
    )
}

export default MovementForm
