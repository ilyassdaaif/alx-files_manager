import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
    constructor() {
        this.client = redis.createClient();
        this.client.on('error', (error) => {
          console.log(`Redis client not connected to the server: ${error.message}`);
        });
        this.client.on('connect', () => {
          console.log('Redis client connected to the server');
        });
      }
      
      isAlive() {
        return this.client.connected;
      }

  async get(key) {
    const asyncGet = promisify(this.client.get).bind(this.client);
    return asyncGet(key);
  }

  async set(key, value, duration) {
    const asyncSet = promisify(this.client.setex).bind(this.client);
    return asyncSet(key, duration, value);
  }

  async del(key) {
    const asyncDel = promisify(this.client.del).bind(this.client);
    return asyncDel(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;