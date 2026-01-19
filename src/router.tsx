import {createBrowserRouter} from 'react-router-dom';
import Layout from './layouts/Layout';
import Products, {loader as productsLoader, action as updateAvailabilityAction} from './views/Products';
import NewProducts, { action as newProductAction} from './views/NewProducts';
import EditProduct, { loader as editProductLoader, action as editProductAction} from './views/EditProduct';
import { action as deleteProductAction} from './components/ProductDetails';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>, 
        children: [
            {
                index: true,
                element: <Products/>,
                loader: productsLoader,
                action: updateAvailabilityAction
            },
            {
                path: 'products/new',
                element: <NewProducts/>,
                action: newProductAction
            },
            {
                path: 'products/:id/edit',
                element: <EditProduct/>,
                loader: editProductLoader,
                action: editProductAction,
            },
            {
                path: 'products/:id/delete',
                action: deleteProductAction,
            }
        ]
    }
])

export default router;