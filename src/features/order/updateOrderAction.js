import { updateOrder } from '../../services/apiRestaurant'

async function action({ params }) {
  const data = { priority: true }
  await updateOrder(params.orderId, data)
  return null
}

export { action }
