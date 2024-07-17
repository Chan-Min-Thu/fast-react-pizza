import CartItem from './CartItem';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import EmptyCart from './EmptyCart';
import { clearItem, getCart } from './cartslice';
import { getUserName } from '../user/userSlice';

function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector(getUserName)
  const dispatch = useDispatch();
  // console.log(cart)
  if(!cart.length) return <EmptyCart/>
  return (
    <div className='px-4 py-3'>
      <LinkButton to="/menu" >&larr; Back to menu</LinkButton>

      <h2 className='mt-7 font-semibold'>Your cart, {username}</h2>
      <ul className=' divide-y divide-stone-200 border-b'>
        {cart.map(item=><CartItem key={item.pizzaId} item={item}/> )}
      </ul>
      <div className='mt-6 space-x-4'>
        <Button type="primary" to="/order/new">Order pizzas</Button>
        <Button type="secondary" onClick={()=>dispatch(clearItem())}>Clear cart</Button> 
      </div>
    </div>
  );
}

export default Cart;
