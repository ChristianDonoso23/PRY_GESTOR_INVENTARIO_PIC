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
        <div className="card shadow border-0 mt-4">
            <div className="card-body">
                <h6 className="mb-3">Historial de Movimientos</h6>

                {movimientos.length === 0 ? (
                    <p className="text-muted">Sin movimientos registrados</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-sm align-middle">
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
                                            <span className={`badge ${
                                                m.tipo === 'entrada'
                                                    ? 'bg-success'
                                                    : 'bg-danger'
                                            }`}>
                                                {m.tipo}
                                            </span>
                                        </td>
                                        <td>{m.cantidad}</td>
                                        <td>
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
