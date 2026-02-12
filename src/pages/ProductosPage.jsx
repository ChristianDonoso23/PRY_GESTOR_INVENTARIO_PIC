import ProductList from '../components/ProductList'

function ProductosPage({ refresh, setProductoEditar }) {
    return (
        <div className="container py-5">
        <ProductList
            refresh={refresh}
            onEditar={setProductoEditar}
        />
        </div>
    )
}

export default ProductosPage
