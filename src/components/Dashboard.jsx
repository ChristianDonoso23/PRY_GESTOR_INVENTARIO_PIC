import { useEffect, useState } from 'react'
import {
    getProductos,
    getStockTotalGlobal,
    getProductosConStockBajo,
    getMovimientosHoy
} from '../services/db'

function Dashboard({ refresh }) {

    const [totalProductos, setTotalProductos] = useState(0)
    const [stockGlobal, setStockGlobal] = useState(0)
    const [stockBajo, setStockBajo] = useState(0)
    const [movimientosHoy, setMovimientosHoy] = useState(0)

    useEffect(() => {
        const cargarDatos = async () => {
            const productos = await getProductos()
            const stock = await getStockTotalGlobal()
            const bajo = await getProductosConStockBajo()
            const hoy = await getMovimientosHoy()

            setTotalProductos(productos.filter(p => p.activo).length)
            setStockGlobal(stock)
            setStockBajo(bajo.length)
            setMovimientosHoy(hoy.length)
        }
        cargarDatos()
    }, [refresh])

    const stats = [
        { label: 'Productos Activos', value: totalProductos, icon: '⊞', mod: ''       },
        { label: 'Stock Total',        value: stockGlobal,    icon: '◈', mod: ''       },
        { label: 'Stock Bajo',         value: stockBajo,      icon: '⚠', mod: 'danger' },
        { label: 'Movimientos Hoy',    value: movimientosHoy, icon: '⇄', mod: 'accent' },
    ]

    return (
        <div className="sf-dashboard-grid mb-4">
            {stats.map(({ label, value, icon, mod }) => (
                <div key={label} className={`sf-stat-card${mod ? ` sf-stat-${mod}` : ''}`}>
                    <div className="sf-stat-icon">{icon}</div>
                    <div className="sf-stat-value">{value}</div>
                    <div className="sf-stat-label">{label}</div>
                </div>
            ))}
        </div>
    )
}

export default Dashboard