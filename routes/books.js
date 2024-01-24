const { log } = require('console');
var express = require('express');
var router = express.Router();
const fs = require("fs");
const cors = require("cors");

router.use(cors());

/* GET users listing. */
router.get('/', function(req, res) {

  // HÄMTA

  fs.readFile("./books.json", (err, data) => {
    if (err) console.log("err", err);

    let books = JSON.parse(data);
    res.json(books);
  })

});

router.get('/:id', function(req, res) {
  let id = req.params.id;
  // HÄMTA

  fs.readFile("./books.json", (err, data) => {
    if (err) console.log("err", err);

    let books = JSON.parse(data);

    let book = books.find(book => book.id == id);

    res.json(book);
  })

});

router.post("/", (req, res) => {
  // HÄMTA 

  fs.readFile("./books.json", (err, data) => {
    if (err) console.log("err", err);

    let books = JSON.parse(data);
    console.log("books from json", books);

    // ÄNDRA  
    let newBook = req.body;
    console.log("new book", newBook);
    newBook.id = books.length + 1;
    books.push(newBook);
    console.log("new book", newBook);

    // SPARA
    fs.writeFile("./books.json", JSON.stringify(books, null, 2), (err) => {
      if (err) {
        console.log("err add new book", err)
      };
    })

    res.json(newBook);
  })
})

router.patch("/:id", (req, res) => {

  let id = req.params.id;

  // HÄMTA
  fs.readFile("./books.json", (err, data) => {

    // ÄNDRA
    let books = JSON.parse(data);
    let book = books.find(book => book.id == id);
    book.rented = !book.rented;

    // SPARA
    fs.writeFile("./books.json", JSON.stringify(books, null, 2), (err) => {
      if (err) console.log(err);
    })

    res.json(book);
})

  

  

 

});

module.exports = router;
