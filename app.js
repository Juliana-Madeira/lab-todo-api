const express = require ('express');
const connectDB = require('./config/db.config.js');
const cors = require('cors')
const bcrypt = require ('bcryptjs')


connectDB();

const app = express(); 
app.use(express.json());

app.use(cors({
    credencials: true,
    origin: ['http://localhost:3000']
}))


app.use('/auth', require('./routes/auth.routes.js'));

app.use(require('./middlewares/auth.middleware.js'));

app.use('/todos', require('./routes/todo.routes.js'));


app.listen(process.env.PORT, () => console.log(`server running on port: ${process.env.PORT}`));


