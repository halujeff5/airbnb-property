import express from 'express';
const app = express();
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
app.use(express.json())
app.use(cors());
import pgPromise from 'pg-promise';
import bodyParser from 'body-parser';
app.use(bodyParser.json());
import Stripe from "stripe"; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20", // use latest available version
  });

const password = process.env.PASSWORD
const DATABASEPORT = process.env.DATABASE_PORT
const USER = process.env.USER


const pgp = pgPromise()
const db = pgp(`postgresql://${USER}:${password}@127.0.0.1:${DATABASEPORT}/postgres`)

db ? console.log('database connected') : console.log('database not connected')

app.get('/', async (req, res, next) => {
    const monthToNumber = {
        'Jan': 1,
        'Feb': 2,
        'Mar': 3,
        'Apr': 4,
        'May': 5,
        'Jun': 6,
        'Jul': 7,
        'Aug': 8,
        'Sept': 9,
        'Oct': 10,
        'Nov': 11,
        'Dec': 12
    }
    try {
        const { date, year } = req.query
        console.log('ROUTE hit')
        console.log('month', date)
        console.log('year', parseInt(year) + 1, "answer")

        const newDate = parseInt(year) + 1

        const result = await db.query(`
                        SELECT generate_series(
                        checkin:: date,
                        checkout:: date,
                        '1 day' :: interval
                        ) as bk
                        FROM
                        (SELECT checkin, checkout FROM reservations WHERE checkout BETWEEN '${year}-01-01' and '${newDate}-12-31') AS dates`)
        console.log('get reservations', result)
        return res.status(200).json(result)
    }

    catch (e) {
        console.log(e)
        return res.status(500).json({ error: e })
    }
}
)

app.post('/', async (req, res, next) => {
    try {
        const { firstname, lastname, email, formattedCI, formattedCO } = req.body
        const result = await db.query(`INSERT INTO reservations (firstname, lastname, email, checkin, checkout) VALUES ($1, $2, $3, $4, $5) RETURNING id`, [firstname, lastname, email, formattedCI, formattedCO]);

        let idNumber = result
        console.log('reservation created: ', idNumber)
        return res.json({ idNumber })
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ eroor: e })
    }
})

app.post('/review', async (req, res, next) => {
    console.log('review post route hit')
    const { username, review } = req.query
    try {
        const result = await db.query(`INSERT INTO reviews (username, review) VALUES ($1, $2) RETURNING id`, [username, review]);
        let id = result
        return res.json({ id })
    } catch(e) {
        console.log(e)
    }
})

app.get('/review', async (req, res, next) => {

    console.log('testing route')
    try {
        const result = await db.query(`SELECT username, review  FROM reviews`)
        let rev = result
        return res.status(200).json({ rev })
    } catch(e){
        res.status(500).json({message: e.message})
    }
})

// POST /create-payment-intent
// Expects: { product_id, unit_price_cents, quantity, currency, receipt_email }

app.post('/create-payment-intent', async (req, res) => {
    try {
      const { unit_price_cents, quantity, currency = 'usd', receipt_email } = req.body;
      const amount = unit_price_cents * quantity;
  
      // Create a PaymentIntent. Use automatic payment methods to support cards + more.
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        // optionally attach a receipt email so Stripe sends a receipt
        receipt_email: receipt_email || undefined,
        automatic_payment_methods: { enabled: true },
        metadata: { product_id: req.body.product_id, quantity: String(quantity) },
      });
  
      res.json({ client_secret: paymentIntent.client_secret });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  });

// GET /payment-intent/:id -> return expanded PaymentIntent for client receipt display
app.get('/payment-intent/:id', async (req, res) => {
    try {
      const pi = await stripe.paymentIntents.retrieve(req.params.id, { expand: ["payment_method"] });
      console.log('pi', pi)
      res.json(pi);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });




export default app

// =========================
// Backend (Node/Express) - run separately (example)
// Save as server.js and run with NODE_ENV=production and STRIPE_SECRET_KEY set.
// This is not executed in the React file — it's a required server component.
// =========================



// =========================
// Notes & Deployment Tips
// =========================
// - Put the backend on a secure server (Heroku, Vercel serverless functions, Render, DigitalOcean) and set STRIPE_SECRET_KEY.
// - In React app, set REACT_APP_STRIPE_PUBLISHABLE_KEY to your publishable key.
// - Use HTTPS in production.
// - For PCI scope minimization, you could instead implement Stripe Checkout Sessions server-side and redirect to Stripe's hosted checkout (simpler), but this example demonstrates in-app card capture using Elements.
// - To send emailed receipts, set receipt_email when creating PaymentIntent OR attach a Customer with an email and set invoice settings in Stripe dashboard.
// - Always validate prices on the server — don't trust client-submitted unit_price_cents in production. Lookup product price by product_id server-side.

// =========================
// End of file
// =========================
