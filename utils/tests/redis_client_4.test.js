// tests/redis_client_4.test.js
import { expect } from 'chai';
import redisClient from '../utils/redis';

describe('RedisClient', () => {
  it('should correctly save key/value in Redis', async () => {
    await redisClient.set('setCheckerKey', '89');
    const value = await redisClient.get('setCheckerKey');
    expect(value).to.equal('89');
  });
});
