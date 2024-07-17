import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCart, getCurrentCartQuantity } from "../cart/cartslice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
function MenuItem({ pizza }) {
  const { id:pizzaId, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentCartQuantity = useSelector(getCurrentCartQuantity(pizzaId));
  // const cart = useSelector(getCart);

  // const isInCart = cart.find(item=> item.id === id)

  const isInCart = currentCartQuantity > 0
  const dispatch = useDispatch();
  
  
  function handleAddToCart(){
    const newItem={pizzaId,name,unitPrice,quantity:1,totalPrice:unitPrice*1}
    dispatch(addItem(newItem))
  }
  return (
    <li className=" list-none flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut?"opacity-70 grayscale":""}`}/>
      <div className="flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p>{ingredients.join(', ')}</p>
        <div className="mt-auto flex flex-grow items-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
          {isInCart &&  <div className="flex items-center gap-3 md:gap-8"> 
             <UpdateItemQuantity pizzaId={pizzaId} currentCartQuantity={currentCartQuantity}/>
            <DeleteItem pizzaId={pizzaId}/>
          </div>}
          {!soldOut && !isInCart && <Button type="small" disabled={soldOut ? true: false} onClick={handleAddToCart}>Add to cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
