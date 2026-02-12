import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark shadow">
        <div className="container">
            <span className="navbar-brand mb-0 h1">📦 StockFlow PWA</span>
            <div>
            <Link className="btn btn-outline-light me-2" to="/">Home</Link>
            <Link className="btn btn-outline-light me-2" to="/crud">CRUD & Movimientos</Link>
            <Link className="btn btn-outline-light" to="/productos">Listado de Productos</Link>
            </div>
        </div>
        </nav>
    )
}

export default Navbar
