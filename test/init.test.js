import request from 'supertest';
import { expect } from 'chai';
import app from '../server'; // Adjust the path to your Express app

describe('GET /status', () => {
  it('responds with status 200', async () => {
    const response = await request(app).get('/status');
    expect(response.status).to.equal(200);
  });
});

describe('GET /stats', () => {
  it('responds with status 200', async () => {
    const response = await request(app).get('/stats');
    expect(response.status).to.equal(200);
  });
});
