import { useSelector } from "react-redux";
import { Link, useActionData } from "react-router-dom";
import  {getTotalCartPrice, getTotalCartQuantity}  from "./cartslice";

function CartOverview() {
  const totalCartPrice = useSelector(getTotalCartPrice)
  const totalCartQuantity = useSelector(getTotalCartQuantity)
  return (
    <div className="flex justify-between items-center px-4 py-4 bg-stone-800 uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="text-stone-300 space-x-4 sm:space-x-6 font-semibold">
        <span>{totalCartQuantity} pizzas</span>
        <span>$ {totalCartPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
