const { nanoid } = require('nanoid');
// import the Books module
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

  // Validate name
  if (!name) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    res.code(400);
    return res;
  }
  // validate pageCount
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
  // Get query params
  const {
    name,
    reading,
    finished,
  } = req.query;

  if (name === undefined && reading === undefined && finished === undefined) {
    const res = h.response({
      status: 'success',
      data: {
        books: books.map((i) => ({
          id: i.id,
          name: i.name,
          publisher: i.publisher,
        })),
      },
    });
    res.code(200);
    return res;
  }

  // filter the books
  const filteredBooks = books.filter((i) => {
    // convert from string to bool
    const isFinished = finished === '1';
    const isReading = reading === '1';
    const nameFilter = name ? i.name.toLowerCase().includes(name.toLowerCase()) : true;
    const readingFilter = reading !== undefined ? i.reading === isReading : true;
    const finishedFilter = finished !== undefined ? i.finished === isFinished : true;

    return nameFilter && readingFilter && finishedFilter;
  });

  console.log(filteredBooks);

  // response for filteredBooks
  const res = h.response({
    status: 'success',
    data: {
      books: filteredBooks.map((i) => ({
        id: i.id,
        name: i.name,
        publisher: i.publisher,
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

  // Validate name
  if (!name) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    res.code(400);
    return res;
  }
  // validate pageCount
  if (readPage > pageCount) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    res.code(400);
    return res;
  }
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

// Handler for Delete Books by Id
const deleteBookById = (req, h) => {
  // Get params
  const { id } = req.params;

  // Using find because the id is unique
  const targetIndex = books.findIndex((i) => i.id === id);

  if (targetIndex !== -1) {
    books.splice(targetIndex, 1);

    const res = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    res.code(200);
    return res;
  }
  const res = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  res.code(404);
  return res;
};

module.exports = {
  postBook, getBooks, getBookById, putBookById, deleteBookById,
};
