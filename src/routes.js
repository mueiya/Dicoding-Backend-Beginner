// Import the handlers module
const {
  postBook, getBooks, getBookById, putBookById, deleteBookById,
} = require('./handlers');

// Routes Setting
const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: postBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getBooks,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookById,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: putBookById,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookById,
  },

];

module.exports = routes;
