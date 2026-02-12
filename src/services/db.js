import { openDB } from 'idb'

const DB_NAME = 'stockflow-db'
const DB_VERSION = 1

export const initDB = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
        if (!db.objectStoreNames.contains('productos')) {
            db.createObjectStore('productos', { keyPath: 'id' })
        }

        if (!db.objectStoreNames.contains('movimientos')) {
            db.createObjectStore('movimientos', { keyPath: 'id' })
        }
        }
    })
}

export const addProducto = async (producto) => {
    const db = await initDB()
    return db.put('productos', producto)
}

export const getProductos = async () => {
    const db = await initDB()
    return db.getAll('productos')
}

export const deleteProducto = async (id) => {
    const db = await initDB()
    return db.delete('productos', id)
}

export const addMovimiento = async (movimiento) => {
    const db = await initDB()
    return db.put('movimientos', movimiento)
}

export const getMovimientos = async () => {
    const db = await initDB()
    return db.getAll('movimientos')
}

export const getMovimientosByProducto = async (productoId) => {
    const db = await initDB()
    const movimientos = await db.getAll('movimientos')
    return movimientos.filter(m => m.productoId === productoId)
}

export const getStockByProducto = async (productoId) => {
    const movimientos = await getMovimientosByProducto(productoId)

    let stock = 0

    movimientos.forEach(m => {
        if (m.tipo === 'entrada') {
            stock += m.cantidad
        } else {
            stock -= m.cantidad
        }
    })

    return stock
}

export const getStockTotalGlobal = async () => {
    const productos = await getProductos()
    const movimientos = await getMovimientos()

    return productos
        .filter(p => p.activo)
        .reduce((total, producto) => {
            const stock = movimientos
                .filter(m => m.productoId === producto.id)
                .reduce((acc, mov) =>
                    mov.tipo === 'entrada'
                        ? acc + mov.cantidad
                        : acc - mov.cantidad
                , 0)

            return total + stock
        }, 0)
}

export const getProductosConStockBajo = async (limite = 5) => {
    const productos = await getProductos()
    const movimientos = await getMovimientos()

    const resultado = []

    for (let producto of productos.filter(p => p.activo)) {

        const stock = movimientos
            .filter(m => m.productoId === producto.id)
            .reduce((acc, mov) =>
                mov.tipo === 'entrada'
                    ? acc + mov.cantidad
                    : acc - mov.cantidad
            , 0)

        if (stock <= limite) {
            resultado.push({ ...producto, stock })
        }
    }

    return resultado
}

export const getMovimientosHoy = async () => {
    const movimientos = await getMovimientos()
    const hoy = new Date().toDateString()

    return movimientos.filter(m =>
        new Date(m.fecha).toDateString() === hoy
    )
}

export const desactivarProducto = async (id) => {
    const db = await initDB()
    const producto = await db.get('productos', id)

    if (!producto) return

    producto.activo = false

    return db.put('productos', producto)
}

