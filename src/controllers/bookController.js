import formidable from "formidable";
import { fetchData } from "../postgress/postgress.js";
import path from "path";
import { unlink } from "fs";


const form = formidable({
  keepExtensions: true,
  uploadDir: "uploads",
});

// Create a new book
export const createBook = async (req, res) => {
  const [fields, files] = await form.parse(req);
  try {
    await fetchData(
      'INSERT INTO book (title, author, description, price, image_url, category_id, stock) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      fields.title[0],
      fields.author[0],
      fields.description[0],
      fields.price[0],
      files.image_url[0].newFilename,
      fields.category_id[0],
      fields.stock[0]
    );
    res.status(201).send({ message: "Book created successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Get all books
export const getAllBooks = async (req, res) => {
  const { filter, sort, order } = req.query;

  let query = "SELECT * FROM book";
  let queryParams = [];

  if (filter) {
    query += ` WHERE title ILIKE '%' || $1 || '%'`;
    queryParams.push(filter);
  }

  if (sort) {
    query += ` ORDER BY ${sort}`;
    if (order) {
      query += ` ${order.toUpperCase()}`;
    }
  }

  try {
    const books = await fetchData(query, ...queryParams);
    res.send({ message: "success", data: books });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Get single book by ID
export const getSingleBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await fetchData('SELECT * FROM book WHERE id = $1', bookId);
    res.send({ message: "success", data: book });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Update a book
export const updateBook = async (req, res) => {
  const bookId = req.params.bookId;
  const [fields, files] = await form.parse(req);

  const currentBook = await fetchData('SELECT * FROM book WHERE id = $1', bookId);
  let currentBookImage = currentBook[0].image_url;

  if (files.image_url) {
    unlink(path.join(process.cwd(), "uploads", currentBookImage), (err) => {
      if (err) console.log(err);
    });
    currentBookImage = files.image_url[0].newFilename;
  }

  try {      
    await fetchData(
      `UPDATE book SET 
        title = $1, 
        author = $2, 
        description = $3, 
        price = $4, 
        image_url = $5, 
        category_id = $6, 
        stock = $7 
      WHERE id = $8`,
      fields.title[0] || currentBook[0].title,
      fields.author[0] || currentBook[0].author,
      fields.description[0] || currentBook[0].description,
      fields.price[0] || currentBook[0].price,
      currentBookImage,
      fields.category_id[0] || currentBook[0].category_id,
      fields.stock[0] || currentBook[0].stock,
      bookId
    );
    res.status(200).send({ message: "Book updated successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Delete a book
export const deleteBook = async (req, res) => {
  const { bookId } = req.params;

  const book = await fetchData('SELECT * FROM book WHERE id = $1', bookId);

  if (!book.length) {
    res.status(404).send({ message: "Book not found" });
    return;
  }

  if (book[0].image_url) {
    unlink(path.join(process.cwd(), "uploads", book[0].image_url), (err) => {
      if (err) console.log(err);
    });
  }

  await fetchData('DELETE FROM book WHERE id = $1', bookId);
  res.status(204).send();
};
