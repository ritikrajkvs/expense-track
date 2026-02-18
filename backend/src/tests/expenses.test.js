import request from 'supertest';
import app from '../app.js';

describe('Expenses API', () => {
  it('should create an expense', async () => {
    const res = await request(app).post('/expenses').send({
      amount: 5000,
      category: 'food',
      description: 'Lunch',
      date: '2025-02-18',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.category).toBe('food');
  });
});
