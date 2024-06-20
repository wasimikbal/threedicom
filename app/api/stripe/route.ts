import { NextResponse, NextRequest } from "next/server";
import { Stripe } from "stripe";
import { apiVersion } from "@/lib/env";

const key = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY

const stripe = new Stripe(key, {
  apiVersion: '2024-04-10'
})

export async function POST(req:NextRequest) {
  const body = await req.json();
  const params = {
    submit_type: 'pay',
    mode: 'payment',
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    shipping_options: [
        {shipping_rate: 'shr_1PQ9k8Ekeq4Lo3yyjkEdziSy'},
        {shipping_rate: 'shr_1PQ9lkEkeq4Lo3yypIPKv5I9'},
    ],
    line_items: body.map((item)=>{
      return{
        price_data: {
          currency: 'USD',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 10,
        },
        quantity: item.quantity,
      }
    }),
    success_url: `${''}/?success`,
    cancel_url: `${''}/?canceled`,
  }

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [
          {shipping_rate: 'shr_1PQ9k8Ekeq4Lo3yyjkEdziSy'},
          {shipping_rate: 'shr_1PQ9lkEkeq4Lo3yypIPKv5I9'},
      ],
      line_items: body.map((item)=>{
        return{
          price_data: {
            currency: 'AED',
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 10,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/canceled`,
    });
    return NextResponse.json({...session, id: session.id});
  } catch (err) {
    console.log(err);
    return NextResponse.json(err.message);
  }
}

