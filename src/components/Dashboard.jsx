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

    return (
        <div className="row mb-4">

            <div className="col-md-3">
                <div className="card text-center shadow border-0">
                    <div className="card-body">
                        <h6 className="text-muted">Productos Activos</h6>
                        <h3>{totalProductos}</h3>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card text-center shadow border-0">
                    <div className="card-body">
                        <h6 className="text-muted">Stock Total</h6>
                        <h3>{stockGlobal}</h3>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card text-center shadow border-0">
                    <div className="card-body">
                        <h6 className="text-muted">Stock Bajo</h6>
                        <h3 className="text-danger">{stockBajo}</h3>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card text-center shadow border-0">
                    <div className="card-body">
                        <h6 className="text-muted">Movimientos Hoy</h6>
                        <h3 className="text-primary">{movimientosHoy}</h3>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard
