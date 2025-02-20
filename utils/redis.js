import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (err) => {
      console.error('Redis client error:', err);
    });

    this.client.on('connect', () => {
      console.log('Redis client connected');
    });

    this.client.on('ready', () => {
      console.log('Redis client ready');
    });

    this.client.on('end', () => {
      console.log('Redis client disconnected');
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    try {
      const value = await getAsync(key);
      return value;
    } catch (err) {
      console.error('Error getting value from Redis:', err);
      return null;
    }
  }

  async set(key, value, duration) {
    const setAsync = promisify(this.client.set).bind(this.client);
    try {
      if (duration) {
        await setAsync(key, value, 'EX', duration);
      } else {
        await setAsync(key, value);
      }
    } catch (err) {
      console.error('Error setting value in Redis:', err);
    }
  }

  async del(key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    try {
      await delAsync(key);
    } catch (err) {
      console.error('Error deleting value from Redis:', err);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
