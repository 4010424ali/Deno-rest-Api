import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

// Create the client
const client = new MongoClient();

// Connect to mongodb
client.connectWithUri("mongodb://127.0.0.1:27017");

// Specifying the database name
const dbname: string = "ali";
const db = client.database(dbname);

// Delare the collection here.
const Products = db.collection("products");

console.log("MongoBD is connect");

export { db, Products };
