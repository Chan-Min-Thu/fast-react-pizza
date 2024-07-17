// Test ID: IIDSAT

import { useFetcher, useLoaderData, useParams } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from './OrderItem'
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";


function Order() {
  const order = useLoaderData()
  const params = useParams();
  const fetcher = useFetcher();

  useEffect(()=>{
    if(!fetcher.data && fetcher.state === 'idle'){
      fetcher.load("/menu")
    }
  },[fetcher])
  
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex items-center gap-2 flex-wrap justify-between">
        <h2 className="text-xl font-semibold">Order #{id} Status</h2>

        <div className="space-x-2">
          {priority && <span className="bg-red-500 rounded-full py-1 px-3 uppercase text-xs text-red-50 tracking-wide font-semibold">Priority</span>}
          <span className="bg-green-500 rounded-full py-1 px-3 uppercase text-xs text-red-50 tracking-wide font-semibold">{status} order</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-4"> 
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

<ul className=" divide-y divide-stone-300 space-y-2">
  {cart.map(item=> <OrderItem key={item.pizzaId} item={item} isLoadingIngredients={fetcher.state === "loading"} ingredients={fetcher?.data?.find(ele=> ele.id===item.pizzaId )?.ingredients ?? []}/>)}
</ul>
      <div className=" space-y-2 bg-stone-200 px-6 py-4">
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="text-sm font-medium text-stone-800">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      {!priority && <UpdateOrder order={order}/>}
     
    </div>
  );
}

export async function loader({params}){
  const order = await getOrder(params.orderId)
  return order
}

export default Order;
