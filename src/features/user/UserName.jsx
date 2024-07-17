import React from 'react'
import { useSelector } from 'react-redux'

export default function UserName() {
    const username = useSelector(state=>state.user.username)
    if(!username) return null;
  return (
    <div className='hidden md:block text-sm font-semibold '>{username}</div>
  )
}
