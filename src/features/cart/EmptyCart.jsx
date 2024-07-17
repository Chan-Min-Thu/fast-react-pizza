import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';

function EmptyCart() {
  return (
    <div className='px-3 py-4'>
      <LinkButton to="/menu" className=''>&larr; Back to menu</LinkButton>
      <p className=' font-semibold mt-7'>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
