const { nanoid } = require('nanoid');
const books = require('./books');

// Handler for Post Books
const postBook = (req, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  // Validate name is not empty
  if (!name) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    res.code(400);
    return res;
  }
  // Validate page
  if (readPage > pageCount) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    res.code(400);
    return res;
  }

  // Create new required properties
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  // Push the new book to books array storage.
  books.push({
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  });

  // Checking whether is successfully added to array
  if (books.filter((addedId) => addedId.id).length > 0) {
    const res = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    res.code(201);
    return res;
  }

  // Default response
  const res = h.response({
    status: 'Error',
    message: 'Server Error',
  });
  res.code(500);
  return res;
};

// Handler for Get Books
const getBooks = (req, h) => {
  const res = h.response({
    status: 'success',
    data: {
      books,
    },
  });
  res.code(200);
  return res;
};
module.exports = { postBook, getBooks };
