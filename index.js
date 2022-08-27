const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
//
//
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dnshpdg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const collection = client.db("foodExpress").collection("users");
    const user = { name: "sumi", email: "sumi@gmail.com", roll: "8" };
    const result = await collection.insertOne(user);

    console.log("connected");
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(" agency is running!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
