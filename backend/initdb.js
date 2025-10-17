import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";
import pgPromise from 'pg-promise';
import dotenv from "dotenv";
dotenv.config();

const pgp = pgPromise()
const password = process.env.PASSWORD
const DATABASEPORT = process.env.DATABASE_PORT
const USER = process.env.USER

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "res.sql");
const sqlQuery = fs.readFileSync(filePath, "utf8");

const db = pgp(`postgresql://${USER}:${password}@127.0.0.1:${DATABASEPORT}/postgres`)
db.connect((err)=>{
    if (err) {
        console.error('error connecting to pg', err)
        return 
    }
    db.query(sqlQuery, (err)=>{
        if (err) {
            console.error('error creating db', err)
        }
    else {
        console.log('DB created')
    }
    db.end()
    })

})