const express = require ('express');
const connectDB = require('./config/db.config.js');
const cors = require('cors')
const bcrypt = require ('bcryptjs')

//connect to database
connectDB();

const app = express(); 

//usar json no body das requisições
app.use(express.json());

//cors middleware
// const cors = (req, res, next) => {
//     res.setHeader('access-control-allow-origin', '*')
//     next()
// }
app.use(cors());

//rotas públicas
app.use('/auth', require('./routes/auth.routes.js'));

//middleware de autorização (validar se tenho token ou não)
app.use(require('./middlewares/auth.middleware.js'));

//rotas privadas
app.use('/todos', require('./routes/todo.routes.js'));
app.use('/user', require('./routes/user.routes'))


app.listen(process.env.PORT, () => console.log(`server running on port: ${process.env.PORT}`));


