const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});

const itemsSchema = new mongoose.Schema({
  name: String
});

const Item = new mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welocome to To-Do List"
});

const item2 = new Item({
  name: "hit + to add new item"
});

const item3 = new Item({
  name: "<--hit this to delete item"
});

const defaultItem = [item1, item2, item3];

// Item.insertMany(defaultItem, function(err){
//   if (err){
//     console.log(err);
//   }else{
//     console.log("successfully inserted!");
//   }
// });


var workList = [];

app.get("/",function(req,res){

  Item.find({}, function(err, items){
    res.render('index', {listTitle: "Today", newItem: items});
  });


})

app.get("/work",function(req,res){
  res.render('index', {listTitle: "Work List", newItem: workList});
})

app.get("/about",function(req,res){
  res.render('about');
})


app.post("/",function(req,res){
  const itemName = req.body.inputItem;

  const newItem = new Item({
    name: itemName
  });
  newItem.save();
  res.redirect("/");
});

app.post("/delete", function(req, res){
  const itemId = req.body.checkbox;

  Item.findByIdAndRemove(itemId, function(err){
    console.log(err);
  });
  res.redirect("/");
});

app.listen(3000,function(req,res){
  console.log("server is live!");
})
