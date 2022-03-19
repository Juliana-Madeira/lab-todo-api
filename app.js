const express = require ('express');
const connectDB = require('./config/db.config.js');

connectDB();

const app = express(); 
app.use(express.json());


app.use('/todo', require('./routes/todo.routes.js'));

app.listen(process.env.PORT, () => console.log(`server running on port: ${process.env.PORT}`));


