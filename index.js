const express = require("express");
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
app.use(cors);
connectDB();

app.use(express.json({extended:false}))
app.get('/', (req,res)=> res.send('API Running'));
app.use('/api/users',require('./routes/users'));
app.use('/api/albums',require('./routes/albums'));
app.use('/api/auth',require('./routes/auth'));


const port = process.env.PORT || 3000;
app.listen(port);
