jest.mock('mysql2/promise', () => ({
  createConnection: async () => ({
    execute: async () => [[{ test: 1 }]],
    end: async () => {}
  })
}));

const request = require('supertest');
const app = require('../index');  // eksportowana przez Ciebie apka

describe('GET /users', () => {
  test('zwraca JSON i 200', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

const request = require('supertest');
const express = require('express');
const mysql = require('mysql2/promise');
const appModule = require('../index'); // jeśli zwracasz instancję app

// Jeśli w index.js nie eksportujesz app, zrób to:
// module.exports = app; pod koniec index.js

describe('GET /users', () => {
  let server;
  beforeAll((done) => {
    server = appModule.listen(0, done);
  });
  afterAll((done) => {
    server.close(done);
  });
  test('zwraca JSON i 200', async () => {
    const res = await request(server).get('/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
