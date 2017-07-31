import BooksController from '../controllers/books';

export default (app) => {
  const booksController = new BooksController(app.datasource.models.books);

  app.route('/books')
    .get((req, res) => {
      booksController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/books/mock')
    .get((req, res) => {
      booksController.getAllMock()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/books/:id')
    .get((req, res) => {
      booksController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });
};
