"use client"
import { urlFor } from '@/lib/client';
import { Banner } from '@/types/banner'
import Link from 'next/link';
import React from 'react'

const FooterBanner:React.FC<Banner> = ({...bannerProps}) => {
  const {discount, largeText1, largeText2, saleTime, product, smallText, midText, buttonText, image, desc} = bannerProps;

  return (
    <div className='footer-banner-container'>
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product.toLowerCase()}`}>
            <button type='button'>{buttonText}</button>
          </Link>
        </div>
        <img src={urlFor(image).toString()} className='footer-banner-image'></img>
      </div>

      <style jsx>{`


.footer-banner-container {
  padding: 100px 40px;
  background-color: #f02d34;
  border-radius: 15px;
  position: relative;
  height: 400px;
  line-height: 1;
  color: white;
  width: 100%;
  margin-top: 120px;
}
.banner-desc {
  display: flex;
  justify-content: space-between;
}
.banner-desc button {
  border-radius: 15px;
  padding: 10px 16px;
  background-color: white;
  color: red;
  border: none;
  margin-top: 40px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
}
.banner-desc .left h3 {
  font-weight: 900;
  font-size: 80px;
  margin-left: 25px;
}
.banner-desc .left p {
  margin: 18px;
}
.footer-banner-image {
  position: absolute;
  /* top: -35%;
  left: 8%; */
  top: -25%;
  left: 25%;
}
.banner-desc .right {
  line-height: 1.4;
}
.banner-desc .right h3 {
  font-weight: 800;
  font-size: 60px;
}
.banner-desc .right p {
  font-size: 18px;
}
.banner-desc .right .company-desc {
  font-size: 14px;
  font-weight: 300;
}



      `}</style>
    </div>
  )
}

export default FooterBanner