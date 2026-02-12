import { useEffect, useState } from 'react'
import { getMovimientosByProducto } from '../services/db'

function MovementHistory({ productoId, refresh }) {

    const [movimientos, setMovimientos] = useState([])

    useEffect(() => {
        if (productoId) {
            const cargarMovimientos = async () => {
                const data = await getMovimientosByProducto(productoId)

                const ordenados = data.sort((a, b) =>
                    new Date(b.fecha) - new Date(a.fecha)
                )

                setMovimientos(ordenados)
            }
            cargarMovimientos()
        } else {
            setMovimientos([])
        }
    }, [productoId, refresh])

    if (!productoId) return null

    return (
        <div className="sf-history-card mt-4">
            <div className="sf-form-card-header">
                <span className="sf-form-card-icon">≡</span>
                <h6 className="sf-form-card-title">Historial de Movimientos</h6>
            </div>
            <div className="sf-form-card-body">

                {movimientos.length === 0 ? (
                    <p className="sf-empty-state">Sin movimientos registrados</p>
                ) : (
                    <div className="table-responsive">
                        <table className="sf-table">
                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Cantidad</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movimientos.map(m => (
                                    <tr key={m.id}>
                                        <td>
                                            <span className={`sf-mov-badge ${
                                                m.tipo === 'entrada'
                                                    ? 'sf-mov-entrada'
                                                    : 'sf-mov-salida'
                                            }`}>
                                                {m.tipo === 'entrada' ? '↑' : '↓'} {m.tipo}
                                            </span>
                                        </td>
                                        <td className="sf-table-qty">{m.cantidad}</td>
                                        <td className="sf-table-date">
                                            {new Date(m.fecha).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </div>
    )
}

export default MovementHistory