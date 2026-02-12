import React, { useState } from 'react'
import './App.css'

import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import MovementForm from './components/MovementForm'
import MovementHistory from './components/MovementHistory'
import Dashboard from './components/Dashboard'

function App() {

  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [refresh, setRefresh] = useState(0)
  const [productoEditar, setProductoEditar] = useState(null)

  const recargar = () => {
    setRefresh(prev => prev + 1)
  }

  return (
    <div className="app-background min-vh-100">

      <nav className="navbar navbar-dark bg-dark shadow">
        <div className="container">
          <span className="navbar-brand mb-0 h1">
            📦 StockFlow PWA
          </span>
        </div>
      </nav>

      <div className="container py-5">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-5">

            <h2 className="mb-4 text-center fw-bold">
              Gestión de Inventario
            </h2>

            {/* DASHBOARD */}
            <Dashboard refresh={refresh} />

            {/* FORMULARIO PRODUCTOS */}
            <ProductForm
              onProductoCreado={recargar}
              productoEditar={productoEditar}
              onCancelarEdicion={() => setProductoEditar(null)}
            />


            {/* FORMULARIO MOVIMIENTOS */}
            <MovementForm
              onMovimientoGuardado={recargar}
              onProductoSeleccionado={setProductoSeleccionado}
              refresh={refresh}
            />

            {/* HISTORIAL */}
            <MovementHistory
              productoId={productoSeleccionado}
              refresh={refresh}
            />

            {/* LISTADO */}
            <ProductList
              refresh={refresh}
              onEditar={setProductoEditar}
              onEliminar={recargar}
            />

          </div>
        </div>
      </div>
    </div>
  )
}

export default App
