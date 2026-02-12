function Home() {
    return (
        <div className="sf-home">

            <div className="sf-home-container container">

                <div className="sf-hero">
                    <h1 className="sf-title">StockFlow</h1>
                    <p className="sf-subtitle">
                        Sistema inteligente de gestión de inventario en tiempo real.
                    </p>
                </div>

                <div className="row g-4 mb-4">

                    <div className="col-md-4">
                        <div className="sf-feature-card text-center">
                            <div className="sf-icon mb-3">
                                <i className="bi bi-box-seam text-primary"></i>
                            </div>
                            <h5>Gestión de Productos</h5>
                            <p>
                                Registro, edición y desactivación con validaciones
                                para evitar duplicados y precios inválidos.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="sf-feature-card text-center">
                            <div className="sf-icon mb-3">
                                <i className="bi bi-arrow-left-right text-success"></i>
                            </div>
                            <h5>Movimientos de Stock</h5>
                            <p>
                                Control de entradas y salidas con actualización inmediata
                                sin recargar la aplicación.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="sf-feature-card text-center">
                            <div className="sf-icon mb-3">
                                <i className="bi bi-cloud-arrow-down text-warning"></i>
                            </div>
                            <h5>Persistencia Offline (PWA)</h5>
                            <p>
                                Aplicación instalable con almacenamiento local mediante IndexedDB.
                            </p>
                        </div>
                    </div>

                </div>

                <div className="row g-4">

                    <div className="col-md-6">
                        <div className="sf-info-card">
                            <div className="d-flex align-items-center mb-3">
                                <i className="bi bi-cpu-fill text-info me-2"></i>
                                <h6 className="mb-0">Arquitectura Moderna</h6>
                            </div>
                            <p>
                                React + IndexedDB + arquitectura modular optimizada
                                para rendimiento.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="sf-info-card">
                            <div className="d-flex align-items-center mb-3">
                                <i className="bi bi-shield-check text-danger me-2"></i>
                                <h6 className="mb-0">Validaciones y Seguridad</h6>
                            </div>
                            <p>
                                Control de duplicados, precios positivos y sanitización
                                de entradas.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Home
