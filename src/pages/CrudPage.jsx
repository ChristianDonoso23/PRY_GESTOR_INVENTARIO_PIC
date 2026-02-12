import ProductForm from '../components/ProductForm'
import MovementForm from '../components/MovementForm'
import MovementHistory from '../components/MovementHistory'
import Dashboard from '../components/Dashboard'
import { useState } from 'react'

function CrudPage({ refresh, recargar, productoEditar, setProductoEditar }) {
    const [productoSeleccionado, setProductoSeleccionado] = useState(null)

    return (
        <div className="container-fluid px-4 py-5" style={{ maxWidth: '1800px' }}>

            <h2 className="sf-page-title mb-4">Gestión de Inventario</h2>

            {/* Dashboard ocupa todo el ancho */}
            {/* <div className="mb-5">
                <Dashboard refresh={refresh} />
            </div> */}

            <div className="row g-4 align-items-start">

                {/* Columna izquierda: Producto */}
                <div className="col-lg-6 d-flex flex-column gap-4">
                    <Dashboard refresh={refresh}></Dashboard>
                    <ProductForm
                        onProductoCreado={recargar}
                        productoEditar={productoEditar}
                        onCancelarEdicion={() => setProductoEditar(null)}
                    />
                </div>

                {/* Columna derecha: Movimientos + Historial */}
                <div className="col-lg-6 d-flex flex-column gap-4">
                    <MovementForm
                        onMovimientoGuardado={recargar}
                        onProductoSeleccionado={setProductoSeleccionado}
                        refresh={refresh}
                    />
                    
                    <MovementHistory
                        productoId={productoSeleccionado}
                        refresh={refresh}
                    />
                </div>

            </div>

        </div>
    )
}

export default CrudPage