import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import dayjs from "dayjs"
import './App.css'
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import type { StripeCardElement } from "@stripe/stripe-js";
import { LocalizationProvider, LocalizationContext } from './hooks/LocalizationProvider'
import Header from './Header'

// Replace with your publishable key
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

const stripePromise = loadStripe(stripeKey || "pk_test_replace_me");

function CurrencyFmt(cents: GLfloat, currency = "usd") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}

export function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const bookingCtx = useContext(LocalizationContext)

    // Example product — in a real app this would come from props or a product DB
    const [product] = useState({ id: "Stay", name: "Black Diamond Escape", unit_price_cents: 20999, currency: "usd" });
    const [quantity, setQuantity] = React.useState<any | number | string | readonly string[]>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [receipt, setReceipt] = React.useState<any>(null)
    const [email, setEmail] = useState("");
 
    function setQuantityOfStay() {
        if (bookingCtx) {
            const start = dayjs(`${bookingCtx.checkinDate}`)
            const end = dayjs(`${bookingCtx.checkoutDate}`)
            const diffInDays = end?.diff(start, 'day')
            bookingCtx.value = diffInDays
            setQuantity(diffInDays)
            return diffInDays
        }
    }

    useEffect(() => {
        setError("");
        setQuantityOfStay();
    }, [email]);

    console.log('yes', quantity)

    async function handleSubmit(e: any) {
        e.preventDefault();
        setError("");
        if (!stripe || !elements) return;
        setLoading(true);

        try {
            // 1) Create PaymentIntent on the server
            const resp = await fetch("http://localhost:4242/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product_id: product.id,
                    unit_price_cents: product.unit_price_cents,
                    currency: product.currency,
                    quantity: quantity,
                    receipt_email: email || undefined,
                }),
            });
            console.log(resp)

            const intentData = await resp.json();
            if (!resp.ok) throw new Error(intentData.message || "Failed to create payment intent");

            const clientSecret = intentData.client_secret;

            // 2) Confirm card payment using Stripe.js
            const cardElement = elements.getElement(CardElement) as StripeCardElement;
            const confirmResp = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: { email: email || undefined },
                },
            });

            if (confirmResp.error) {
                // Card was declined or other error
                setError(`${confirmResp.error.message}`);
                setLoading(false);
                return;
            }

            const paymentIntent = confirmResp.paymentIntent;
            console.log(paymentIntent)
            // 3) Fetch expanded payment/receipt data from server (server retrieves PaymentIntent with secret key)
            const detailResp = await fetch(`http://localhost:4242/payment-intent/${paymentIntent.id}`);
            const details = await detailResp.json();
            console.log('JSON', details)
            // details should include charges.data[0].receipt_url if you enabled receipt sending or expanded charges
            setReceipt({
                id: details.id,
                amount: details.amount,
                currency: details.currency,
                status: details.status,
                receipt_url: details.charges?.data?.[0]?.receipt_url || null,
                card_last4: details.charges?.data?.[0]?.payment_method_details?.card?.last4 || null,
            });

            // clear card field
            cardElement.clear();
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Payment failed");
        }

        setLoading(false);
    }
    const postReservations = async () => {
        const firstname = 'jeff'
        const lastname = 'ng'
        const email = 'jeff@gmail.com'
    
        const day = dayjs()
        const formattedCI = dayjs(bookingCtx?.checkinDate).toISOString()
        const formattedCO = dayjs(bookingCtx?.checkoutDate).toISOString()
    
        if (firstname && lastname && email && formattedCI && formattedCO) {
          try {
            const res = await fetch(`http://localhost:4242/`, {
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ firstname, lastname, email, formattedCI, formattedCO })
            })
            console.log(res.json())
          } catch (e) {
            console.log(e)
          }
        } else {
          alert('Please enter complete information.')
        }
      }
      
    // if (quantity)
        return (
            <>
            <div className="header">
            <Header />
            </div>
                <h2 className="order-title">Black Diamond Escape Checkout</h2>
                <div className="title-product">
                    <div className="flex justify-between mb-2">
                        <div>
                            <div className="font-medium">{product.name}</div>
                            {/* <div className="text-sm text-gray-500">{product.id}</div> */}
                        </div>
                        <div className="text-right">
                            <div className="font-medium">{CurrencyFmt(product.unit_price_cents, product.currency)} / night</div>
                            {/* <div className="text-sm text-gray-500">per night</div> */}
                        </div>
                    </div>

                    <div className="text-title-quantity">
                        <h3>You are staying for</h3> 
                            <h3>{quantity} nights.</h3>
                    </div>

                    <div className="total-tab">Stay total: {CurrencyFmt(product.unit_price_cents * quantity, product.currency)}</div>
                </div>

                {/* Payment form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <div className="text-title">Receipt email (required)</div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="email-field"
                        />
                    </label>

                    <label className="block">
                        <div className="credit-card-info">
                        <div className="credit-card-info">Card details</div>
                            <CardElement options={{ hidePostalCode: true, iconStyle: "solid", style: {base: {iconColor: 'white', color: 'white'}} }} />
                        </div>
                    </label>

                    {error && <div className="text-red-600">{error}</div>}

                    <button
                        type="submit"
                        onClick={postReservations}
                        disabled={!stripe || loading}
                        className="button-dimensions"
                    >
                        {loading ? "Processing…" : `Pay ${CurrencyFmt(product.unit_price_cents * quantity, product.currency)}`}
                    </button>
                </form>

                {/* Receipt / confirmation */}
                {receipt && (
                    <div className= 'order-title-1'>
                        <h3 className="order-title-1">Payment successful</h3>
                        <div className="order-title-1">Stripe Receipt ID: <span className="order-title-1">{receipt.id}</span></div>
                        <div className="order-title-1">Charge: {CurrencyFmt(receipt.amount, receipt.currency)}</div>
                        <div className="order-title-1">Status: {receipt.status}</div>
                        {receipt.card_last4 && <div className="order-title-1">Card: **** **** **** {receipt.card_last4}</div>}
                        {receipt.receipt_url ? (
                            <div className="order-title-1">
                                <a href={receipt.receipt_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">View Receipt</a>
                            </div>
                        ) : (
                            <div className="order-title-1">Receipt will also be emailed if you provided an email.</div>
                        )}
                    </div>
                )}

            </>

        );
}



export default function StripeCheckoutDemo() {
    return (
        <Elements stripe={stripePromise}>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
                <CheckoutForm />
            </div>
        </Elements>
    );
}



