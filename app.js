const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const booksRouter = require("./routes/books");
app.use("/api/books", booksRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Api is working",
    routes: [
      "Get /api/books",
      "Get /api/books/:id",
      "POST/api/books",
      "PUT/api/books/:id",
      "DELETE/api/books/:id",
    ],
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: "something went wrong",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "route not found",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log("Available routes:");
  console.log("Get /api/books - Get all books");
  console.log("Get /api/books/:id - Get book by id");
  console.log("POST/api/books - Created a new book");
  console.log("PUT/api/books/:id - Update a book");
  console.log("DELETE/api/books/:id - Delete a book");
});
