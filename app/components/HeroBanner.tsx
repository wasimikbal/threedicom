"use client"
import React from "react";
import Link from "next/link";
import { groq } from "next-sanity";
import { client, urlFor } from "@/lib/client";
import { Product } from "@/types/product";
import { Banner } from "@/types/banner";

const HeroBanner: React.FC<Banner> = ({ ...bannerProps }) => {

  const
  {_id, _type, image, buttonText, product, desc, smallText, midText, largeText1, largeText2, discount, saleTime, } 
    = bannerProps;


  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <img
          src={urlFor(image).toString()}
          alt="headphones"
          className="hero-banner-image"
        />

        <div>
          <Link href={`/product/${product.toLowerCase()}`}>
            <button type="button" onClick={()=>{}}>{buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
