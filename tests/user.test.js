/* const supertest = require('supertest');
const app = require('../app');
const models = require('../models');

describe('Testing users endpoint', () => {
  beforeAll(async (done) => {
    await models.sequelize.sync({ force: true });
    done();
  });

  const user = {
    firstName: 'tester1',
    lastName: 'tester',
    email: 'testuser@testuser.se',
    password: 'test12344',
  };

  it('registers a user', async () => {
    const response = await supertest(app).post('/api/user/register').send(user);
    expect(response.status).toBe(200);
    expect(response).toHaveProperty('text', 'user created');
  });

  it('logs in a user and receives a token', async () => {
    const response = await supertest(app)
      .post('/api/user/login')
      .send({ user });
    expect(response.status).toBe(200);
  });

  afterAll(async (done) => {
    await models.sequelize.close();
    done();
  });
});
 */
