import React from 'react';

type Product = {
    id_producto: number;
    producto: string;
    precio: string;
    almacen: number;
    id_proveedor: number;
    id_categoria: number;
};

type ProductItemProps = {
    producto: Product;
    onAddToCart: (productId: number) => void; // Función para manejar "Add to cart"
};

const ProductItem: React.FC<ProductItemProps> = ({ producto, onAddToCart }) => {

    // Función manejadora para el clic del botón
    const handleAddToCartClick = () => {
        onAddToCart(producto.id_producto);
        alert("Producto con ID " + producto.id_producto + " agregado al carrito");  // Mostrar el ID del producto en la alerta
    };

    return (
        <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">

            <div className="relative flex items-end overflow-hidden rounded-xl">
                {/* ... */}

                <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                    {/* ... */}

                    {/* Pasar el id del producto al hacer clic en el botón */}
                    <button className="text-sm" onClick={handleAddToCartClick}>Add to cart</button>
                </div>
            </div>

            <div className="mt-1 p-2">
                <h2 className="text-slate-700">{producto.producto}</h2>
                <p className="mt-1 text-sm text-slate-400">ID: {producto.id_producto}</p>
                <p className="mt-1 text-sm text-slate-400">Precio: ${producto.precio}</p>
                <p className="mt-1 text-sm text-slate-400">Almacen: {producto.almacen} unidades</p>
            </div>

        </article>
    );
};

export default ProductItem;
