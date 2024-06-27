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


      <style jsx>{`
.cart-wrapper {
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  right: 0;
  top: 0;
  z-index: 501;
  /* will-change: transform; */
  transition: all 1s ease-in-out;
}
.cart-container {
  height: 100vh;
  width: 600px;
  background-color: white;
  float: right;
  padding: 40px 10px;
  position: relative;
}

.cart-heading {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  gap: 2px;
  margin-left: 10px;
  border: none;
  background-color: transparent;
}

.cart-heading .heading {
  margin-left: 10px;
}
.cart-num-items {
  margin-left: 10px;
  color: #f02d34;
}
.empty-cart {
  margin: 40px;
  text-align: center;
}
.empty-cart h3 {
  font-weight: 600;
  font-size: 20px;
}
.cancel {
  cursor: pointer;
}

.product {
  display: flex;
  gap: 30px;
  padding: 20px;
}
.product .cart-product-image {
  width: 180px;
  height: 150px;
  border-radius: 15px;
  background-color: #ebebeb;
}
.item-desc .flex {
  display: flex;
  justify-content: space-between;
  width: 350px;
  color: #324d67;
}
.item-desc .bottom {
  margin-top: 60px;
}
.flex h5 {
  font-size: 24px;
}
.flex h4 {
  font-size: 20px;
}
.total {
  display: flex;
  justify-content: space-between;
}
.total h3 {
  font-size: 22px;
}
.remove-item {
  font-size: 24px;
  color: #f02d34;
  cursor: pointer;
  background: transparent;
  border: none;
}
.cart-bottom {
  position: absolute;
  bottom: 12px;
  right: 5px;
  width: 100%;
  padding: 30px 65px;
}

.btn-container {
  width: 400px;
  margin: auto;
}
.btn {
  width: 100%;
  max-width: 400px;
  padding: 10px 12px;
  border-radius: 15px;
  border: none;
  font-size: 20px;
  margin-top: 10px;
  margin-top: 40px;
  text-transform: uppercase;
  background-color: #f02d34;
  color: #fff;
  cursor: pointer;
  transform: scale(1, 1);
  transition: transform 0.5s ease;
}
.btn:hover {
  transform: scale(1.1, 1.1);
}
      `}</style>
    </div>
  )
}

export default Cart