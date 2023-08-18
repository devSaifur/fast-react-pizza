import { useDispatch } from 'react-redux'

import { decItemQuantity, incItemQuantity } from './cartSlice'
import Button from '../../ui/Button'

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch()

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={() => dispatch(decItemQuantity(pizzaId))}>
        -
      </Button>

      <span className="text-sm font-medium">{currentQuantity}</span>

      <Button type="round" onClick={() => dispatch(incItemQuantity(pizzaId))}>
        +
      </Button>
    </div>
  )
}

export default UpdateItemQuantity
