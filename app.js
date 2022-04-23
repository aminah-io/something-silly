require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const bodyParser = require('body-parser');
const https = require('https');
const { stringify } = require('querystring');
const { findSourceMap } = require('module');
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('set views', 'ejs');

const dbUsername = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PW;

// Mongoose connection
mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@practice.rui7u.mongodb.net/silly`)

// Create the schema with validation!!!
const sillySchema = new mongoose.Schema({
  name: 
  {
    type: String,
    minlength: 3,
    required: [true, 'Please enter a name for the silly!']
  },
  rating: Number,
  img: String
});

// Create the data model 
const Silly = mongoose.model('Silly', sillySchema);

//-------------- Create a MongoDB collection document object using the model --------------//
// const silly = new Silly({
//   name: 'Covfefe',
//   rating: 2,
//   img: "☕️"
// })

// Save the object to the database
// silly.save()

//-------------- Update single database entry --------------//
// Silly.updateOne({_id: "625e89d41acc356dee0823bb"}, {img: "🍩"}, function(err) {
//   if(err) {
//     console.log(err); 
//   } else {
//     console.log("Success!");
//   }
// })

//-------------- Delete single database entry --------------//
// Silly.deleteOne({ _id: "625e886cc8f8b3a05cd3ddc5" }, function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Success!");
//   }
// })

//-----------------------------------------------------------------//

//-------------- Establish Relationships Between Docs --------------//

  //-------- Create a new schema ---------
  const personSchema = new mongoose.Schema({
    name: 
    {
      type: String,
      minlength: 3,
      required: [true, 'Please enter a name for the silly!']
    },
    age: Number,
    favoriteSilly: sillySchema
  });

  const Person = mongoose.model("Person", personSchema);

  //-------- Create a new Silly Emoji ---------

  // const lolly = new Silly({
  //   name: 'Lollipop',
  //   rating: 5,
  //   img: "🍭"
  // })

  // Save the object to the database
  // lolly.save()

  // const person = new Person({
  //   name: "Timon",
  //   age: 27,
  //   cute: true,
  //   favoriteSilly: lolly
  // })

  // person.save()

  const bike = new Silly({
    name: 'Biskeli',
    rating: 4,
    img: "🚲"
  })

  // Save the object to the database
  // bike.save()


  Person.updateOne({_id: "625e593687d9b43e72f14229"}, {favoriteSilly: bike }, function(err) {
    if(err) {
      console.log(err); 
    } else {
      console.log("Success!");
    }
  })
  

// const categorySchema = new mongoose.Schema({
//   name: String,🍩
//   products: Array
// });

// const Category = mongoose.model('Category', categorySchema);

// const vegetables = new Category({
//   name: 'Vegetables',
//   products: [
//     { name: 'green beans', price: 4000 },
//     { name: 'broccoli', price: 5000 },
//     { name: 'Zucchini', price: 3000 }
//   ]
// })

// vegetables.save()


//---- Read documents from the database -- can loop through and log errors to the console ----//
// Category.find((err, categories) => {
//   if (err) {
//     console.log(err);
//   } else {
//     mongoose.connection.close();
//     categories.forEach((category) => {
//       for(let i = 0; i < category.products.length; i++) {
//         console.log(category.products);
//       }
//     })
//   }
// })

// First get the root page
app.get('/', (req, res) => {
  res.send('<h1>Here we are again my friend.</h1>')
})

app.listen(port, () => {
  console.log(`We are listening on port ${port} my sweet baby port lover!`);
})