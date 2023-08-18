import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, useActionData, useNavigation } from 'react-router-dom'

import { getCart, getTotalPrice } from '../cart/cartSlice'
import { fetchAddress, getUser } from '../user/userSlice'
import { formatCurrency } from '../../utils/helpers'
import Button from '../../ui/Button'
import EmptyCart from '../cart/EmptyCart'

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false)

  const dispatch = useDispatch()
  const navigation = useNavigation()
  const formErrors = useActionData()

  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector(getUser)

  const cart = useSelector(getCart)
  const totalCartPrice = useSelector(getTotalPrice)

  const isLoadingAddress = addressStatus === 'loading'
  const isSubmitting = navigation.state === 'submitting'
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
  const totalPrice = totalCartPrice + priorityPrice

  if (!cart.length) return <EmptyCart />

  return (
    <div className="mx-4 mt-2">
      <h2 className="my-4">Ready to order? Lets go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            defaultValue={username}
            type="text"
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              className="input w-full"
              type="tel"
              name="phone"
              placeholder="(000) 000-0000"
              required
            />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              defaultValue={address}
              disabled={isLoadingAddress}
              required
            />
          </div>

          {addressStatus === 'error' && (
            <p className="mt-2 rounded-md bg-red-100 p-2 md:mx-auto text-xs text-red-700">
              {errorAddress}
            </p>
          )}

          {!position.latitude && !position.longitude && (
            <span
              className={`absolute right-[3px] top-1 md:right-[5px] z-50 ${
                errorAddress && 'sm:top-[-2.5rem]'
              }`}
            >
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  dispatch(fetchAddress())
                }}
                type="small"
                disabled={isLoadingAddress}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            // giving the pizza shop customer location
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? 'Placing order...'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default CreateOrder
