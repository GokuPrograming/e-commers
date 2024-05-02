import React from 'react'

function Productos_panel_component() {
  return (
    <div className="overflow-x-auto ">
    <h2 className="text-lg font-semibold mb-4">Lista de Productos</h2>
    <table className="min-w-full max-w-full overflow-auto">
        <thead className="sticky top-0 bg-white">
            <tr>
                <th className="px-4 py-2">Categoría</th>
                <th className="px-4 py-2">Stock</th>
                <th className="px-4 py-2">Proveedor</th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-gray-100">
                {/* <td className="px-4 py-2"><img src="url_de_la_imagen" alt="Producto" className="h-12 w-12 object-cover rounded" /></td> */}
                <td className="px-4 py-2">Categoría A</td>
                <td className="px-4 py-2">10</td>
                <td className="px-4 py-2">Proveedor X</td>
            </tr>
        </tbody>
    </table>
</div>
  )
}

export default Productos_panel_component