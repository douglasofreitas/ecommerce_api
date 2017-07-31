import BooksController from '../../../src/controllers/books';

describe('Book: Controller', () => {
  describe('Route GET book: getById()', () => {
    it('should return a user', () => {
      const Books = {
        findOne: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'Book 1',
        description: 'Description Book 1',
        value: 100,
      }];

      td.when(Books.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.getById({ id: 1 })
        .then(response => console.log(response.data));
        // .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Route POST book: create()', () => {
    it('should create a book', () => {
      const Books = {
        create: td.function(),
      };

      const requestBody = {
        name: 'Book 1',
        description: 'Description Book 1',
      };
      const expectedResponse = [{
        id: 1,
        name: 'Book 1',
        description: 'Description Book 1',
      }];

      td.when(Books.create(requestBody)).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });
});
