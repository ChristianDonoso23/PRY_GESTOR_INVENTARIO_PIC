import { useState } from 'react'
import ProductList from '../components/ProductList'
import ProductForm from '../components/ProductForm'

function ProductosPage({ refresh }) {

    const [productoEditar, setProductoEditar] = useState(null)
    const [mostrarModal, setMostrarModal] = useState(false)
    const [localRefresh, setLocalRefresh] = useState(0)

    const recargarLista = () => {
        setLocalRefresh(prev => prev + 1)
    }

    const handleEditar = (producto) => {
        setProductoEditar(producto)
        setMostrarModal(true)
    }

    const cerrarModal = () => {
        setMostrarModal(false)
        setProductoEditar(null)
        recargarLista()
    }

    return (
        <div className="container py-5">

            <ProductList
                refresh={refresh + localRefresh}
                onEditar={handleEditar}
            />

            {mostrarModal && (
                <>
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        Editar Producto
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={cerrarModal}
                                    />
                                </div>

                                <div className="modal-body">
                                    <ProductForm
                                        productoEditar={productoEditar}
                                        onProductoCreado={recargarLista}
                                        onCancelarEdicion={cerrarModal}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="modal-backdrop fade show"></div>
                </>
            )}

        </div>
    )
}

export default ProductosPage
