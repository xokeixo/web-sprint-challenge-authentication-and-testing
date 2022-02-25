const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

const testData = { username: 'test', password: 'test' }

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

describe('server.js', () => {
  describe('[GET] /api/jokes', () => {
      it('should return 401', async () => {
          const res = await request(server).get('/api/jokes')
          expect(res.status).toBe(401);
      });
      it('should return text/html', async() => {
          const res = await request(server).get('/api/jokes');
          expect(res.type).toBe('text/html')
      });
  });

  describe("[POST] /api/auth/register", () => {
      it('valid request returning status: 201', async () => {
          await db('users').truncate()
          const res = await request(server)
          .post('/api/auth/register')
          .send(testData);
          expect(res.status).toBe(201)
      });
      it('invalid request returning status: 404', async () => {
          const res = await request(server)
          .post('/api/auth/register')
          .send({username: "m", password: "" });
          expect(res.status).toBe(404);
      });
  });

  describe("[POST]/api/auth/login", ()=> {
      it('returns status: 500 when valid credentials are provided', async () => {
          const res = await request(server)
          .post('/api/auth/login')
          .send(testData);
          expect(res.status).toBe(500)
      })
      it('invalid payload with error message of : Invalid credentials', async () => {
          const res = await request(server)
          .post('/api/auth/login')
          .send({ username: 'Candice', password: 'n/a' })
          expect(res.status).toBe(500)
      })
  });
});
