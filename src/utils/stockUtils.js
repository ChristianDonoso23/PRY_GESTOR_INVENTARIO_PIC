export const calcularStock = (movimientos) => {
    return movimientos.reduce((total, mov) => {
        if (mov.tipo === 'entrada') return total + mov.cantidad
        if (mov.tipo === 'salida') return total - mov.cantidad
        return total
    }, 0)
}
