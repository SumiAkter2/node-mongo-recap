const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    app.get("/user", async (req, res) => {
      const query = {};
      const result = collection.find(query);
      const user = await result.toArray();
      res.send(user);
    });
    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await collection.findOne(query);
      res.send(result);
    });
    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await collection.deleteOne(query);
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
