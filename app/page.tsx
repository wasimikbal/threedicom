

import './globals.css';
import { client } from '@/lib/client';
import { groq } from 'next-sanity'
import { FooterBanner, HeroBanner } from './components';
import { GetServerSideProps } from 'next';
import { Product as ProductType } from '@/types/product';
import { Product } from './components'
import { revalidateTag } from 'next/cache';

export default async function Home() {
  const products = await getProducts();
  const bannerData = await getBanner();
  return (
    <>
      <HeroBanner  {...bannerData[0]} />

      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>There are many variation packages</p>
        <div className='products-container'>
          {products?.map((product: ProductType) => <Product key={product._id}{...product} />)}
        </div>
      </div>

      <FooterBanner {...bannerData[0]} />
    </>
  );



}

const getProducts = async () => {
  revalidateTag('product')
  return await client.fetch(groq`*[_type == "product"]`)
}

const getBanner = async () => {
  return await client.fetch(groq`*[_type == "banner"]`)
}

