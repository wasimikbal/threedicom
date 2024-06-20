"use client"

import { Product } from '@/types/product';
import { createContext, useContext, useState, useEffect } from 'react';
import React from 'react';
import { toast } from 'react-hot-toast';


interface ChildProps {
    children: React.ReactNode
}
export const ProductsContext = createContext(null); // Need to provide the type for the context here
const { Provider } = ProductsContext;

export const StateContext = ({ children }: ChildProps) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]); // Create a type for cart items and assign it to this state.
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalQuantities, setTotalQuantities] = useState<number>(0);
    const [qty, setQty] = useState(1);

    const inqQty = () => {
        setQty((prev) => prev + 1);
    }

    const decQty = () => {
        setQty((prev) => {
            if ((prev - 1) < 1) return 1
            return prev - 1;
        })
    }

    const onAddToCart = (product, quantity: number) => {
        const isItemIntheCart = cartItems.find((item: Product)=> item._id == product._id);
        setTotalPrice((prevPrice)=> prevPrice + product.price * qty);
        setTotalQuantities((prevQtys)=> prevQtys + qty);

        if(isItemIntheCart){
            const updatedCartItems = cartItems.map((productInCart)=>{
                if(productInCart._id === product._id){
                    return {
                        ...productInCart,
                        quantity: productInCart.quantity + quantity
                    }
                }
            })
            setCartItems(updatedCartItems);
        }else{
            product.quantity = quantity;    // there is no quanitity property of the product, how would we access it in TS.
            setCartItems([...cartItems, {...product}]);
        }
        toast.success(`${qty} ${product.name} added to the cart`)
    }

    const toggleCartItemsQuantity = (id, value) => {
        const foundItem = cartItems.find((item)=> item._id === id);
        const index = cartItems.findIndex((product)=> product._id === id);
        const filteredItems = cartItems.filter((item)=> item._id !== id);

        if(value === 'inc'){
            const newCartItems = [...filteredItems, {...foundItem, quantity: foundItem.quantity + 1}]
            setCartItems(newCartItems);
            setTotalPrice((prevTPrice)=> prevTPrice + foundItem.price)
            setTotalQuantities((prevTQtys)=> prevTQtys + 1)
        }else if(value === 'dec' && foundItem.quantity > 1){
            const newCartItems = [...filteredItems, {...foundItem, quantity: foundItem.quantity - 1}]
            setCartItems(newCartItems);
            setTotalPrice((prevTPrice)=> prevTPrice - foundItem.price)
            setTotalQuantities((prevTQtys)=> prevTQtys - 1)
        }
    }

    const onRemoveFromCart = (product) => {
        const itemToRemove = cartItems.find((item)=> item._id === product._id);
        const filteredProducts = cartItems.filter((item)=> product._id !== item._id);
        setTotalPrice((prev)=> prev - itemToRemove.price * itemToRemove.quantity);
        setTotalQuantities((prev)=> prev - itemToRemove.quantity);
        setCartItems(filteredProducts)
    }

    const values = {
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        inqQty,
        decQty,
        onAddToCart,
        toggleCartItemsQuantity,
        onRemoveFromCart,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
    }

    return (
        <Provider value={values}>
            {children}
        </Provider>
    )

}

export const useProductsContext = () => {
    return useContext(ProductsContext);
}