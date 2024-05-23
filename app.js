const express = require ('express');
const app = express();
const path = require ('path');
const port= 3000;
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
app.set ('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
require('dotenv').config();
const db_url= process.env.db_url;


mongoose.connect(db_url)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


const userRoute= require ('./routes/userRoute')
app.use('/',userRoute);
app.use('/login',userRoute);
app.use('/home',userRoute);
app.use('/admin',userRoute);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });


