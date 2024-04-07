import Stripe from 'stripe'

export const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: '2023-10-16'
})
