const { Schema , model } = require('mongoose')

const todosSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'}
    },
        {timestamps: true }
);



module.exports = model('Todo', todosSchema);