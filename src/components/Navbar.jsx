import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const navLinks = [
    { to: '/', label: 'Home', icon: '⊞' },
    { to: '/crud', label: 'Movimientos', icon: '⇄' },
    { to: '/productos', label: 'Productos', icon: '≡' },
]

function Navbar() {
    const { pathname } = useLocation()
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    return (
        <nav className="sf-navbar">
            <div className="sf-navbar-inner container-fluid">

                <Link to="/" className="sf-brand navbar-brand" onClick={closeMenu}>
                    <div className="sf-brand-icon">📦</div>
                    <div>
                        StockFlow
                        <span className="sf-brand-sub">Inventory PWA</span>
                    </div>
                </Link>

                {/* Botón hamburguesa */}
                <button className="sf-hamburger" onClick={toggleMenu}>
                    ☰
                </button>

                <ul className={`sf-nav-links ${isOpen ? 'open' : ''}`}>
                    {navLinks.map(({ to, label, icon }) => (
                        <li key={to} className="sf-nav-item">
                            <Link
                                to={to}
                                onClick={closeMenu}
                                className={`sf-nav-link${pathname === to ? ' active' : ''}`}
                            >
                                <span className="sf-nav-icon">{icon}</span>
                                <span>{label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="sf-badge">
                    <div className="sf-status-dot" />
                    <span className="sf-status-text">En línea</span>
                </div>

            </div>
        </nav>
    )
}

export default Navbar
