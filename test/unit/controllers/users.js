import UsersController from '../../../src/controllers/users';

describe('User: Controller', () => {
  describe('Route GET user: getById()', () => {
    it('should return a user', () => {
      const Users = {
        findOne: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'test users',
        email: 'testemail@natura.net',
      }];

      td.when(Users.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      return usersController.getById({ id: 1 })
        .then(response => console.log(response.data));
        //.then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Route POST user: create()', () => {
    it('should create a user', () => {
      const Users = {
        create: td.function(),
      };

      const requestBody = {
        name: 'test users',
        email: 'test_user@gmail.com',
      };
      const expectedResponse = [{
        id: 1,
        name: 'test users',
        email: 'test_user@gmail.com',
      }];

      td.when(Users.create(requestBody)).thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      return usersController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });
});
