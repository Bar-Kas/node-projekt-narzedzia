// node-app/__tests__/app.test.js

// 1) Mock mysql2/promise, żeby nie próbować kontaktować się z prawdziwą bazą:
jest.mock('mysql2/promise', () => ({
  createConnection: async () => ({
    execute: async () => [[{ id: 1, name: 'Test', email: 'test@example.com' }]],
    end: async () => {}
  })
}));

const request = require('supertest');
const app = require('../index');  // eksportowane wyżej

describe('API /users', () => {
  test('GET /users zwraca listę i status 200', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toEqual({
      id: 1,
      name: 'Test',
      email: 'test@example.com'
    });
  });
});
