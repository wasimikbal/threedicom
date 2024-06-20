'use client'
import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import Cart from './Cart'
import { useProductsContext } from '@/context/StateContext'
import CartServer from './CartServer'

const Navbar = () => {
  const {showCart, setShowCart, totalQuantities} = useProductsContext();


  return (
    <div className='navbar-container'>
      <p className="logo">
        <Link href={`/`}>Ecommerce Shop</Link>
      </p>
      <button className='cart-icon' type='button' onClick={()=>{
        setShowCart((prev)=> !prev)
      }}>
        <AiOutlineShopping/>
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>
      {showCart && <CartServer/>}
    </div>
  )
}

export default Navbar