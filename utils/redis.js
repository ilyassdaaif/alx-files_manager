import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.isClientConnected = false;

    this.client.on('connect', () => {
      this.isClientConnected = true;
    });

    this.client.on('error', (error) => {
      console.error(`Redis client error: ${error}`);
      this.isClientConnected = false;
    });

    this.client.on('end', () => {
      this.isClientConnected = false;
    });
  }

  isAlive() {
    return this.isClientConnected;
  }

  async get(key) {
    const asyncGet = promisify(this.client.GET).bind(this.client);
    try {
      const value = await asyncGet(key);
      return value;
    } catch (error) {
      return null;
    }
  }

  async set(key, value, duration) {
    const asyncSetex = promisify(this.client.SETEX).bind(this.client);
    try {
      await asyncSetex(key, duration, value);
      return true;
    } catch (error) {
      return false;
    }
  }

  async del(key) {
    const asyncDel = promisify(this.client.DEL).bind(this.client);
    try {
      await asyncDel(key);
      return true;
    } catch (error) {
      return false;
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
