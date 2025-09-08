let books = [
  { id: 1, title: "Lord of the Rings", author: "J.R.R. Tolkien" },
  { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien" },
];

const getAllBooks = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: books,
      count: books.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      massage: "No Books Found",
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);

    if (!bookId || bookId < 1) {
      return res.status(400).json({
        success: false,
        massage: "Invalid Book Id",
      });
    }

    const book = books.find((book) => book.id === bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        massage: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      massage: "Internal Server Error",
    });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    if (!title || !author) {
      return res.status(400).json({
        success: false,
        massage: "Title and Author are required",
      });
    }
    const exitingBook = books.find((book) => book.title === title);

    if (exitingBook) {
      return res.status(400).json({
        success: false,
        massage: "Book already exist",
      });
    }

    const newBook = {
      id: books.length + 1,
      title,
      author,
      createdAt: new Date().toISOString(),
    };
    books.push(newBook);

    res.status(201).json({
      success: true,
      data: newBook,
      massage: "Book created successfully",
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: "Internal Server Error",
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    if (!bookId || bookId < 1) {
      res.status(400).json({
        success: false,
        massage: "Invalid Book Id",
      });
    }
    const book = books.find((book) => book.id === bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        massage: "Book not found",
      });
    }

    const { title, author } = req.body;
    if (!title && !author) {
      return res.status(400).json({
        success: false,
        massage: "At least one of Title or Author must be provided",
      });
    }

    if (title) book.title = title;
    if (author) book.author = author;

    res.status(200).json({
      success: true,
      data: book,
      massage: "Book updated successfully",
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: "Internal Server Error",
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    if (!bookId || bookId < 1) {
      res.status(400).json({
        success: false,
        massage: "Invalid Book Id",
      });
    }
    const bookIndex = books.findIndex((book) => book.id === bookId);
    if (bookIndex === -1) {
      return res.status(404).json({
        success: false,
        massage: "Book not found",
      });
    }
    books.splice(bookIndex, 1);
    res.status(200).json({
      success: true,
      massage: "Book deleted successfully",
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
