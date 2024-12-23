// tests/redis_client_3.test.js
import { expect } from 'chai';
import redisClient from '../utils/redis';

describe('RedisClient', () => {
  it('should return 89 if key was set to 89', async () => {
    await redisClient.set('myCheckerKey', '89');
    const value = await redisClient.get('myCheckerKey');
    expect(value).to.equal('89');
  });
});
