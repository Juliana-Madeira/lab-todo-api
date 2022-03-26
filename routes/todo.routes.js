const { Router } = require('express');
const Todo = require('../models/Todo.js');
const User = require('../models/User')

const router = Router();     //trazer do express

router.get('/', async (req, res) => {
  try {
      const userId = req.user.id;
      const allTodos = await Todo.find({user: userId});
      res.status(200).json(allTodos);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
    try {
      const userId = req.user.id;
      const newTodo = await Todo.create({...req.body, user: userId});
      await User.findByIdAndUpdate(userId, {$push: {todos:newTodo._id}})
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  
router.put('/:id', async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const payload = req.body;
    try {
      const updatedTodo = await Todo.findOneAndUpdate({ _id: id, user: userId }, req.body, { 
        new: true, 
      });
      if(!updatedTodo){
        throw new Error ('cannot update todo from another user')
      }
      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
  
    try {
      const todo = await Todo.findById(id);
      if(todo.user.toString() !== userId){
        throw new Error ('cannot delete another user\'s todo')
      }
      todo.delete()
      res.status(204).json();    //json vazio porque deletamos apenas
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })


  module.exports = router;