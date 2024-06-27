"use client"
import { useProductsContext } from '@/context/StateContext';
import { runFireworks } from '@/lib/utils';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { BsBagCheckFill } from 'react-icons/bs';

const Success = () => {
    const {setCartItems, setTotalPrice, setTotalQuantities} = useProductsContext();
    useEffect(() => {
      setCartItems([]);
      setTotalPrice(0);
      setTotalQuantities(0);
      runFireworks();
    }, []);


  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>

      <style jsx>{`
      
      .success-wrapper,
.cancel-wrapper {
  background-color: white;
  min-height: 60vh;
}
.success,
.cancel {
  width: 1000px;
  margin: auto;
  margin-top: 160px;
  background-color: #dcdcdc;
  padding: 50px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.success .icon {
  color: green;
  font-size: 40px;
}
.success h2 {
  text-transform: capitalize;
  margin-top: 15px 0px;
  font-weight: 900;
  font-size: 40px;
  color: #324d67;
}
.success .email-msg {
  font-size: 16px;
  font-weight: 600;
  text-align: center;
}
.cancel p {
  font-size: 20px;
  font-weight: 600;
}
.success .description {
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin: 10px;
  margin-top: 30px;
}
.success .description .email {
  margin-left: 5px;
  color: #f02d34;
}


      `}</style>
    </div>
  )
}

export default Success