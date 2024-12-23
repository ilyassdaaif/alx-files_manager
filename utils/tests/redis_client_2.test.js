// tests/redis_client_2.test.js
import { expect } from 'chai';
import redisClient from '../utils/redis';

describe('RedisClient', () => {
  it('should return null for non-existent key', async () => {
    const value = await redisClient.get('myCheckerKey');
    expect(value).to.be.null;
  });
});
