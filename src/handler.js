const { nanoid } = require('nanoid');
const books = require('./books');

// validation
const validatePage = (readPage, pageCount, h) => {
  if (readPage > pageCount) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    res.code(400);
    return res;
  }

  return null; // mean, validation passed
};

const validateName = (name, h) => {
  if (!name) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    res.code(400);
    return res;
  }
  return null; // mean, validation passed
};

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

  // Validate name
  const nameValidation = validateName(name, h);
  if (nameValidation) return nameValidation;
  // Validate page
  const pageValidation = validatePage(readPage, pageCount, h);
  if (pageValidation) return pageValidation;

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

  // Default response when server failed
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
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  res.code(200);
  return res;
};

// Handler for Get Books by Id
const getBookById = (req, h) => {
  // Get params
  const { id } = req.params;

  // Using find because the id is unique
  const book = books.find((i) => i.id === id);

  if (book) {
    const res = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    res.code(200);
    return res;
  }
  const res = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  res.code(404);
  return res;
};

// Handler for Put Books
const putBookById = (req, h) => {
  // get id from params
  const { id } = req.params;
  // get body request from payload
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

  // Search for book index using id
  const targetIndex = books.findIndex((i) => i.id === id);

  // checking if the target is valid
  if (targetIndex !== -1) {
    // Change the object
    books[targetIndex] = {
      ...books[targetIndex],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    };

    const res = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    res.code(200);
    return res;
  }
  const res = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  res.code(404);
  return res;
};

module.exports = {
  postBook, getBooks, getBookById, putBookById,
};
