import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useState } from "react";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearItem, getCart, getTotalCartPrice } from "../cart/cartslice";
import EmptyCart from "../cart/EmptyCart";
import { fetchAddress } from "../user/userSlice";
import store from "../../store";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );



function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const {username,status:addressStatus,position,address,error:errorAddress} = useSelector(state=>state.user)
  const isLoadingAddress = addressStatus ==='loading'
  const dispatch = useDispatch();
  const isSubmitting = navigation.state === "submitting";
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : withPriority;
  const totalPrice = priorityPrice + totalCartPrice
  const formErrors = useActionData();

  if(!cart.length) return <EmptyCart/>
  return (
    <div className="px-4 py-4">
      <h2 className=" font-semibold mb-8">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className=" mb-5 flex gap-2 sm:flex-row sm:items-center flex-col">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" defaultValue={username} className="input grow" required />
        </div>

        <div className=" mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className=" grow">
            <input type="tel" name="phone" className="input w-full" required />
          {formErrors?.phone && <p className="px-2 mt-2 py-2 rounded-md text-xs bg-red-100  text-red-500">{formErrors?.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input type="text" name="address" disabled={isLoadingAddress} defaultValue={address} className="input w-full" required />
            {errorAddress && !position.latitude && !position.longitude && <p className="px-2 mt-2 py-2 rounded-md text-xs bg-red-100  text-red-500">{errorAddress}</p>}
           {!position.latitude && !position.longitude && <span className=" absolute right-[3px] top-[3px]">
              <Button disabled={isLoadingAddress} type="small" onClick={()=>dispatch(fetchAddress())}>Get Position</Button>
            </span>}
          </div>
        </div>

        <div className="mb-5 flex items-center gap-2">
          <input
            className="h-6 w-6 rounded-full accent-yellow-400 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="text-sm">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
          <input type="hidden" name="pisition" value={ position.latitude && position.longitude ?`${position.latitude},${position.longitude}`:""}/>
          <Button type="primary" disabled={isSubmitting || isLoadingAddress} >{isSubmitting ? "Placing to order":`Order now form ${totalPrice}`}</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({request}){
  const formData = await request.formData();
  const data = Object.fromEntries(formData)
  console.log(data);
  const order = {
    ...data,
    cart:JSON.parse(data.cart),
    priority:data.priority === "true"
  }
  const errors = {};
  if(!isValidPhone(order.phone)) errors.phone = "Please give us a correct phone number.We might need to contact to you." ;
  if(Object.keys(errors).length > 0) return errors;

  // if everything is okay , ceate new order....
  const newOrder = await createOrder(order)
  store.dispatch(clearItem())
   return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
