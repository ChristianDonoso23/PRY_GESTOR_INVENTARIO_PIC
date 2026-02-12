import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CrudPage from './pages/CrudPage'
import ProductosPage from './pages/ProductosPage'
import { useState } from 'react'

function App() {
  const [refresh, setRefresh] = useState(0)
  const [productoEditar, setProductoEditar] = useState(null)

  const recargar = () => setRefresh(prev => prev + 1)

  return (
    <Router>
      <div className="app-background min-vh-100">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/crud"
            element={
              <CrudPage
                refresh={refresh}
                recargar={recargar}
                productoEditar={productoEditar}
                setProductoEditar={setProductoEditar}
              />
            }
          />
          <Route
            path="/productos"
            element={
              <ProductosPage
                refresh={refresh}
                setProductoEditar={setProductoEditar}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
