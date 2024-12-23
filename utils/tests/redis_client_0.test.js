import { expect } from 'chai';
import redisClient from '../utils/redis';

describe('RedisClient', () => {
  it('should return false if Redis is not started', async () => {
    const alive = redisClient.isAlive();
    expect(alive).to.be.false;
  });
});
