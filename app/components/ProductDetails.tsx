"use client";
import React, { useState } from 'react'
import { Product as ProductType } from '@/types/product'
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import Product from "@/app/components/Product";
import { urlFor } from '@/lib/client';
import { useProductsContext } from '@/context/StateContext';
import { client } from '@/lib/client';

interface ProductDetailsProps {
  product: ProductType;
  productList: ProductType[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, productList }) => {
  const { name, details, price, image, availableQty } = product;
  const [index, setIndex] = useState<number>(0);
  const { cartItems, qty, inqQty, decQty, onAddToCart, setShowCart } = useProductsContext();

  

  
  const updateProductQty = (id, operation, value) => {
    let patch = null;
    if (operation === 'inc') {
      patch = client.patch(id).inc({ availableQty: value }).commit();
    } else if (operation === 'dec') {
      patch = client.patch(id).dec({ availableQty: Math.max(value, 0) }).commit();
    }
    patch.then((updatedDoc) => {
      console.log('Document updated successfully:', updatedDoc);
    })
      .catch((error) => {
        console.error('Error patching document:', error);
      });
  }

  // updateProductQty('02d7f36b-b830-4f94-bb80-e86420dadf7a', 'inc', 30)
  const handleBuyNow = (product, qty) => {
    onAddToCart(product, qty);
    setShowCart(true);
  }
  return (

    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index]).toString()} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item).toString()}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <p>Quantity Available ({availableQty})</p>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">AED {price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={inqQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => { onAddToCart(product, qty) }}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={() => handleBuyNow(product, qty)}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {productList.map((item) => (
              <Product key={item._id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails