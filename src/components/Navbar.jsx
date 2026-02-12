import { Link, useLocation } from 'react-router-dom'

const navLinks = [
    { to: '/',          label: 'Dashboard',   icon: '⊞' },
    { to: '/crud',      label: 'Movimientos', icon: '⇄' },
    { to: '/productos', label: 'Productos',   icon: '≡' },
    ]

    function Navbar() {
        const { pathname } = useLocation()

        return (
            <nav className="sf-navbar">
            <div className="sf-navbar-inner container-fluid">

                {/* Brand */}
                <Link to="/" className="sf-brand navbar-brand">
                <div className="sf-brand-icon">📦</div>
                <div>
                    StockFlow
                    <span className="sf-brand-sub">Inventory PWA</span>
                </div>
                </Link>

                {/* Links */}
                <ul className="sf-nav-links">
                {navLinks.map(({ to, label, icon }) => (
                    <li key={to} className="sf-nav-item">
                    <Link
                        to={to}
                        className={`sf-nav-link${pathname === to ? ' active' : ''}`}
                    >
                        <span className="sf-nav-icon">{icon}</span>
                        <span>{label}</span>
                    </Link>
                    </li>
                ))}
                </ul>

                {/* Status */}
                <div className="sf-badge">
                <div className="sf-status-dot" />
                <span className="sf-status-text">En línea</span>
                </div>

            </div>
        </nav>
    )
}

export default Navbar