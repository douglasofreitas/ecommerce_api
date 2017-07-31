import jwt from 'jwt-simple';

describe('Routes Books', () => {
  const Books = app.datasource.models.books;
  const jwtSecret = app.config.jwtSecret;
  const defaultBook = {
    id: 1,
    name: 'Book 1',
    description: 'Description book 1',
    value: 100,
    createdAt: '2017-07-18T00:00:00.000Z',
    updatedAt: '2017-07-18T00:00:00.000Z',
  };
  let token;

  beforeEach((done) => {
    Books
      .destroy({ where: {} })
      .then(() => Books.create({
        name: 'Book 2',
        description: 'Description book 2',
        value: 200,
      }))
      .then((book) => {
        Books.create(defaultBook)
          .then(() => {
            token = jwt.encode({ id: book.id }, jwtSecret);
            done();
          });
      });
  });

  describe('Route GET /books', () => {
    it('should return a list of books', (done) => {
      request
        .get('/books')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultBook.id);
          expect(res.body[0].name).to.be.eql(defaultBook.name);
          expect(res.body[0].description).to.be.eql(defaultBook.description);
          expect(res.body[0].value).to.be.eql(defaultBook.value);
          done(err);
        });
    });
  });

  describe('Route GET /books/{id}', () => {
    it('should return a book', (done) => {
      request
        .get('/books/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultBook.id);
          expect(res.body.name).to.be.eql(defaultBook.name);
          expect(res.body.description).to.be.eql(defaultBook.description);
          expect(res.body.value).to.be.eql(defaultBook.value);
          done(err);
        });
    });
  });

  describe('Route POST /books', () => {
    it('should create a book', (done) => {
      const newBook = {
        id: 3,
        name: 'Book 3',
        description: 'Description Book 3',
        value: 300,
      };

      request
        .post('/books')
        .set('Authorization', `JWT ${token}`)
        .send(newBook)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newBook.id);
          expect(res.body.name).to.be.eql(newBook.name);
          expect(res.body.description).to.be.eql(newBook.description);
          expect(res.body.value).to.be.eql(newBook.value);
          done(err);
        });
    });
  });

  describe('Route PUT /books/{id}', () => {
    it('should update a book', (done) => {
      const updatedBook = {
        id: 1,
        name: 'Book 1 updated  ',
        description: 'Description Book 1 updated',
      };

      request
        .put('/books/1')
        .set('Authorization', `JWT ${token}`)
        .send(updatedBook)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe('Route DELETE /books/{id}', () => {
    it('should delete a book', (done) => {
      request
        .delete('/books/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
