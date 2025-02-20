import redisClient from '../utils/redis.js';
import { expect } from 'chai';

describe('RedisClient', () => {
  before(async () => {
    // Wait for Redis to connect
    await new Promise((resolve) => {
      redisClient.client.on('ready', resolve);
    });
  });

  it('isAlive() returns true when Redis is connected', () => {
    expect(redisClient.isAlive()).to.equal(true);
  });

  it('get() returns null for non-existent key', async () => {
    const value = await redisClient.get('nonExistentKey');
    expect(value).to.equal(null);
  });

  it('set() and get() work correctly', async () => {
    await redisClient.set('myKey', 12);
    const value = await redisClient.get('myKey');
    expect(value).to.equal('12'); // Redis stores values as strings
  });

  it('set() with expiration works correctly', async () => {
    await redisClient.set('myKey', 12, 1); // 1-second expiration
    await new Promise((resolve) => setTimeout(resolve, 1100)); // Wait for expiration
    const value = await redisClient.get('myKey');
    expect(value).to.equal(null);
  });

  it('del() removes a key', async () => {
    await redisClient.set('myKey', 12);
    await redisClient.del('myKey');
    const value = await redisClient.get('myKey');
    expect(value).to.equal(null);
  });
});
