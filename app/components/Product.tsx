import React from "react";
import { Product as ProductType } from "@/types/product";
import Link from "next/link";
import { urlFor } from "@/lib/client";

const Product: React.FC<ProductType> = ({ ...productProps }) => {
  const { _id, _type, name, slug, price, details, image } = productProps;
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={`${urlFor(image && image[0])}`}
            width={250}
            height={250}
            className="product-image"
          ></img>
          <div className="product-name">{name}</div>
          <div className="product-price">AED {price}</div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
