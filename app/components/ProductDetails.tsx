"use client";
import React, { useRef, useState } from 'react'
import { Product as ProductType } from '@/types/product'
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import Product from "@/app/components/Product";
import { urlFor } from '@/lib/client';
import { useProductsContext } from '@/context/StateContext';
import { client } from '@/lib/client';
import ProductDetailsPopup from './ProductDetailsPopup';

interface ProductDetailsProps {
  product: ProductType;
  productList: ProductType[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, productList }) => {
  const { name, details, price, image, availableQty } = product;
  const [index, setIndex] = useState<number>(0);
  const [showPopup, setShowPopup] = useState(false);
  const popupContainerRef = useRef<HTMLDivElement | null>(null)
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

  const handleOpenPopup = () => {
    setShowPopup(true);
  }

  return (
    <>
      <ProductDetailsPopup setShowPopup={setShowPopup} />
      <div>

        <div className="product-detail-container">
          <div>
            <div className="image-container">
              <img src={urlFor(image && image[index]).toString()} className="product-detail-image" />
            </div>
            <div className="small-images-container">
              <>
                {image?.map((item, i) => (
                  <img
                    key={i}
                    src={urlFor(item).toString()}
                    className={i === index ? 'small-image selected-image' : 'small-image'}
                    onMouseEnter={() => setIndex(i)}
                  />
                ))
                }
                <button className='open-product-popup' onClick={handleOpenPopup}>3D</button>
              </>


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
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
.product-detail-container {
  position: relative;
  display: flex;
  gap: 40px;
  margin: 40px;
  margin-top: 60px;
  color: #324d67;
}

.product-detail-image {
  border-radius: 15px;
  background-color: #ebebeb;

  width: 400px;
  height: 400px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}
.product-detail-image:hover {
  background-color: #f02d34;
}
.small-images-container {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
.small-image {
  border-radius: 8px;
  background-color: #ebebeb;
  width: 70px;
  height: 70px;
  cursor: pointer;
}

.selected-image {
  background-color: #f02d34;
}
.reviews {
  color: #f02d34;
  margin-top: 10px;
  display: flex;
  gap: 5px;
  align-items: center;
}

.product-detail-desc h4 {
  margin-top: 10px;
}
.product-detail-desc p {
  margin-top: 10px;
}
.reviews p {
  color: #324d67;
  margin-top: 0px;
}
.product-detail-desc .price {
  font-weight: 700;
  font-size: 26px;
  margin-top: 30px;
  color: #f02d34;
}
.price .old-price,
.product-price .old-price,
.price .old-price {
  color: gray;
  text-decoration: line-through;
}
.product-detail-desc .quantity {
  display: flex;
  gap: 20px;
  margin-top: 10px;
  align-items: center;
}
.product-detail-desc .buttons {
  display: flex;
  gap: 30px;
}
.buttons .add-to-cart {
  padding: 10px 20px;
  border: 1px solid #f02d34;
  margin-top: 40px;
  font-size: 18px;
  font-weight: 500;
  background-color: white;
  color: #f02d34;
  cursor: pointer;
  width: 200px;
  transform: scale(1, 1);
  transition: transform 0.5s ease;
}
.buttons .add-to-cart:hover {
  transform: scale(1.1, 1.1);
}
.buttons .buy-now {
  width: 200px;

  padding: 10px 20px;
  background-color: #f02d34;
  color: white;
  border: none;
  margin-top: 40px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transform: scale(1, 1);
  transition: transform 0.5s ease;
}
.buttons .buy-now:hover {
  transform: scale(1.1, 1.1);
}




.maylike-products-wrapper {
  margin-top: 120px;
}
.maylike-products-wrapper h2 {
  text-align: center;
  margin: 50px;
  color: #324d67;

  font-size: 28px;
}
.maylike-products-container {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}
        `}</style>
    </>

  )
}

export default ProductDetails