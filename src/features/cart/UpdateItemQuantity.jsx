import React, { useDebugValue } from 'react'
import Button from '../../ui/Button'
import { useDispatch } from 'react-redux'
import { decreaseItemQuantity, increaseItemQuantity } from './cartslice';

export default function UpdateItemQuantity({pizzaId,currentCartQuantity}) {
    const dispatch = useDispatch();
  return (
    <div className='flex gap-2 items-center'>
        <Button type="round" onClick={()=>dispatch(increaseItemQuantity(pizzaId))}>+</Button>
        <span className='text-sm text-center font-semibold'>{currentCartQuantity}</span>
        <Button type="round" onClick={()=>dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
    </div>
  )
}
