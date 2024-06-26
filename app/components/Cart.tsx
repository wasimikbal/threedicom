"use client"
import React, { useRef } from 'react'
import {
  AiOutlineMinus, AiOutlinePlus, AiOutlineLeft,
  AiOutlineShopping
} from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import toast from 'react-hot-toast'
import { useProductsContext } from '@/context/StateContext'
import { urlFor } from '@/lib/client'
import Link from 'next/link'
import { url } from 'inspector'
import getStripe from '@/lib/getStripe'

const Cart = ({ handleCheckout, updateProductQty }) => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems,
    setShowCart, toggleCartItemsQuantity, onRemoveFromCart } = useProductsContext();


  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className="cart-container">
        <button className='cart-heading' type='button'
          onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>No items added yet</h3>
            <button className='btn'
              type='button'
              onClick={() => setShowCart(false)}>
              Continue Shopping
            </button>
          </div>
        )}
        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item.image && item.image[0]).toString()}
                className='cart-product-image' />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>AED {item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                    <p className="quantity-desc">
                      <span className="minus" onClick={() => { toggleCartItemsQuantity(item._id, 'dec') }}><AiOutlineMinus /></span>
                      <span className="num">{item.quantity}</span>
                      <span className="plus" onClick={() => { toggleCartItemsQuantity(item._id, 'inc') }}><AiOutlinePlus /></span>
                    </p>
                  </div>
                  <button type='button'
                    className='remove-item'
                    onClick={() => { onRemoveFromCart(item) }}>
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type='button' className='btn' onClick={() => {
                handleCheckout(cartItems);
              }}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart