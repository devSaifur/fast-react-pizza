import { getMenu } from '../../services/apiRestaurant'

async function loader() {
  const menu = await getMenu()
  return menu
}

export { loader }
