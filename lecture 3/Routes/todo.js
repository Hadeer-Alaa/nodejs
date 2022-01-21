const express = require("express");
const Todo = require("../models/todo");
const { auth } = require("../middleware")

const router = express.Router();

router.get("/", async (req, res) => {
    const actions = await Todo.find();
    res.json(actions);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const action = await Todo.findById(id)
    res.json(action);
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const act = await Todo.findByIdAndDelete(id)
    res.json(act);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;
    const val = await Todo.findById(id)
    val.value = value;
    await val.save();
    res.json(val);
});


router.post("/", async (req, res) => {
    const {value} = req.body;
    const newlist= new Todo({value});
    await newlist.save();
    res.json(newlist);
});

module.exports = router