

import './globals.css';
import { client } from '@/lib/client';
import { groq } from 'next-sanity'
import { Carousel, FooterBanner, HeroBanner } from './components';
import { GetServerSideProps } from 'next';
import { Product as ProductType } from '@/types/product';
import { Product } from './components'
import { revalidateTag } from 'next/cache';
import { _loadModels, loadModels } from '@/utils/getModels';

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
          
        </div>
        <div className='_carousel-container'>
<Carousel productList={products} />
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

const getModels = async () => {
  const paths = ['/model1.glb', '/model2.glb'];
  return _loadModels(paths);
}

