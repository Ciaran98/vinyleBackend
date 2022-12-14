const mongoose = require('mongoose');
const config = require('config');
const db = process.env.mongoURI || config.get('mongoURI');

const connectDB = async () =>{
    try {
        await mongoose.connect(db,{
        });

        console.log('MongoDB Connected...')
    } catch(err){
        console.log(err.message);
        // exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;