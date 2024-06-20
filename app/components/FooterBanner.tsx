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
    </div>
  )
}

export default FooterBanner