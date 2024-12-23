// tests/redis_client_5.test.js
import { expect } from 'chai';
import redisClient from '../utils/redis';

describe('RedisClient', () => {
  it('should save with expiration and expire after 3 seconds', async function() {
    this.timeout(4000); // Allow test to run for 4 seconds
    await redisClient.set('setCheckerKey', '89', 3);
    const value1 = await redisClient.get('setCheckerKey');
    expect(value1).to.equal('89');
    
    // Wait 3.5 seconds
    await new Promise(resolve => setTimeout(resolve, 3500));
    const value2 = await redisClient.get('setCheckerKey');
    expect(value2).to.be.null;
  });
});
