// tests/redis_client_1.test.js
import { expect } from 'chai';
import redisClient from '../utils/redis';

describe('RedisClient', () => {
  it('should return true if Redis is started', (done) => {
    // Wait a bit for Redis to connect
    setTimeout(() => {
      expect(redisClient.isAlive()).to.be.true;
      done();
    }, 1500);
  });
});
