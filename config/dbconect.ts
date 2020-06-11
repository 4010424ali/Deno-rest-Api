import { Database, DataTypes, Model } from "https://deno.land/x/denodb/mod.ts";

// Connect to MongoDB
const db = new Database("mongo", {
  uri: "mongodb://127.0.0.1:27017",
  database: "ali",
});

// Create Model from Database
class Product extends Model {
  static table = "products";
  static timestamp = true;

  static fields = {
    _id: {
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  };
}

// Link the Model with database
db.link([Product]);

// await db.sync({ drop: true });

export { Product };
