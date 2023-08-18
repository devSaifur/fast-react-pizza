import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './ui/Home'
import Menu from './features/menu/Menu'
import Cart from './features/cart/Cart'
import CreateOrder from './features/order/CreateOrder'
import Order from './features/order/Order'
import AppLayout from './ui/AppLayout'
import Error from './ui/Error'

import { action as createOrderAction } from './features/order/createOrderAction'
import { action as updateOrderAction } from './features/order/updateOrderAction'
import { loader as menuLoader } from './features/menu/menuLoader'
import { loader as orderLoader } from './features/order/orderLoader'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: '/cart', element: <Cart /> },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        action: updateOrderAction,
        errorElement: <Error />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
