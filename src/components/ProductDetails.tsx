import { deleteProduct } from "../services/ProductService";
import type { Product } from "../types";
import { formatCurrency } from "../utils";
import {
  Form,
  redirect,
  useFetcher,
  useNavigate,
  type ActionFunctionArgs,
} from "react-router-dom";

type ProductDetailsProps = {
  product: Product;
};

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(Number(params.id));
  }

  return redirect("/");
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const isAvailable = product.availability;
  return (
    <>
      <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">{product.name}</td>
        <td className="p-3 text-lg text-gray-800">
          {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
          <fetcher.Form method="POST">
            <button
              type="submit"
              name="id"
              value={product.id}
              className={`${isAvailable ? "text-black" : "text-red-600"} rounded-lg p-2 w-full text-sm uppercase font-bold border border-black-100 hover:cursor-pointer`}
            >
              {isAvailable ? "Disponible" : "No Disponible"}
            </button>
          </fetcher.Form>
        </td>
        <td className="p-3 text-lg text-gray-800 ">
          <div className="flex gap-2 items-center">
            <button
              onClick={() =>
                navigate(`/products/${product.id}/edit`, {
                  state: { product },
                })
              }
              className="bg-indigo-600 px-3 p-2 text-white rounded-lg w-full uppercase font-bold text-xs hover:bg-indigo-500 text-center"
            >
              Editar
            </button>
            <Form
              className="w-full"
              method="post"
              action={`/products/${product.id}/delete`}
              onSubmit={(e) => {
                if (!confirm("¿Deseas eliminar este producto?")) {
                  e.preventDefault();
                }
              }}
            >
              <input
                type="submit"
                value="Eliminar"
                className="bg-red-600 px-3 p-2 text-white rounded-lg w-full uppercase font-bold text-xs hover:bg-red-500 text-center"
              />
            </Form>
          </div>
        </td>
      </tr>
    </>
  );
}
