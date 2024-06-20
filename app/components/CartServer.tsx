import React from 'react'
import Cart from './Cart'
import getStripe from '@/lib/getStripe';
import toast from 'react-hot-toast';
import { client } from '@/lib/client';
import { Product as ProductType } from '@/types/product';
import { groq } from 'next-sanity';

const CartServer = () => {


  const updateProductQty = async (id, operation, value) => {
    let patch = null;
    if (operation === 'inc') {
      patch = client.patch(id).inc({ availableQty: value }).commit().then((value) => {

      });
    } else if (operation === 'dec') {
      const products = await client.fetch(groq`*[_type=="product"]`);
      const product: ProductType = products.find((product: ProductType) => product._id === id);
      if (product.availableQty >= value) {
        patch = client.patch(id).dec({ availableQty: value }).commit();
      } else {
        toast.error('Not enough stock')
      }
    }
    patch?.then((updatedDoc) => {
      console.log('Document updated successfully:', updatedDoc);
    })
      .catch((error) => {
        toast.error('Error patching document')
        console.error('Error patching document:', error);
      });
  }

  const handleCheckout = async (cartItems) => {
    try {
      const stripe = await getStripe();
      const checkoutResponse = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItems)
      });
      cartItems.map((i, index) => {

        updateProductQty(i._id, 'dec', i.quantity);
      });
      toast.loading('Redirecting To Checkout ...')
      const session = await checkoutResponse.json();
      stripe?.redirectToCheckout({sessionId: session?.id});
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <>
      <Cart handleCheckout={handleCheckout} updateProductQty={updateProductQty} />
    </>
  )
}

export default CartServer