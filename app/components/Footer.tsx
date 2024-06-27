'use client'
import React from 'react'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2024 Ecommerce Shop All rights reserved</p>
      <p className='icons'>
        <AiFillInstagram/>
        <AiOutlineTwitter/>
      </p>

      <style jsx>{`
.footer-container {
  color: #324d67;
  text-align: center;
  margin-top: 20px;
  padding: 30px 10px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  justify-content: center;
}
.footer-container .icons {
  font-size: 30px;
  display: flex;
  gap: 10px;
}


      `}</style>
    </div>
    
  )
}

export default Footer