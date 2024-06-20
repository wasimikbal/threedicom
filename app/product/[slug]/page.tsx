"use server"
import { client, urlFor } from "@/lib/client";
import { groq } from "next-sanity";
import { Product as ProductType } from "@/types/product";
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import Product from "@/app/components/Product";
import { ProductDetails } from "@/app/components";
import { useState } from "react";

const page = async ({ params }: { params: { slug: string } }) => {

  const products = await client.fetch(groq`*[_type=="product"]`);
  const product: ProductType = products.find((product: ProductType) => product.slug.current == params.slug);
  const { name, image, details, price } = product;


  return (
    <>
      <ProductDetails product={product} productList={products} />
    </>
  )
};



export default page;
