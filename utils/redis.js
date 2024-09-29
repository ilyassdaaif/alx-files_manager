import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);

    this.connectionPromise = new Promise((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Redis client connected');
        resolve();
      });
      this.client.on('error', (error) => {
        console.error(`Redis client error: ${error}`);
        reject(error);
      });
    });
  }

  async isAlive() {
    try {
      await this.connectionPromise;
      return true;
    } catch (error) {
      return false;
    }
  }

  async get(key) {
    await this.connectionPromise;
    if (typeof key !== 'string') {
      throw new Error('Key must be a string');
    }
    try {
      const value = await this.getAsync(key);
      return value;
    } catch (error) {
      console.error(`Error getting key ${key}: ${error}`);
      throw error;
    }
  }

  async set(key, value, duration) {
    await this.connectionPromise;
    if (typeof key !== 'string') {
      throw new Error('Key must be a string');
    }
    if (typeof duration !== 'number') {
      throw new Error('Duration must be a number');
    }
    try {
      await this.setAsync(key, JSON.stringify(value), 'EX', duration);
      return true;
    } catch (error) {
      console.error(`Error setting key ${key}: ${error}`);
      throw error;
    }
  }

  async del(key) {
    await this.connectionPromise;
    if (typeof key !== 'string') {
      throw new Error('Key must be a string');
    }
    try {
      await this.delAsync(key);
      return true;
    } catch (error) {
      console.error(`Error deleting key ${key}: ${error}`);
      throw error;
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;