const fs = require("fs");
const { Router } = require("express");
const { byCategory, byAuthor } = require("./handlers/books.handlers");
const router = Router();

let books = [];

fs.readFile("books.json", (err, data) => {
  if (err) throw err;

  books = JSON.parse(data);
});

// adding middlewares to filter books by category or by author
router.get("/books", [byCategory, byAuthor], (req, res) => {
  res.status(200).json({ success: true, body: books });
});

// add new book
router.post("/books", (req, res) => {
  const book = req.body;
  books.push(book);

  let books = JSON.stringify(books);
  fs.writeFileSync("books.json", books);

  res.status(200).json({ success: true, body: books });
});

// update book details by isbn [international standard book number]
router.put("/books", (req, res) => {
  const isbn = req.query.isbn;
  const data = req.body;

  let book = books.filter((b) => b.isbn == isbn);

  let keysArr = ["title", "summary", "author", "pages", "category"];
  let validKey = keysArr.find((key) => key === data.field);

  if (!validKey || data.field === "isbn") {
    return res
      .status(400)
      .json({ sucess: false, message: "Invalid edit field" });
  }

  if (!data.value) {
    return res
      .status(400)
      .json({ sucess: false, message: "Empty value for edited field" });
  }

  let _data = {
    [data.field]: data.value
  };

  let _book = { ...book[0], ..._data };

  books = books.map((b) => (b.isbn == isbn ? _book : b));
  fs.writeFileSync("books.json", JSON.stringify(books));

  res.status(200).json({ success: true, body: _book });
});

module.exports = router;
