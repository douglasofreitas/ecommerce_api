import jwt from 'jwt-simple';

describe('Routes Books', () => {
  const Books = app.datasource.models.books;
  const jwtSecret = app.config.jwtSecret;

  const defaultBook = {
    id: 1,
    name: 'Book 1',
    description: 'Description Book 1',
    value: 100,
  };

  let token;

  beforeEach((done) => {
    Books
      .destroy({ where: {} })
      .then(() => Books.create(defaultBook))
      .then((book) => {
        token = jwt.encode({ id: book.id }, jwtSecret);
        done();
      });
  });

  describe('Route GET /books/{id}', () => {
    it('should return a book', (done) => {
      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        value: Joi.number(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      });

      request
        .get('/books/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          joiAssert(res.body, book);
          done(err);
        });
    });
  });

  describe('Route POST /books', () => {
    it('should create a book', (done) => {
      const newBook = {
        id: 2,
        name: 'Book 2',
        description: 'Description Book 2',
        value: 200,
      };

      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        value: Joi.number(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      });

      request
        .post('/books')
        .set('Authorization', `JWT ${token}`)
        .send(newBook)
        .end((err, res) => {
          joiAssert(res.body, book);
          done(err);
        });
    });
  });

  describe('Route PUT /books/{id}', () => {
    it('should update a book', (done) => {
      const updatedBook = {
        id: 1,
        name: 'Book 1 update',
        description: 'Description Book 1 update',
        value: 100,
      };

      const updatedCount = Joi.array().items(1);

      request
        .put('/books/1')
        .set('Authorization', `JWT ${token}`)
        .send(updatedBook)
        .end((err, res) => {
          joiAssert(res.body, updatedCount);
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
