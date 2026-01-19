/* eslint-disable react-refresh/only-export-components */
import { Link, useLoaderData, type ActionFunctionArgs } from "react-router-dom";
import { getProducts, updateAvailability } from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";
import type { Product } from "../types";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const products = await getProducts() as Product[];
  return products;
}

export async function action({request}: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  await updateAvailability(Number(data.id));
  return {};
}

export default function Products() {
  const products = useLoaderData();
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>
        <Link
          to="products/new"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Agregar Producto
        </Link>
      </div>
      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th> 
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => <ProductDetails key={product.id} product={product} />)}
          </tbody>
        </table>
      </div>
    </>
  );
}
