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

      <style jsx>{`
.navbar-container {
  display: flex;
  justify-content: space-between;
  margin: 6px 18px;
  position: relative;
}

.logo {
  color: gray;
  font-size: 18px;
}
.cart-icon {
  font-size: 25px;
  color: gray;
  cursor: pointer;
  position: relative;
  transition: transform 0.4s ease;
  border: none;
  background-color: transparent;
}
.cart-icon:hover {
  transform: scale(1.1, 1.1);
}

.cart-item-qty {
  position: absolute;
  right: -8px;
  font-size: 12px;
  color: #eee;
  background-color: #f02d34;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  text-align: center;
  font-weight: 600;
}
      `}</style>
    </div>
  )
}

export default Navbar