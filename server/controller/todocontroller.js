const TODOS = require("../models/todoModel");
const User = require("../models/userModel");

//get todos
const getTodos = async (req, res) => {
  try {
    const todos = await TODOS.find().skip().limit().populate("user", "fname lname");
    res.status(200).json(todos);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

//personal todos    
const getPersonalTodos = async (req, res) => {
  try {
    const todos = await TODOS.find({ user: req.user }).populate("user", "fname lname");
    res.status(200).json(todos);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};


//get todo
const getTodo = async (req, res) => {
  const user = await User.findById(req.user);
  try {
    if (!user) {
      res.status(404).json({ msg: "user not Found" });
    } else {
      const _todoid = req.params.id;
      const todo = await TODOS.findById(_todoid);
      if (todo?.user?.toString() !== user?._id?.toString()) {
        res.status(404).json({ msg: "todo not accessed" });
      } else {
        res.status(200).json(todo);
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

//create todo
const createTodo = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(404).json({ msg: "user not Found!" });
    } else {
      const { title, description, category } = req.body.data;
      const todo = new TODOS({
        title,
        category,
        description,
        user: req.user,
      });
      await todo.save();
      res.status(200).json({ msg: "todo created successfully", todo: todo });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

//update todo
const updateTodo = async (req, res) => {
  const user = await User.findById(req.user);
  try {
    const { title, description, category } = req.body.data;
    const user = await User.findById(req.user);
    if (
      title !== undefined ||
      description !== undefined ||
      category !== undefined
    ) {
      if (!user) {
        res.status(404).json({ msg: "user not Found!" });
      } else {
        const _todoid = req.params.id;
        const todo = await TODOS.findById(_todoid);

        if (todo?.user?.toString() === req?.user?.toString() || user.userType === 'admin') {
          todo.title = title || todo.title;
          todo.description = description || todo.description;
          todo.category = category || todo.category;
          await todo.save();
          res
            .status(200)
            .json({ msg: "todo updated successfully", todo: todo });
        } else {
          res.status(404).json({ msg: "todo not accessed!" });
        }
      }
    } else {
      res.status(404).json({ msg: "no one changes applied!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

//delete todo
const deleteTodo = async (req, res) => {

  //   const user = await User.findById(req.user);
  try {
    // if (!user) {
    //   res.status(404).json({ msg: "user not Found!" });
    // } else {
    const _todoid = req.params.id;
    await TODOS.deleteOne({ _id: _todoid });
    res.status(200).json({ msg: "todo deleted successfully" });
    // }
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

module.exports = {
  getTodo,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getPersonalTodos,
};
