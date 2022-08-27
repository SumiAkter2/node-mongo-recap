const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

    app.post("/user", async (req, res) => {
      const newUser = req.body;
      console.log("received", newUser);
      const result = await collection.insertOne(newUser);
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(" Node and Mongo recap is running!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
