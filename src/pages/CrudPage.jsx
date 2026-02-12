import ProductForm from '../components/ProductForm'
import MovementForm from '../components/MovementForm'
import MovementHistory from '../components/MovementHistory'
import Dashboard from '../components/Dashboard'
import { useState } from 'react'

function CrudPage({ refresh, recargar, productoEditar, setProductoEditar }) {
    const [productoSeleccionado, setProductoSeleccionado] = useState(null)

    return (
        <div className="container py-5">
        <h2 className="mb-4 text-center fw-bold">Gestión de Inventario</h2>

        <Dashboard refresh={refresh} />

        <ProductForm
            onProductoCreado={recargar}
            productoEditar={productoEditar}
            onCancelarEdicion={() => setProductoEditar(null)}
        />

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
    )
}

export default CrudPage
