// tests/redis_client_6.test.js
import { expect } from 'chai';
import redisClient from '../utils/redis';

describe('RedisClient', () => {
  it('should delete key from Redis', async () => {
    await redisClient.set('aDelCheckerKey', '89');
    await redisClient.del('aDelCheckerKey');
    const value = await redisClient.get('aDelCheckerKey');
    expect(value).to.be.null;
  });
});
