import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of all the records
router.get("/", async (req, res) => {
  let collection = await db.collection("todo_list");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("todo_list");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Create a new record.
router.post("/", async (req, res) => {
  let newDocument = {
    topic: req.body.topic,
    description: req.body.description,
    deadline: req.body.deadline,
  };
  let collection = await db.collection("todo_list");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// Update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: {
      topic: req.body.topic,
      description: req.body.description,
      deadline: req.body.deadline,
    },
  };

  let collection = await db.collection("todo_list");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// Delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("todo_list");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
