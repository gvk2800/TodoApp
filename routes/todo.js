const router = require('express').Router();
const Todo = require("../models/Todo");
const requireLogin = require('../middleware/requireLogin');
const adminlogin=require('../middleware/adminlogin');

router.get("/home", requireLogin, async(req, res) => {
    const allTodo = await Todo.find({email: req.user.email});
    res.render("index", {todo: allTodo, user: req.user});
})
router.post("/add/todo", requireLogin, (req, res) => {
    const {todo} = req.body;
    const newTodo = new Todo({todo, email: req.user.email});

    newTodo.save().then(() => res.redirect("/home")).catch((err) => console.log(err));
})
router.delete("/delete/todo/:_id", requireLogin, async(req, res) => {
    const {_id} = req.params;
    await Todo.deleteOne({_id}).then(() => res.json({redirect: "/home"})).catch((err) => console.log(err));
})
router.put("/edit/todo/:_id", requireLogin, async(req, res) => {
    const {_id} = req.params;
    let updatedTodo = {};
    if(req.body.todo) updatedTodo.todo = req.body.todo;
    updatedTodo = {$set: updatedTodo};
    await Todo.updateOne({_id}, updatedTodo).then(() => res.redirect("/home")).catch((err) => console.log(err));
})
router.get("/alltodo",adminlogin,async (req,res)=>{
    const allTodo = await Todo.find();
    res.render("admin", {todo: allTodo, user: req.user});
})

module.exports = router;
