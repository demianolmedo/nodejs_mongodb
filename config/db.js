 const mongoose = require('mongoose');
 require('dotenv').config({ path: 'variables.env' });

 

 const conectarDB = async () => {
    mongoose.set("strictQuery", false);
    try {

        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 0, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 0, // Close sockets after 45 seconds of inactivity
        })
        console.log('BD Conectada');

    } catch (error) {
        console.log(error);
        process.exit(1); //Detenemos la app
    }
 }

 module.exports = conectarDB
 