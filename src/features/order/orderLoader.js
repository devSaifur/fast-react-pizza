import { getOrder } from '../../services/apiRestaurant'

async function loader({ params }) {
  const order = await getOrder(params.orderId)
  return order
}

export { loader }
