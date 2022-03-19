const { Schema , model } = require('mongoose')


const todosSchema = new Schema(
    {
        title: {type: String, required: true},
        completed: {type: Boolean, default: false}
    },
        {timestamps: true }
);

const Todo = model('Todo', todosSchema);

module.exports = Todo;